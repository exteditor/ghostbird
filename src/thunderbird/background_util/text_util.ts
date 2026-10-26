import { encode } from "html-entities"
import type { ITextUtil } from "src/ghosttext-adaptor"

/** Wraps `messengerUtilities` and HTML entity encoding utilities */
export class TextUtil implements ITextUtil {
  static isSingleton = true

  constructor(readonly messenger: typeof globalThis.messenger) {}

  convertToPlainText(body: string): Promise<string> {
    return this.messenger.messengerUtilities.convertToPlainText(body)
  }

  encode(text: string): string {
    return encode(text)
  }
}
