/** @file A part of startup.ts that has relatively less assumptions than the other two modules (wired.ts and wireless.ts) */

// Requirements:
// * Cache instances when they are requested ("singleton")
// * Read-only after construction
// * Alias handling
// * Collect duplicate aliases and populate them into arrays
// * Opinionated functions separated from unintrusive basic functions which should be reusable alone
// Non-goals:
// * async support
// * Injection methods other than constructor injection
// * Injection targets other than ES classes
// * Decorators (may be added if a suitable example appears)
// * Comprehensive validations and diagnostics for configuration errors (e.g., dependency loops or name clashes)
//
// We assume users have unit tests to catch errors; additional runtime checks may be added if a bug reaches
// production. That said, we should provide check functions separately for some common errors so that
// users can use them in their test harness when released as a library in the future.

export type KeyOf<TCatalog> = keyof TCatalog & string

/**
 * A class constructor with some metadata to be registered to the container.
 */
export interface IClassInfo<
  TCatalog,
  Name extends KeyOf<TCatalog> = KeyOf<TCatalog>,
  TCtor extends new () => TCatalog[Name] = new () => TCatalog[Name],
> {
  /**
   * Specifies the lifetime of the class.
   * If `true`, only one instance is created and shared.
   * If `false`, a new instance is created each time it is needed.
   */
  isSingleton: boolean
  /**
   * Indicates whether this class expects dependencies as arrays. Useful for composites or aggregates.
   * If `true`, each argument to the constructor will be an array of instances.
   * If `false`, each argument to the constructor will be an instance.
   */
  wantArray: boolean
  /**
   * The name of the class as a dependency.
   */
  name: Name
  /**
   * The constructor of the class.
   */
  ctor: TCtor
  /**
   * Names of dependencies that the constructor requires.
   */
  deps: KeyOf<TCatalog>[]
  /**
   * Optional alternative names to register the class as.
   */
  aliases?: KeyOf<TCatalog> | KeyOf<TCatalog>[] | undefined
}

/**
 * A DI container that lets you pretend to be type-safe after construction
 */
export interface IWire<TCatalog> {
  /**
   * Instantiate the given class using the dependencies available
   * @param ctor the constructor to instantiate
   * @param deps names of dependencies to pass to the constructor as arguments
   */
  wire<TCtor>(ctor: TCtor, deps: Iterable<string & keyof TCatalog>): Resolved<TCatalog, TCtor>
}

// We could check more strictly like:
//
// * Verify that each name listed in `deps` corresponds to the respective parameter type
// * Verify that the property name really corresponds to the type in the catalog
// * Check each dependency's constructor recursively to ensure that all of them are in the catalog
//
// But that's covered by the unit tests, so I'll stop playing with metaprogramming and focus on the add-on for now.

/**
 * Resolves to the instance type of `TCtor` after some checks.
 */
export type Resolved<TCatalog, TCtor> = TCtor extends new (
  ...args: infer TArgs
) => infer T
  ? ResolvableArgs<TCatalog, T, TArgs>
  : ["Failed to unpack arguments. Is it a constructor?", never, TCtor]

/**
 * Resolves to `T` if all of the `TArgs` are listed in `TCatalog`. Resolves to an error otherwise.
 */
export type ResolvableArgs<TCatalog, T, TArgs> = TArgs extends [infer TArg, ...infer TRest]
  ? TArg extends TCatalog[keyof TCatalog]
    ? ResolvableArgs<TCatalog, T, TRest>
    : ["An argument is not listed in TCatalog", never, TArg]
  : TArgs extends []
    ? T
    : ["Failed to unpack arguments. Is it a constructor?", never, TArgs]

/**
 * Queries to the DI container
 */
export interface IResolver<TCatalog> {
  /**
   * Instantiate the class by the name, or get the cached instance if one is available
   */
  resolveOne<Name extends KeyOf<TCatalog>>(name: Name): TCatalog[Name] | TCatalog[KeyOf<TCatalog>][]
  /**
   * Prepare instances of registered classes
   */
  resolveAll(v: Iterable<KeyOf<TCatalog>>): TCatalog[KeyOf<TCatalog>][] | TCatalog[KeyOf<TCatalog>][][]
  /**
   * Instantiate the class from the info, or get the cached instance if one is available
   */
  prepareOne<Name extends KeyOf<TCatalog>>(info: Readonly<IClassInfo<TCatalog, Name>>): TCatalog[Name]
}

/**
 * Stores registered classes for lookup.
 */
export type IRegistry<TCatalog> = Pick<Map<KeyOf<TCatalog>, ResolveQuery<TCatalog>>, "get" | "set">

/**
 * An entry in the registry. It contains a query to the `IResolver` paired with a key.
 */
export type ResolveQuery<TCatalog, Name extends KeyOf<TCatalog> = KeyOf<TCatalog>> =
  | ["prepareOne", Readonly<IClassInfo<TCatalog, Name>>]
  | ["resolveOne", Name]
  | ["resolveAll", Iterable<Name>]
  | ["const", TCatalog[Name]]

/**
 * Collects and handles duplicate aliases
 */
export interface IAliasMap<TCatalog> {
  /**
   * Classes may have duplicate aliases, so we collect them first to register later
   */
  collectAliases(info: IClassInfo<TCatalog>): void

  /**
   * Generates registry entries from collected aliases
   */
  makeAliasEntries(): Generator<[KeyOf<TCatalog>, ResolveQuery<TCatalog>]>
}

/**
 * A factory for creating instances of registered classes
 */
class Wire<TCatalog> implements IWire<TCatalog>, IResolver<TCatalog> {
  constructor(
    private readonly nameForDuplicatesOf: (alias: KeyOf<TCatalog>) => KeyOf<TCatalog>,
    private readonly registry: Pick<IRegistry<Partial<TCatalog>>, "get">,
    private readonly cache: Map<KeyOf<TCatalog>, TCatalog[keyof TCatalog]>,
  ) {}

  wire<TCtor>(ctor: TCtor, deps: Iterable<KeyOf<TCatalog>>): Resolved<TCatalog, TCtor> {
    const resolved = this.resolveAll(deps)
    return Reflect.construct(ctor as new () => Resolved<TCatalog, TCtor>, resolved)
  }

  resolveAll(deps: Iterable<KeyOf<TCatalog>>): TCatalog[KeyOf<TCatalog>][] {
    return Array.from(deps, (name) => this.resolveOne(name) as TCatalog[KeyOf<TCatalog>])
  }

  resolveOne<Name extends KeyOf<TCatalog>>(name: Name): TCatalog[Name] | TCatalog[KeyOf<TCatalog>][] {
    const entry = this.registry.get(name) as ResolveQuery<TCatalog, Name> | undefined
    if (!entry) {
      throw Error(`No registration for [${name}]`)
    }

    let instance = this.runResolver(entry)
    if (!instance) {
      throw Error(`Failed to resolve [${name}] via ${entry}`)
    }

    return instance
  }

  private runResolver<Name extends KeyOf<TCatalog>>(
    query: ResolveQuery<TCatalog, Name>,
  ): TCatalog[Name] | TCatalog[KeyOf<TCatalog>][] | undefined {
    switch (query[0]) {
      case "const":
        return query[1]
      default: {
        let m = this[query[0]] as (
          arg: Name | Iterable<Name> | Readonly<IClassInfo<TCatalog, Name>>,
        ) => TCatalog[Name] | TCatalog[KeyOf<TCatalog>][]
        return m?.call(this, query[1])
      }
    }
  }

  prepareOne<Name extends KeyOf<TCatalog>, TCtor extends new () => TCatalog[Name]>(
    info: Readonly<IClassInfo<TCatalog, Name, TCtor>>,
  ): TCatalog[Name] {
    return info.isSingleton ? this.createCached(info) : this.create(info)
  }

  private createCached<Name extends KeyOf<TCatalog>, TCtor extends new () => TCatalog[Name]>(
    info: Readonly<IClassInfo<TCatalog, Name, TCtor>>,
  ): TCatalog[Name] {
    let instance = this.cache.get(info.name) as TCatalog[Name]
    if (!instance) {
      instance = this.create(info)
      this.cache.set(info.name, instance)
    }
    return instance
  }

  private create<Name extends KeyOf<TCatalog>, TCtor extends new () => TCatalog[Name]>({
    ctor,
    deps,
    wantArray,
  }: Readonly<IClassInfo<TCatalog, Name, TCtor>>): TCatalog[Name] {
    // Pass arrays for classes that want all duplicates
    let depNames = wantArray ? deps.map(this.nameForDuplicatesOf) : deps

    // Assumes no dependency loops exist (verified by user's unit tests)
    return this.wire(ctor, depNames)
  }
}

/**
 * Creates a factory from the collected class constructors and their parameters
 * @param classes Class constructors with some metadata to instruct its construction
 * @param registry A map used for caching registrations
 * @param aliasCollector A map that collects (possibly duplicated) aliases and populate them as dependencies
 * @param nameForDuplicatesOf A function to generate names for duplicate aliases
 * @template TCatalog - The type that lists available dependencies in the registry
 * @returns A DI container
 */
export function wire<TCatalog>(
  classes: Iterable<Readonly<IClassInfo<TCatalog>>>,
  registry: IRegistry<Partial<TCatalog>>,
  aliasCollector: IAliasMap<TCatalog>,
  nameForDuplicatesOf: (alias: KeyOf<TCatalog>) => KeyOf<TCatalog>,
): IWire<TCatalog> {
  for (let info of classes) {
    registry.set(info.name, ["prepareOne", info])
    aliasCollector.collectAliases(info)
  }
  for (let entry of aliasCollector.makeAliasEntries()) {
    registry.set(...(entry as [KeyOf<TCatalog>, ResolveQuery<TCatalog, KeyOf<TCatalog>>]))
  }
  return new Wire(nameForDuplicatesOf, registry, new Map())
}
