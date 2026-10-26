import type {
  EditorChangeResponse,
  EmailState,
  ExternalEdit,
  InternalEdit,
  ServerInitialResponse,
  UpdateRequest,
} from "src/ghosttext-session/types"

/** Tries to prevent background script from suspending */
export interface IHeart {
  /**
   * Starts the keep-alive
   * @returns closure to stop the keep-alive
   */
  startBeat(): () => void
}

/** Does GhostText handshake */
export interface IGhostTextConnector {
  /**
   * Starts a connection.
   * @param serverUrl The URL of GhostText server to initial GET
   * @returns the connection and the initial response
   */
  connect(serverUrl: URL): Promise<[ISession, ServerInitialResponse]>
}

/** Option fields needed for GhostText client */
export type ClientOptions = {
  /** Host name to use as `url` field */
  readonly clientHostName: string
  /** Initial GET request will be sent here */
  readonly serverUrl: URL
  /** Show notifications on connect/disconnect events if true */
  readonly enableNotifications: boolean
  /** Ignore empty body updates sent by the server before closing */
  /** Drop empty body updates from the server, e.g. the empty update VS Code sends on close */
  readonly ignoreEmptyBodyUpdates: boolean
  /** Edit HTML emails as-is */
  readonly editHtmlAsIs: boolean
}

/**
 * Wraps Thunderbird's storage API.
 */
export interface IClientOptionsLoader {
  /**
   * Loads the options from the Thunderbird's storage.
   */
  load(): Promise<ClientOptions>
}

/** Active WebSocket connection to the GhostText server */
export interface ISession {
  /**
   * Waits for a change from the server-side editor
   * @returns resolves when a change is received, or rejects if the connection is closed
   */
  waitServerChange(): Promise<void>

  /**
   * Get the most recent change and drop the rest
   * @returns The latest change object, or `undefined` if no new changes are available
   */
  popServerChange(): EditorChangeResponse | undefined

  /**
   * Send local change to the server
   * @param update The update request object to send.
   * @throws if the session is already closed
   */
  sendUpdate(update: UpdateRequest): void

  /** Closes the WebSocket */
  close(): void
}

/**
 * Client-side editor (the Thunderbird compose window) that is being synchronized with the external text editor
 */
export interface IClientEditor {
  /** @returns complete current state of the editor */
  getState(): Promise<EmailState>

  /**
   * Applies changes received from the GhostText server to the compose window
   * @param change The change from the server
   * @returns resolves when updated, or rejects if the editor has been closed
   */
  applyChange(change: ExternalEdit): Promise<void>

  /**
   * Waits for an edit to occur in the local compose window.
   * @returns resolves when the user makes an edit, or rejects if the editor is closed
   */
  waitEdit(): Promise<void>

  /**
   * Get the most recent edit and drop the rest
   * @returns recent edit or `undefined` if no new edits have occurred
   */
  popLastEdit(): InternalEdit | undefined
}

export type { InternalEdit, ExternalEdit }

/**
 * Status of the connection
 * - `inactive`: Not connected or starting
 * - `active`: Connected and syncing
 * - `error`: Connection failed
 */
export type ClientStatus = "active" | "inactive" | "error"

/** Some UI to indicate status */
export interface IStatusIndicator {
  /**
   * Shows status to user
   * @param status status to display
   * @returns resolves when shown
   */
  update(status: ClientStatus): Promise<void>
}
