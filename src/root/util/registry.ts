import { CaseFoldingMap } from "src/util"
import type { IRegistry } from "."

/** Make a registry for `wire` with initial constant registrations */
export function makeRegistry<Consts extends Record<string, unknown>>(consts: Consts): IRegistry<Consts> {
  return new CaseFoldingMap(Object.entries(consts).map(([k, v]) => [k, ["const", v]])) as IRegistry<Consts>
}
