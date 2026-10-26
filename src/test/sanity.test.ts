/**
 * @file
 * Tests here run every time we build as a sanity check.
 * These tests are not meant to be comprehensive, but are enough to catch common
 * mistakes that aren't detected by the TypeScript compiler, such as typos in
 * dependency names, or missing exports.
 */

import { BackgroundEventRouter } from "src/app-background/background_event_router"
import { ComposeEventRouter } from "src/app-compose/compose_event_router"
import { OptionsEventRouter } from "src/app-options/options_event_router"
import type { StoredOptions } from "src/ghosttext-adaptor"
import type { IHeart } from "src/ghosttext-runner"
import { prepareBackgroundRouter, startupCompose, startupOptions } from "src/root/startup"
import { describe, it } from "vitest"
import type OptionsSync from "webext-options-sync"

describe(prepareBackgroundRouter, () => {
  it("should resolve BackgroundEventRouter successfully", ({ expect }) => {
    let messenger = Symbol("messenger") as unknown as typeof globalThis.messenger
    let router = prepareBackgroundRouter({
      messenger,
      heart: Symbol("AlarmHeart") as unknown as IHeart,
      optionsSyncCtor: Symbol("optionsSyncCtor") as unknown as typeof OptionsSync,
      storedOptionsDefaults: Symbol("storedOptionsDefaults") as unknown as StoredOptions,
      menuItems: [],
    })
    expect(router).instanceOf(BackgroundEventRouter)
  })
})

describe(startupCompose, () => {
  it("should resolve ComposeEventRouter successfully", ({ expect }) => {
    let startup = startupCompose({
      messenger: Symbol("messenger") as unknown as typeof messenger,
      body: Symbol("body") as unknown as HTMLElement,
      domParser: Symbol("domParser") as unknown as DOMParser,
      selection: Symbol("selection") as unknown as Selection,
    })
    expect(startup(ComposeEventRouter)).instanceOf(ComposeEventRouter)
  })
})

describe(startupOptions, () => {
  it("should resolve OptionsEventRouter successfully", ({ expect }) => {
    let startup = startupOptions({
      optionsSyncCtor: Symbol("optionsSyncCtor") as unknown as typeof OptionsSync,
      storedOptionsDefaults: Symbol("storedOptionsDefaults") as unknown as StoredOptions,
    })
    expect(startup(OptionsEventRouter)).instanceOf(OptionsEventRouter)
  })
})
