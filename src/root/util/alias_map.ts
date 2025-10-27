import type { IAliasMap, IClassInfo, KeyOf, ResolveQuery } from "./wire"

/** @inheritdoc */
export class AliasMap<TCatalog> implements IAliasMap<TCatalog> {
  constructor(
    private readonly nameForDuplicatesOf: (alias: KeyOf<TCatalog>) => KeyOf<TCatalog>,
    private readonly map: Map<KeyOf<TCatalog>, Set<KeyOf<TCatalog>>> = new Map(),
    private readonly duplicateWanted: Set<KeyOf<TCatalog>> = new Set(),
  ) {}

  /** @inheritdoc */
  collectAliases({ aliases, name, wantArray, deps }: IClassInfo<TCatalog>): void {
    if (wantArray) {
      for (let dep of deps) {
        this.duplicateWanted.add(dep)
      }
    }

    if (!aliases) {
      return
    }
    let keys = typeof aliases === "string" ? [aliases] : aliases
    for (const key of keys) {
      let names = this.map.get(key) ?? new Set()
      this.map.set(key, names.add(name))
    }
  }

  /** @inheritdoc */
  *makeAliasEntries(): Generator<[KeyOf<TCatalog>, ResolveQuery<TCatalog, KeyOf<TCatalog>>]> {
    for (const [k, v] of this.map) {
      const [one] = v
      if (one) {
        yield [k, ["resolveOne", one]]
      }

      if (this.duplicateWanted.has(k)) {
        // provide duplicates as an array if needed
        yield [this.nameForDuplicatesOf(k), ["resolveAll", v]]
      } else if (1 < v.size) {
        // Duplicates are not allowed otherwise
        throw Error(`Duplicate registrations found for [${k}]: ${v}`)
      }
    }
  }
}
