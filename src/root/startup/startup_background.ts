import type { CommandHandler, IComposeWindowDetector, MenuHandler, MenuItem } from "src/app-background"
import * as appBackground from "src/app-background"
import { BackgroundEventRouter } from "src/app-background"
import * as adaptor from "src/ghosttext-adaptor"
import type { IHeart } from "src/ghosttext-runner"
import * as runner from "src/ghosttext-runner"
import * as session from "src/ghosttext-session"
import type { WirelessInjector } from "src/root/util"
import { makeRegistry } from "src/root/util/registry"
import { wireless } from "src/root/util/wireless"
import * as thunderbirdBackground from "src/thunderbird/background_util"
import type OptionsSync from "webext-options-sync"

export { AlarmHeart } from "src/thunderbird/background_util/alarm_heart"

export type BackgroundConstants = {
  messenger: typeof globalThis.messenger
  heart: IHeart
  optionsSyncCtor: typeof OptionsSync
  storedOptionsDefaults: adaptor.StoredOptions
  menuItems: ReadonlyArray<MenuItem>
}

export type BackgroundCatalog = BackgroundConstants & {
  composeTabDetector: IComposeWindowDetector
  menuHandler: MenuHandler
  commandHandler: CommandHandler
}

/** Collects related classes and prepares the injector for background.js */
export const startupBackground = (consts: BackgroundConstants): WirelessInjector<BackgroundCatalog> =>
  wireless(
    [thunderbirdBackground, appBackground, adaptor, runner, session],
    makeRegistry<Partial<BackgroundCatalog>>(consts),
  )

export function prepareBackgroundRouter(consts: BackgroundConstants): BackgroundEventRouter {
  let startup = startupBackground(consts)

  return startup(BackgroundEventRouter)
}
