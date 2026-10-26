import type { IButtonMenu, IComposeWindowDetector, ITab, IUiUtil } from "src/app-background"
import * as appBackground from "src/app-background"
import { BackgroundEventRouter } from "src/app-background"
import * as appCompose from "src/app-compose"
import { ComposeEventRouter } from "src/app-compose"
import type {
  IGhostClientPort,
  IGhostServerPort,
  IManifestInfo,
  INotificationTray,
  IStoredOptionsLoader,
  ITextUtil,
  IWebClient,
  StoredOptions,
} from "src/ghosttext-adaptor"
import * as ghosttextAdaptor from "src/ghosttext-adaptor"
import type { IHeart, IMessagePort } from "src/ghosttext-runner"
import * as ghosttextRunner from "src/ghosttext-runner"
import type { EditorChangeResponse, GhostTextClient, UpdateRequest } from "src/ghosttext-session"
import * as ghosttextSession from "src/ghosttext-session"
import type { BackgroundCatalog, BackgroundConstants, ComposeCatalog, ComposeConstants } from "src/root/startup"
import { type IRegistry, makeRegistry, type WirelessInjector, wireless } from "src/root/util"
import { promisifyMessageChannel } from "src/thunderbird/util"
import { generatorTee } from "src/util"
import type OptionsSync from "webext-options-sync"

/** Classes needed for the background router to work */
type MockedThunderbirdCatalog = {
  heart: IHeart
  buttonMenu: IButtonMenu
  composeTabDetector: IComposeWindowDetector
  uiUtil: IUiUtil
  manifestInfo: IManifestInfo
  notificationTray: INotificationTray
  storedOptionsLoader: IStoredOptionsLoader
  textUtil: ITextUtil
  webClient: IWebClient
}

function makeMockedBackgroundInjector(
  mockedThunderbird: MockedThunderbirdCatalog,
): WirelessInjector<BackgroundCatalog> {
  let registry = makeRegistry<Partial<BackgroundCatalog & { ghostTextClient: GhostTextClient }>>({
    messenger: Symbol("messenger") as unknown as typeof globalThis.messenger,
    optionsSyncCtor: Symbol("optionsSyncCtor") as unknown as typeof OptionsSync,
    storedOptionsDefaults: Symbol("storedOptionsDefaults") as unknown as StoredOptions,
    menuItems: [
      {
        icon: "",
        id: "stop_ghostbird",
        label: "stop",
      },
    ],
    ...mockedThunderbird,
  } satisfies MockedThunderbirdCatalog & BackgroundConstants)

  const injector = wireless([appBackground, ghosttextSession, ghosttextAdaptor, ghosttextRunner], registry)

  // override ghostTextClient to add logging
  enableLogging(registry)

  return injector
}

function makeMockedComposeInjector(
  consts: Pick<ComposeConstants, "body" | "selection">,
): WirelessInjector<ComposeCatalog> {
  let registry = makeRegistry<Partial<ComposeCatalog>>({
    messenger: Symbol("messenger") as unknown as typeof globalThis.messenger,
    domParser: new DOMParser(),
    ...consts,
  } satisfies ComposeConstants)

  return wireless([appCompose], registry)
}

/** Build a mock/stub of the Thunderbird API for testing purposes. */
function makeMockedThunderbird(
  openPortCallback: () => IGhostServerPort,
  openWebSocketCallback: () => IMessagePort<string, string>,
): MockedThunderbirdCatalog {
  return {
    heart: { startBeat: () => () => {} },
    composeTabDetector: {
      tryWrap: () => ({
        tabId: 123456789,
        prepareContentScript: async () => true,
        getDetails: () =>
          Promise.resolve({
            isPlainText: true,
            subject: "subject",
            body: "this initial text will be ignored",
          }),
        setDetails: async () => {},
        openPort: openPortCallback,
        setIcon: async () => {},
      }),
    },
    storedOptionsLoader: {
      load: () =>
        Promise.resolve({
          serverPort: 12345,
          enableNotifications: false,
          ignoreEmptyBodyUpdates: false,
          editHtmlAsIs: false,
        } as StoredOptions),
    },
    textUtil: {
      convertToPlainText: async (body: string): Promise<string> => body,
      encode: (text: string): string => text,
    } satisfies ITextUtil,
    manifestInfo: {
      getId: () => "test-id",
    },
    webClient: {
      getJson: async () =>
        ({
          // biome-ignore-start lint/style/useNamingConvention: required by protocol spec
          ProtocolVersion: 1,
          WebSocketPort: 54321,
          // biome-ignore-end lint/style/useNamingConvention: required by protocol spec
        }) as ghosttextSession.ServerInitialResponse,
      openWebSocket: async () => openWebSocketCallback(),
    },
    buttonMenu: Symbol("buttonMenu") as unknown as IButtonMenu,
    notificationTray: Symbol("notificationTray") as unknown as INotificationTray,
    uiUtil: Symbol("uiUtil") as unknown as IUiUtil,
  } satisfies MockedThunderbirdCatalog
}

function enableLogging(
  registry: IRegistry<Partial<{ ghostTextClient: GhostTextClient; "ghostTextClient:original": GhostTextClient }>>,
): void {
  const entry = registry.get("ghostTextClient" as const)
  if (entry?.[0] !== "prepareOne") {
    throw Error(`ghostTextClient not found in registry`)
  }
  const key = "ghostTextClient:original" as const
  registry.set(key, entry)
  registry.set("ghostTextClient", [
    "prepareOne",
    {
      ...entry[1],
      ctor: LoggingGhostTextClient as unknown as typeof GhostTextClient,
      deps: [key],
    },
  ])
}

class LoggingGhostTextClient implements GhostTextClient {
  constructor(private readonly wrapped: GhostTextClient) {}

  run(): ghosttextSession.GhostTextSession {
    return generatorTee(this.wrapped.run())
  }
}

/** BackgroundEventRouter and ComposeEventRouter bundled together for testing */
export class Ghostbird {
  private readonly backgroundRouter: BackgroundEventRouter
  private readonly composeRouter: ComposeEventRouter
  private readonly serverSocket: Promise<IMessagePort<string, string>>
  private readonly tasks: Promise<void>[] = []
  readonly composeBody: HTMLElement

  constructor(consts: Pick<ComposeConstants, "body" | "selection">) {
    let { promise, resolve } = Promise.withResolvers<IMessagePort<string, string>>()
    this.serverSocket = promise

    let composeInjector = makeMockedComposeInjector(consts)
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

    this.composeBody = consts.body
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
    this.tasks.length = 0
  }
}
