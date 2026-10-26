/**
 * @file Functions added in Thunderbird 128 ESR
 * @see https://webextension-api.thunderbird.net/en/esr-mv3/
 */

import type { IAlarmsAPI } from "./alarms"
import type { IMessengerUtilitiesAPI } from "./messenger_utilities"
import type { IScriptingAPI } from "./scripting"

declare global {
  namespace messenger {
    /** Use the scripting API to execute script in different contexts. */
    const scripting: IScriptingAPI
    const alarms: IAlarmsAPI
    /** Helpful methods for working with messages and emails */
    const messengerUtilities: IMessengerUtilitiesAPI
  }
}

export type OnClickData = messenger.composeAction.OnClickData
export type MessageSender = messenger.runtime.MessageSender
export type Port = messenger.runtime.Port
export type PlainJSONValue = messenger.extensionTypes.PlainJSONValue
