/**
 * @file `messenger.messengerUtilities` API introduced at Thunderbird 140 ESR
 * @see https://webextension-api.thunderbird.net/en/esr-mv3/messengerUtilities.html
 */

/** Helpful methods for working with messages and emails */
export interface IMessengerUtilitiesAPI {
  /**
   * Converts the provided body to readable plain text, without tags and leading/trailing whitespace.
   * @param body The to-be-converted body.
   * @param options Optional parameters.
   * @returns resolves to the converted plain text
   */
  convertToPlainText(body: string, options?: { flowed?: boolean }): Promise<string>
}
