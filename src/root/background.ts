/**
 * @file Entrypoint of the background script.
 * This script may be suspended and reloaded occasionally by Thunderbird.
 */

import type { BackgroundEventRouter, MenuItem, MenuShownInfo } from "src/app-background"
import type { Alarm } from "src/thunderbird"
import { type LazyThen, makeLazyThen } from "src/util/lazy_then"

console.info("starting", import.meta.url)

const prepareThen: LazyThen<BackgroundEventRouter> = makeLazyThen(async () => {
  let [{ prepareBackgroundRouter, AlarmHeart }, { default: optionsSyncCtor }] = await Promise.all([
    import("./startup/startup_background"),
    import("webext-options-sync"),
  ])
  /** Menu items to be shown in the context menu. */
  let menuItems: ReadonlyArray<MenuItem> = [
    {
      label: "manifest_commands_stop_ghostbird_description",
      id: "stop_ghostbird",
      icon: "gray.svg",
    },
    {
      label: "manifest_commands_open_options_description",
      id: "open_options",
      icon: "gray.svg",
    },
  ]
  let heart = new AlarmHeart(messenger)

  // Set the ready flag that promises the alarm event handler is registered
  heart.ready(onAlarm)

  return prepareBackgroundRouter({ messenger, heart, optionsSyncCtor, menuItems })
})

function onAlarm(alarm: Alarm): void {
  console.debug("beep", alarm)
}

messenger.composeAction.onClicked.addListener((tab, _info): Promise<void> | void =>
  prepareThen((router) => router.handleComposeAction(tab)),
)

messenger.commands.onCommand.addListener((command, tab): Promise<void> | void =>
  prepareThen((router) => {
    let p = router.handleCommand(command, tab)

    return p ?? Promise.reject(Error(`unknown command ${command}`))
  }),
)

messenger.runtime.onMessage.addListener((msg, sender, sendResponse): Promise<void> | undefined =>
  prepareThen((router) => {
    console.debug({ msg, sender })
    sendResponse(router.handleMessage(msg, sender.tab))
    return undefined
  }),
)

messenger.alarms.onAlarm.addListener(onAlarm)

messenger.menus.onShown.addListener((info, tab) =>
  prepareThen((router) => {
    console.debug({ info, tab })

    return router.handleMenuShown(info as MenuShownInfo, tab)
  }),
)

messenger.menus.onClicked.addListener(({ menuItemId }, tab): Promise<void> | void =>
  prepareThen((router) => {
    console.debug({ menuItemId, tab })
    if (!tab || typeof menuItemId !== "string") {
      return Promise.reject(Error(`event dropped`))
    }
    let p = router.handleMenuClick(menuItemId, tab)

    return p ?? Promise.reject(Error(`unknown command ${menuItemId}`))
  }),
)

console.info("started", import.meta.url)
