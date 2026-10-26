import type { IOptionsStore } from "src/app-options"
import * as appOptions from "src/app-options"
import type { StoredOptions } from "src/ghosttext-adaptor"
import type { WirelessInjector } from "src/root/util"
import { makeRegistry } from "src/root/util/registry"
import { wireless } from "src/root/util/wireless"
import * as thunderbirdOptions from "src/thunderbird/options_util"
import type OptionsSync from "webext-options-sync"

export type OptionsConstants = {
  optionsSyncCtor: typeof OptionsSync
  storedOptionsDefaults: StoredOptions
}

export type OptionsCatalog = OptionsConstants & {
  optionsStore: IOptionsStore
}

/** Collects related classes and prepares the injector for options.js */
export const startupOptions = (consts: OptionsConstants): WirelessInjector<OptionsCatalog> =>
  wireless([thunderbirdOptions, appOptions], makeRegistry<Partial<OptionsCatalog>>(consts))
