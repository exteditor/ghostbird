import type { ClassInfo, IAliasMap, KeyOf, ResolveQuery } from "./wire"

/** @inheritdoc */
export class AliasMap<TCatalog> implements IAliasMap<TCatalog> {
  constructor(
    private readonly nameForDuplicatesOf: (alias: KeyOf<TCatalog>) => KeyOf<TCatalog>,
    private readonly map: Map<KeyOf<TCatalog>, Set<KeyOf<TCatalog>>> = new Map(),
    private readonly duplicateWanted: Set<KeyOf<TCatalog>> = new Set(),
  ) {}

  /** @inheritdoc */
  collectAliases({ aliases, name, wantArray, deps }: ClassInfo<TCatalog>): void {
    if (wantArray) {
      for (let dep of deps) {
        this.duplicateWanted.add(dep)
      }
    }

    let keys = typeof aliases === "string" ? [aliases] : (aliases ?? [])
    for (const key of keys) {
      let names = this.map.get(key) ?? new Set()
      this.map.set(key, names.add(name))
    }
  }

  /** @inheritdoc */
  *makeAliasEntries(): Generator<[KeyOf<TCatalog>, ResolveQuery<TCatalog, KeyOf<TCatalog>>]> {
    for (const [k, v] of this.map) {
      const deps = [...v]
      yield [k, ["prepareOne", makeSimpleClassInfo(k, deps, Object as unknown as new () => TCatalog[typeof k])]]

      if (this.duplicateWanted.has(k)) {
        // provide duplicates as an array if needed
        const name = this.nameForDuplicatesOf(k) as KeyOf<TCatalog>
        yield [name, ["prepareOne", makeSimpleClassInfo(name, deps, Array as unknown as new () => TCatalog[typeof k])]]
      } else if (1 < v.size) {
        // Duplicates are not allowed otherwise
        throw Error(`Duplicate registrations found for [${k}]: ${deps}`)
      }
    }
  }
}

/** Helper to create a simple `ClassInfo` */
function makeSimpleClassInfo<
  TCatalog,
  Name extends KeyOf<TCatalog>,
  TCtor extends new (
    ...args: TCatalog[KeyOf<TCatalog>][]
  ) => TCatalog[Name],
>(name: Name, deps: KeyOf<TCatalog>[], ctor: TCtor): ClassInfo<TCatalog, Name, TCtor> {
  return { name, deps, ctor, isSingleton: false, wantArray: false }
}
