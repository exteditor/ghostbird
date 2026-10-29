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
import type { ComposeDetails, IComposeWindow, IGhostServerPort, INotificationTray, ITextUtil } from "./api"

export class EmailEditor implements IClientEditor, IStatusIndicator {
  private lastStatus: ClientStatus | undefined

  private isPlainText = false

  constructor(
    private readonly notificationTray: INotificationTray,
    private readonly composeWindow: IComposeWindow,
    private readonly port: IGhostServerPort,
    private readonly options: ClientOptions,
    private readonly textUtil: ITextUtil,
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
    this.isPlainText = isPlainText

    this.port.send({ isPlainText })

    // Expect body from the compose window
    await this.waitEdit()
    const r = this.port.clearReceived()
    if (r?.body != null) {
      body = r.body
    }

    // When editing HTML emails as plain text, strip HTML tags on read
    if (!this.options.editHtmlAsIs && !this.isPlainText) {
      body = await this.textUtil.convertToPlainText(body)
    }

    let url = this.options.clientHostName
    return { selections: [{ start: 0, end: 0 }], subject, isPlainText, body, url }
  }

  async applyChange(change: ExternalEdit): Promise<void> {
    if (this.options.ignoreEmptyBodyUpdates && change.body === "") {
      return
    }

    // When editing HTML emails as plain text, convert back to HTML on write
    if (!this.options.editHtmlAsIs && !this.isPlainText) {
      change.body = toHtml(change.body, this.textUtil.encode)
    }

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

/**
 * Converts plain text into HTML for writing into a compose window's `innerHTML`.
 * @param encode Encodes text so that it is safe to embed in HTML
 */
function toHtml(plainText: string, encode: (text: string) => string): string {
  return encode(plainText).replaceAll("\n", "<br>")
}

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  describe(EmailEditor, () => {
    describe("getState", () => {
      it("should convert an HTML body to plain text when editHtmlAsIs is disabled", async () => {
        const sent: unknown[] = []
        const sut = makeSut({
          ignoreEmptyBodyUpdates: false,
          editHtmlAsIs: false,
          sent,
          clearReceived: () => ({ body: "<p>hello</p>" }),
        })

        const state = await sut.getState()

        expect(state.body).to.equal("plain:<p>hello</p>")
        expect(state.isPlainText).to.be.false
      })

      it("should not convert when editHtmlAsIs is enabled", async () => {
        const sent: unknown[] = []
        const sut = makeSut({
          ignoreEmptyBodyUpdates: false,
          editHtmlAsIs: true,
          sent,
          clearReceived: () => ({ body: "<p>hello</p>" }),
        })

        const state = await sut.getState()

        expect(state.body).to.equal("<p>hello</p>")
      })

      it("should not convert when the email is already plain text", async () => {
        const sent: unknown[] = []
        const sut = makeSut({
          ignoreEmptyBodyUpdates: false,
          editHtmlAsIs: false,
          sent,
          getDetails: () => Promise.resolve({ isPlainText: true, subject: "subject", body: "hello" }),
        })

        const state = await sut.getState()

        expect(state.body).to.equal("hello")
      })
    })

    describe("applyChange", () => {
      it("should not apply an empty body when ignoreEmptyBodyUpdates is enabled", async () => {
        const sent: unknown[] = []
        const sut = makeSut({ ignoreEmptyBodyUpdates: true, editHtmlAsIs: true, sent })

        await sut.applyChange({ body: "" })

        expect(sent).to.be.empty
      })

      it("should apply an empty body when ignoreEmptyBodyUpdates is disabled", async () => {
        const sent: unknown[] = []
        const sut = makeSut({ ignoreEmptyBodyUpdates: false, editHtmlAsIs: true, sent })

        const change: ExternalEdit = { body: "" }
        await sut.applyChange(change)

        expect(sent).to.deep.equal([change])
      })

      it("should apply a non-empty body even when ignoreEmptyBodyUpdates is enabled", async () => {
        const sent: unknown[] = []
        const sut = makeSut({ ignoreEmptyBodyUpdates: true, editHtmlAsIs: true, sent })

        const change: ExternalEdit = { body: "hello" }
        await sut.applyChange(change)

        expect(sent).to.deep.equal([change])
      })

      it("should convert plain text to HTML when editHtmlAsIs is disabled and the email is HTML", async () => {
        const sent: unknown[] = []
        const sut = makeSut({ ignoreEmptyBodyUpdates: false, editHtmlAsIs: false, sent })

        await syncState(sut, sent)
        await sut.applyChange({ body: "hello\nworld" })

        expect(sent).to.deep.equal([{ body: "hello<br>world" }])
      })

      it("should not convert when editHtmlAsIs is enabled", async () => {
        const sent: unknown[] = []
        const sut = makeSut({ ignoreEmptyBodyUpdates: false, editHtmlAsIs: true, sent })

        await syncState(sut, sent)
        const change: ExternalEdit = { body: "hello\nworld" }
        await sut.applyChange(change)

        expect(sent).to.deep.equal([change])
      })

      it("should not convert when the email is plain text", async () => {
        const sent: unknown[] = []
        const sut = makeSut({ ignoreEmptyBodyUpdates: false, editHtmlAsIs: false, sent, isPlainText: true })

        await syncState(sut, sent)
        const change: ExternalEdit = { body: "hello\nworld" }
        await sut.applyChange(change)

        expect(sent).to.deep.equal([change])
      })
    })
  })

  describe(toHtml, () => {
    it("should map newlines to <br>", () => {
      expect(toHtml("a\nb", (text) => text)).to.equal("a<br>b")
    })

    it("should apply encode callback", () => {
      expect(toHtml("<a&\nb", (t) => `encode[${t}]\n`)).to.equal("encode[<a&<br>b]<br>")
    })
  })

  async function syncState(sut: EmailEditor, sent: unknown[]): Promise<void> {
    await sut.getState()
    sent.length = 0
  }

  function makeSut(opts: {
    ignoreEmptyBodyUpdates: boolean
    editHtmlAsIs: boolean
    sent: unknown[]
    isPlainText?: boolean
    getDetails?: () => PromiseLike<ComposeDetails>
    clearReceived?: () => { body: string } | undefined
  }): EmailEditor {
    const port = {
      send: (m: never) => opts.sent.push(m),
      waitReady: () => Promise.resolve(),
      clearReceived: opts.clearReceived ?? ((): { body: string } | undefined => undefined),
    } as unknown as IGhostServerPort
    const options = {
      clientHostName: "test.extension.localhost",
      serverUrl: new URL("http://localhost:4001/"),
      enableNotifications: true,
      ignoreEmptyBodyUpdates: opts.ignoreEmptyBodyUpdates,
      editHtmlAsIs: opts.editHtmlAsIs,
    } as ClientOptions
    const composeWindow = {
      getDetails:
        opts.getDetails ??
        ((): PromiseLike<ComposeDetails> =>
          Promise.resolve({ isPlainText: opts.isPlainText ?? false, subject: "subject", body: "body" })),
    } as unknown as IComposeWindow
    const textUtil = {
      convertToPlainText: (body: string): Promise<string> => Promise.resolve(`plain:${body}`),
      encode: (text: string): string => text,
    } satisfies ITextUtil
    return new EmailEditor({} as INotificationTray, composeWindow, port, options, textUtil)
  }
}
