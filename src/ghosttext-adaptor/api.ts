import type { IMessagePort } from "src/ghosttext-runner"
import type { MessageId } from "src/util"

/** Wraps the Notification API */
export interface INotificationTray {
  /** Shows a notification */
  showNotification(iconUrl: string, messageId: MessageId): Promise<void>
}

/** Wrapper for `fetch` and `WebSocket` */
export interface IWebClient {
  /**
   * Does fetch and parse json
   * @param serverUrl The base URL of the GhostText server
   * @returns resolves to the JSON response
   */
  getJson(serverUrl: URL): PromiseLike<object>
  /**
   * Open WebSocket connection
   * @param wsUrl The WebSocket URL
   * @returns resolves to a wrapper of WebSocket
   */
  openWebSocket(wsUrl: URL): PromiseLike<IMessagePort<string, string>>
}

/** content of a mail compose window */
export type ComposeDetails = {
  /** Whether the compose window is in plain text mode. */
  isPlainText: boolean
  /** The subject line of the email. */
  subject: string
  /** The body content of the email. */
  body: string
  // TODO add addresses
}

/** Updatable fields of a compose window */
export type SettableComposeDetails = { subject: string }

/** an utility to interact with a mail compose window */
export interface IComposeWindow {
  /** Practically ID of the compose window */
  readonly tabId: number

  /**
   * Injects `compose.js` if it hasn't been injected yet
   * @returns resolves to `true` if the script was injected, or `false` if it was already present
   */
  prepareContentScript(): PromiseLike<boolean>

  /** @returns Values of input fields */
  getDetails(): PromiseLike<ComposeDetails>

  /**
   * Updates the input fields
   * @param details The new details to set
   * @returns resolves after the update
   */
  setDetails(details: SettableComposeDetails): PromiseLike<void>

  /**
   * @returns a connected port from the background script to the content script
   */
  openPort(): IGhostServerPort

  /**
   * Updates the toolbar icon
   * @param imageFilePath The path to the icon file relative to `manifest.json`
   * @returns resolves when the icon has been set
   */
  setIcon(imageFilePath: string): Promise<void>
}

/** Informations defined in manifest.json */
export interface IManifestInfo {
  /** The extension ID */
  getId(): string
}

/** Options stored in local storage  */
export type StoredOptions = {
  /** The port of the GhostText server to connect to */
  serverPort: number
  /** Shows notifications when connecting or disconnecting from GhostText if true */
  enableNotifications: boolean
  /** Ignore all empty body updates sent by the server if true */
  ignoreEmptyBodyUpdates: boolean
}

/** Manages access to options */
export interface IStoredOptionsLoader {
  /** Loads options from storage */
  load(): Promise<StoredOptions>
}

/** Message sent from  the background script to the compose window */
export type BackgroundMessage = { body: string } | { isPlainText: boolean }

/** Email text in the compose window */
export type BodyState = { body: string }

/** Connection to the background script, and the GhostText server behind it */
export type IGhostClientPort = IMessagePort<BodyState, BackgroundMessage>
/** Connection to the content script */
export type IGhostServerPort = IMessagePort<BackgroundMessage, BodyState>
