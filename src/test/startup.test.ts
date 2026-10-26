import * as appBackground from "src/app-background"
import * as appCompose from "src/app-compose"
import * as appOptions from "src/app-options"
import * as ghosttextAdaptor from "src/ghosttext-adaptor"
import * as ghosttextRunner from "src/ghosttext-runner"
import * as ghosttextSession from "src/ghosttext-session"
import { type IRegistry, wireless } from "src/root/util"
import * as thunderbird from "src/thunderbird"
import * as util from "src/util"
import { describe, type ExpectStatic, test } from "vitest"
import { type AnyEntry, type AnyModules, collectDependencies, dumpDependencies } from "./util/dependency_reporter"
import { writeText } from "./util/io"

class TestRegistry extends util.CaseFoldingMap<AnyEntry> {
  override set(key: string, value: AnyEntry): this {
    if (this.has(key)) {
      throw Error(`Duplicate registration for [${key}]`)
    }

    return super.set(key, value)
  }
}

const modules: AnyModules = {
  appOptions,
  ghosttextSession,
  appBackground,
  thunderbird,
  appCompose,
  ghosttextAdaptor,
  ghosttextRunner,
}

describe("startup", () => {
  const constants: [string, AnyEntry][] = [
    ["messenger", ["const", makeDummyMessenger()]],
    ["menuItems", ["const", Symbol("menuItems")]],
    ["body", ["const", Symbol("body")]],
    ["domParser", ["const", Symbol("domParser")]],
    ["selection", ["const", Symbol("selection")]],
    ["heart", ["const", Symbol("heart")]],
    ["optionsSyncCtor", ["const", Symbol("optionsSyncCtor")]],
    ["storedOptionsDefaults", ["const", Symbol("storedOptionsDefaults")]],
  ]

  test("All collected classes should be resolvable", ({ expect }) => {
    const registry = new TestRegistry(constants)
    const wire = wireless(Object.values(modules), registry as IRegistry<Record<string, unknown>>)

    // TODO test handling of name clash across modules
    let all = wire(Array, registry.keys()) as unknown[]

    expect(all).has.length(registry.size)
    expect(all.every((x) => x)).toBeTruthy()
  })

  test("All collected classes refers to given dependencies", async ({ expect }) => {
    const registry = new Map(constants)
    wireless(Object.values(modules), registry as IRegistry<Record<string, unknown>>)

    checkDependencyUsage(expect, registry)

    // Adjacency list
    let deps = [...collectDependencies(registry)].sort()

    const dump = dumpDependencies(deps, registry, modules)

    await writeText("dependency_tree.md", dump)
  })
})

function makeDummyMessenger(): Record<string, symbol> {
  const namespaces = ["runtime", "tabs", "commands", "composeAction", "scripting"] as const

  return Object.fromEntries(namespaces.map((name) => [name, Symbol(`dummy messenger.${name}`)]))
}

/** Parse the class source and return the part after the constructor */
function sliceSourceAfterCtor(ctor: new () => unknown): string {
  let source = `${ctor}`
  let m = /\bconstructor\s*[(]\s*[{]?\s*[^{]+[{][^}]+[}]/d.exec(source)

  return m?.[0] ? source.slice(m.index + m[0].length) : ""
}

/** Checks if all dependencies are used in class */
function checkDependencyUsage(expect: ExpectStatic, registry: Map<string, AnyEntry>): void {
  for (const [name, [method, arg]] of registry) {
    if (method !== "prepareOne") {
      continue
    }
    let { ctor, deps } = arg
    let depsSize = [...deps].length
    if (depsSize === 0 || ctor === Array || ctor === Object) {
      // primitives don't have a body, so we skip them
      continue
    }
    let body = sliceSourceAfterCtor(ctor)
    if (!body) {
      throw Error(`Failed to parse the entry. Is it a ES class? [${name}]`)
    }
    expect(ctor).to.have.lengthOf(depsSize)
    for (let dep of deps) {
      expect.soft(body).includes(`this.${dep}`, `class ${name} should use this.${dep}`)
    }
  }
}
