import type {
  ClientOptions,
  ClientStatus,
  ExternalEdit,
  IClientEditor,
  InternalEdit,
  IStatusIndicator,
} from "src/ghosttext-runner"
import type { EmailState } from "src/ghosttext-session"
import type { MessageId } from "src/util"
import type { IComposeWindow, IGhostServerPort, INotificationTray } from "./api"

export class EmailEditor implements IClientEditor, IStatusIndicator {
  private lastStatus: ClientStatus | undefined

  constructor(
    private readonly notificationTray: INotificationTray,
    private readonly composeWindow: IComposeWindow,
    private readonly port: IGhostServerPort,
    private readonly options: ClientOptions,
  ) {}

  async update(status: ClientStatus): Promise<void> {
    const icon = imageForStatus(status)
    const isNewStatus = status !== (this.lastStatus ?? "inactive")

    this.lastStatus = status

    await Promise.all([
      isNewStatus && this.notificationTray.showNotification(icon, messageForStatus(status)),
      this.composeWindow.setIcon(icon),
    ])
  }

  async getState(): Promise<EmailState> {
    let { body, subject, isPlainText } = await this.composeWindow.getDetails()

    this.port.send({ isPlainText })

    // Expect body from the compose window
    await this.waitEdit()
    const r = this.port.clearReceived()
    if (r?.body != null) {
      body = r.body
    }

    // TODO Add an option to strip HTML tags on edit

    let url = this.options.clientHostName
    return { selections: [{ start: 0, end: 0 }], subject, isPlainText, body, url }
  }

  async applyChange(change: ExternalEdit): Promise<void> {
    if (this.options.ignoreEmptyBodyUpdates && change.body === "") {
      return
    }

    // TODO Should re-add HTML tags like `<p></p>` if stripped
    this.port.send(change)
  }

  waitEdit(): Promise<void> {
    return this.port.waitReady()
  }

  popLastEdit(): InternalEdit | undefined {
    let edits = this.port.clearReceived()
    return edits
  }
}

function imageForStatus(status: ClientStatus): string {
  switch (status) {
    case "active":
      return "blue.svg"
    case "inactive":
      return "gray.svg"
    case "error":
      return "red.svg"
  }
}

function messageForStatus(status: ClientStatus): MessageId {
  switch (status) {
    case "active":
      return "src_client_status_active"
    case "inactive":
      return "src_client_status_inactive"
    case "error":
      return "src_client_status_error"
  }
}

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  describe(EmailEditor, () => {
    it("should not apply an empty body when ignoreEmptyBodyUpdates is enabled", async () => {
      const sent: unknown[] = []
      const sut = makeSut({ ignoreEmptyBodyUpdates: true, sent })

      await sut.applyChange({ body: "" })

      expect(sent).to.be.empty
    })

    it("should apply an empty body when ignoreEmptyBodyUpdates is disabled", async () => {
      const sent: unknown[] = []
      const sut = makeSut({ ignoreEmptyBodyUpdates: false, sent })

      const change: ExternalEdit = { body: "" }
      await sut.applyChange(change)

      expect(sent).to.deep.equal([change])
    })

    it("should apply a non-empty body even when ignoreEmptyBodyUpdates is enabled", async () => {
      const sent: unknown[] = []
      const sut = makeSut({ ignoreEmptyBodyUpdates: true, sent })

      const change: ExternalEdit = { body: "hello" }
      await sut.applyChange(change)

      expect(sent).to.deep.equal([change])
    })
  })

  function makeSut(opts: { ignoreEmptyBodyUpdates: boolean; sent: unknown[] }): EmailEditor {
    const port = {
      send: (m: never) => opts.sent.push(m),
    } as unknown as IGhostServerPort
    const options = {
      clientHostName: "test.extension.localhost",
      serverUrl: new URL("http://localhost:4001/"),
      enableNotifications: true,
      ignoreEmptyBodyUpdates: opts.ignoreEmptyBodyUpdates,
    } as ClientOptions
    return new EmailEditor({} as INotificationTray, {} as IComposeWindow, port, options)
  }
}
