import type { ClientOptions, IClientOptionsLoader } from "src/ghosttext-runner/api"
import type { IManifestInfo, IStoredOptionsLoader, StoredOptions } from "./api"

export const DEFAULT_STORED_OPTIONS: StoredOptions = {
  serverPort: 4001,
  enableNotifications: true,
  ignoreEmptyBodyUpdates: false,
} as const

export class ClientOptionsLoader implements IClientOptionsLoader {
  static isSingleton = true

  constructor(
    private readonly storedOptionsLoader: IStoredOptionsLoader,
    private readonly manifestInfo: IManifestInfo,
  ) {}

  async load(): Promise<ClientOptions> {
    let { serverPort, enableNotifications, ignoreEmptyBodyUpdates } = await this.storedOptionsLoader.load()
    const extensionId = this.manifestInfo.getId()
    let serverUrl = new URL(`http://localhost:${serverPort}/`)
    let { host } = new URL(`extension://${extensionId}.localhost`)

    return {
      serverUrl,
      clientHostName: host,
      enableNotifications,
      ignoreEmptyBodyUpdates,
    }
  }
}

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  describe(ClientOptionsLoader, () => {
    it("should build a ClientOption from storage and manifest info correctly", async () => {
      const storedOptionsLoader = {
        load: () =>
          Promise.resolve({
            serverPort: 1234,
            enableNotifications: true,
            ignoreEmptyBodyUpdates: true,
          }),
      } satisfies IStoredOptionsLoader
      const manifestInfo = {
        getId: () => "@test.extension",
      } satisfies IManifestInfo
      const sut = new ClientOptionsLoader(storedOptionsLoader, manifestInfo)

      await expect(sut.load()).resolves.deep.equals({
        serverUrl: new URL("http://localhost:1234/"),
        clientHostName: "test.extension.localhost",
        enableNotifications: true,
        ignoreEmptyBodyUpdates: true,
      })
    })
  })
}
