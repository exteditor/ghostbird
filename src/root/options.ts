/** @file Entrypoint of the options page */

import { GhostbirdOptionsElement, OptionsEventRouter } from "src/app-options"
import { DEFAULT_STORED_OPTIONS } from "src/ghosttext-adaptor"
import { default as optionsSyncCtor } from "webext-options-sync"
import { startupOptions } from "./startup/startup_options"

/** Initialize the event router for the options page */
function prepareRouter(): OptionsEventRouter {
  const startup = startupOptions({
    optionsSyncCtor,
    storedOptionsDefaults: DEFAULT_STORED_OPTIONS,
  })
  return startup(OptionsEventRouter)
}

/** Wait for the options page to be ready and start processing events */
async function runRouterAsync(): Promise<never> {
  await customElements.whenDefined("ghostbird-options")

  const router = prepareRouter()
  let [opt] = document.getElementsByTagName("ghostbird-options")
  if (!opt) {
    throw Error("unexpected html state")
  }

  return router.initOptions(opt as GhostbirdOptionsElement)
}

console.info("starting", import.meta.url)

const mainPromise: Promise<never> = runRouterAsync()

customElements.define("ghostbird-options", GhostbirdOptionsElement)

console.info("started", import.meta.url)

await mainPromise
