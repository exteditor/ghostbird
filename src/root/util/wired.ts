import type { IClassInfo, IRegistry, IWire, KeyOf } from "."
import { AliasMap } from "./alias_map"
import { wire } from "./wire"

/**
 * Generates the name for the dependency where duplicate registrations are collected into an array
 */
export const defaultNameForDuplicatesOf = <TCatalog>(alias: KeyOf<TCatalog>): KeyOf<TCatalog> =>
  `${alias}[]` as KeyOf<TCatalog>

/**
 * Initialize wire with a default `AliasMap` class. Creates a factory from the collected class constructors and their parameters.
 * @param classes Class constructors with some metadata to instruct its construction
 * @param registry A map used for caching registrations
 * @template TCatalog - The type that lists available dependencies in the registry
 * @returns A DI container
 */
export function wired<TCatalog>(
  classes: Iterable<Readonly<IClassInfo<TCatalog>>>,
  registry: IRegistry<Partial<TCatalog>>,
): IWire<TCatalog> {
  return wire(classes, registry, new AliasMap(defaultNameForDuplicatesOf), defaultNameForDuplicatesOf)
}
