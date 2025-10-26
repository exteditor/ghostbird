import type { IButtonMenu, IComposeWindowDetector, ITab, IUiUtil } from "src/app-background"
import * as appBackground from "src/app-background"
import { BackgroundEventRouter } from "src/app-background"
import * as appCompose from "src/app-compose"
import { ComposeEventRouter } from "src/app-compose"
import type {
  ComposeDetails,
  IComposeWindow,
  IGhostClientPort,
  IGhostServerPort,
  IManifestInfo,
  INotificationTray,
  IStoredOptionsLoader,
  IWebClient,
  StoredOptions,
} from "src/ghosttext-adaptor"
import * as ghosttextAdaptor from "src/ghosttext-adaptor"
import type { IHeart, IMessagePort } from "src/ghosttext-runner"
import * as ghosttextRunner from "src/ghosttext-runner"
import type { EditorChangeResponse, UpdateRequest } from "src/ghosttext-session"
import * as ghosttextSession from "src/ghosttext-session"
import type { BackgroundCatalog, BackgroundConstants, ComposeCatalog, ComposeConstants } from "src/root/startup"
import { makeRegistry, type WirelessInjector, wireless } from "src/root/util"
import { promisifyMessageChannel } from "src/thunderbird/util"
import { describe, it, vi as jest } from "vitest"
import type OptionsSync from "webext-options-sync"

describe("Ghostbird", () => {
  it("should send initial text to server when started from toolbar", async ({ expect }) => {
    const sut = new Ghostbird()
    sut.startFromToolbar({ id: 42 })
    sut.composeBody.textContent = "hello"

    let sent = await sut.sendsToServer()
    await sut.closeSession()

    expect(sent).to.be.deep.equal({
      text: "hello",
      title: "subject",
      url: "test-id.localhost",
      selections: [{ start: 0, end: 0 }],
      syntax: "",
    })
  })

  it("should apply text from server to the compose body", async ({ expect }) => {
    const sut = new Ghostbird()
    sut.startFromToolbar({ id: 42 })
    sut.composeBody.textContent = "hello"

    await sut.sendsToServer()
    await sut.receives("hello, world")
    await sut.closeSession()

    expect(sut.composeBody.textContent).equals("hello, world")
  })
})

/** Classes needed for the background router to work */
type MockedThunderbirdCatalog = {
  heart: IHeart
  buttonMenu: IButtonMenu
  composeTabDetector: IComposeWindowDetector
  uiUtil: IUiUtil
  manifestInfo: IManifestInfo
  notificationTray: INotificationTray
  storedOptionsLoader: IStoredOptionsLoader
  webClient: IWebClient
}

function makeMockedBackgroundInjector(
  mockedThunderbird: MockedThunderbirdCatalog,
): WirelessInjector<BackgroundCatalog> {
  let registry = makeRegistry<Partial<BackgroundCatalog>>({
    messenger: Symbol("messenger") as unknown as typeof globalThis.messenger,
    optionsSyncCtor: Symbol("optionsSyncCtor") as unknown as typeof OptionsSync,
    menuItems: [
      {
        icon: "",
        id: "stop_ghostbird",
        label: "stop",
      },
    ],
    ...mockedThunderbird,
  } satisfies MockedThunderbirdCatalog & BackgroundConstants)

  return wireless([appBackground, ghosttextSession, ghosttextAdaptor, ghosttextRunner], registry)
}

function makeMockedComposeInjector(): WirelessInjector<ComposeCatalog> {
  let registry = makeRegistry<Partial<ComposeCatalog>>({
    messenger: Symbol("messenger") as unknown as typeof globalThis.messenger,
    body: document.body,
    selection: getSelection() as Selection,
    domParser: new DOMParser(),
  } satisfies ComposeConstants)

  return wireless([appCompose], registry)
}
/** Build a mock/stub of the Thunderbird API for testing purposes. */
function makeMockedThunderbird(
  openPortCallback: () => IGhostServerPort,
  openWebSocketCallback: () => IMessagePort<string, string>,
): MockedThunderbirdCatalog {
  return {
    heart: {
      startBeat: jest.fn().mockReturnValue(jest.fn()),
    },
    composeTabDetector: {
      tryWrap: jest.fn().mockReturnValue({
        tabId: 123456789,
        prepareContentScript: jest.fn(),
        getDetails: jest.fn().mockResolvedValue({
          isPlainText: true,
          subject: "subject",
          body: "this initial text will be ignored",
        } satisfies ComposeDetails),
        setDetails: jest.fn(),
        openPort: jest.fn().mockImplementation(openPortCallback),
        setIcon: jest.fn(),
      } satisfies IComposeWindow),
    },
    storedOptionsLoader: {
      load: jest.fn().mockResolvedValue({
        serverPort: 12345,
        enableNotifications: false,
      } as StoredOptions),
    },
    manifestInfo: {
      getId: jest.fn().mockReturnValue("test-id"),
    },
    webClient: {
      getJson: jest.fn().mockResolvedValue({
        // biome-ignore-start lint/style/useNamingConvention: required by protocol spec
        ProtocolVersion: 1,
        WebSocketPort: 54321,
        // biome-ignore-end lint/style/useNamingConvention: required by protocol spec
      } as ghosttextSession.ServerInitialResponse),
      openWebSocket: jest.fn().mockImplementation(openWebSocketCallback),
    },
    buttonMenu: Symbol("buttonMenu") as unknown as IButtonMenu,
    notificationTray: Symbol("notificationTray") as unknown as INotificationTray,
    uiUtil: Symbol("uiUtil") as unknown as IUiUtil,
  } satisfies MockedThunderbirdCatalog
}

class Ghostbird {
  readonly composeBody: HTMLBodyElement
  private readonly backgroundRouter: BackgroundEventRouter
  private readonly composeRouter: ComposeEventRouter
  private readonly serverSocket: Promise<IMessagePort<string, string>>
  private readonly tasks: Promise<void>[] = []

  constructor() {
    let { promise, resolve } = Promise.withResolvers<IMessagePort<string, string>>()
    this.serverSocket = promise

    let composeInjector = makeMockedComposeInjector()
    let mockedThunderbird = makeMockedThunderbird(
      () => {
        let [composeToBackground, backgroundToCompose]: [IGhostClientPort, IGhostServerPort] = promisifyMessageChannel(
          new MessageChannel(),
        )

        const composePromise = this.composeRouter.handleConnect(composeToBackground)
        this.tasks.push(composePromise)

        return backgroundToCompose
      },
      () => {
        let [clientSocket, serverSocket] = promisifyMessageChannel<string, string>(new MessageChannel())
        resolve(serverSocket)
        return clientSocket
      },
    )
    let backgroundInjector = makeMockedBackgroundInjector(mockedThunderbird)

    this.composeBody = composeInjector(Object, ["body"]) as unknown as HTMLBodyElement
    this.composeRouter = composeInjector(ComposeEventRouter)
    this.backgroundRouter = backgroundInjector(BackgroundEventRouter)
  }

  startFromToolbar(tab: ITab): void {
    const backgroundPromise = this.backgroundRouter.handleComposeAction(tab)

    this.tasks.push(backgroundPromise)
  }

  async receives(text: string): Promise<void> {
    let s = await this.serverSocket
    s.send(
      JSON.stringify({
        text,
        selections: [{ start: 0, end: 0 }],
      } satisfies EditorChangeResponse),
    )
  }

  async sendsToServer(): Promise<UpdateRequest | undefined> {
    let s = await this.serverSocket
    await s.waitReady()
    const received = s.clearReceived()

    return typeof received === "string" ? JSON.parse(received) : received
  }

  async closeSession(): Promise<void> {
    let s = await this.serverSocket
    s.close()
    await Promise.all(this.tasks)
  }
}
