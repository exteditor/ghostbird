import { type IClassInfo, type IRegistry, type IWire, type Resolved, wire } from "./util/wire"

/**
 * A class constructor collected.
 */
interface Ctor {
  /**
   * Specifies the lifetime of the class.
   * If `true`, only one instance is created and shared.
   * If `false`, a new instance is created each time it is needed.
   * If `undefined` or the property is missing, the class is not instantiated automatically.
   */
  isSingleton: boolean
  /**
   * Indicates whether this class expects dependencies as arrays. Useful to implement composites or aggregates.
   * If `true`, each argument to the constructor will be an array of instances.
   * If `false`, `undefined`, or the property is missing, each argument to the constructor will be an instance.
   */
  wantArray?: boolean | undefined
  /**
   * Alternative names to register the class as. Optional.
   */
  aliases?: string | string[] | undefined
  /**
   * Any class has a constructor.
   */
  new (...args: unknown[]): unknown
}

export type Startup<TCatalog> = <TCtor>(
  ctor: TCtor,
  deps?: Iterable<string & keyof (TCatalog & { $wire$: IWire<TCatalog> })>,
) => Resolved<TCatalog & { $wire$: IWire<TCatalog> }, TCtor>

/**
 * Collects available classes from given module objects to make a factory.
 */
export function startup<TCatalog>(
  modules: Iterable<Record<string, unknown>>,
  registry: IRegistry<TCatalog>,
): Startup<TCatalog> {
  let wired = wire<TCatalog & { $wire$: IWire<TCatalog> }>(
    listClasses(modules) as Iterable<IClassInfo<TCatalog>>,
    registry,
  )

  // Register the container itself so that we can (ab)use it as a factory
  registry.set("$wire$", ["const", wired])

  return <TCtor>(ctor: TCtor, deps?: Iterable<string & keyof (TCatalog & { $wire$: IWire<TCatalog> })>) =>
    wired.wire(
      ctor,
      deps ??
        (parseConstructorForDependencyNames(ctor as new () => unknown) as Iterable<
          string & keyof (TCatalog & { $wire$: IWire<TCatalog> })
        >),
    )
}

/**
 * Scans the modules for classes tagged with lifetime properties.
 * @param modules Modules to scan
 * @yields registration for the container
 */
function* listClasses(modules: Iterable<Record<string, unknown>>): Generator<IClassInfo<Record<string, unknown>>> {
  for (let mod of modules) {
    for (let classInfo of listClassesInModule(mod)) {
      // Assumes there is no name clash. We test elsewhere to verify it
      yield classInfo
    }
  }
}

/**
 * Scans the module for classes tagged with lifetime properties.
 * @param module Module object to scan
 * @yields registration for the container
 */
function* listClassesInModule(module: Record<string, unknown>): Generator<IClassInfo<Record<string, unknown>>> {
  for (const [k, v] of Object.entries(module)) {
    if (!isStartupClass(v)) {
      continue
    }

    yield {
      name: k,
      aliases: v.aliases,
      ctor: v,
      isSingleton: v.isSingleton,
      wantArray: Boolean(v.wantArray),
      deps: parseConstructorForDependencyNames(v),
    }
  }
}

/**
 * Tells if the value is a constructor tagged with lifetime
 */
function isStartupClass(v: unknown): v is Ctor {
  return typeof v === "function" && "isSingleton" in v && typeof v.isSingleton === "boolean"
}

function parseConstructorForDependencyNames(ctor: { length: number }): string[] {
  if (ctor.length === 0) {
    return []
  }

  // Extract property initializations to get names.
  // I believe Rolldown keeps property names.
  const matches = /\bconstructor\s*[(][^{]+[{]([^}]+)/
    .exec(ctor as unknown as string)?.[1]
    ?.matchAll(/\bthis\s*[.]\s*([^\s=]+)\s*=/g)
  if (!matches) {
    throw Error(`Failed to parse ${ctor}`)
  }

  return Array.from(matches, (m) => m[1] ?? "")
}

if (import.meta.vitest) {
  const { test, expect, describe } = import.meta.vitest

  describe(parseConstructorForDependencyNames, () => {
    test("With a usual example", () => {
      let r = parseConstructorForDependencyNames(`class Foo { constructor(a, b) { this.foo = a; this.bar = b; } }`)
      expect(r).deep.equals(["foo", "bar"])
    })

    test("With newlines", () => {
      let r = parseConstructorForDependencyNames(
        "class Foo { constructor(a, b) { this.foo = a this.bar = b } }".replaceAll(" ", "\n"),
      )
      expect(r).deep.equals(["foo", "bar"])
    })

    test("With a minified example", () => {
      let r = parseConstructorForDependencyNames(`class{constructor($a$1,$b$3){this.foo=$a$1,this.bar=$b$3}}`)
      expect(r).deep.equals(["foo", "bar"])
    })

    test.fails("We expect minifiers not to reorder assignments", () => {
      let r = parseConstructorForDependencyNames(`class{constructor($a$1,$b$3){this.bar=$a$1,this.foo=$b$3}}`)
      expect(r).deep.equals(["foo", "bar"])
    })

    test("With a TypeScript class", () => {
      let r = parseConstructorForDependencyNames(
        class {
          constructor(
            private foo: number,
            private bar: string,
          ) {}
        },
      )
      expect(r).deep.equals(["foo", "bar"])
    })
  })
  //
}
