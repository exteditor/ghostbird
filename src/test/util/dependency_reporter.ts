import { toCamelCase, toKebabCase, toSnakeCase } from "@std/text"
import type { ResolveQuery } from "src/root"
import { CaseFoldingSet } from "src/util"
import { caseInsensitiveToposort } from "./case_insensitive_toposort"

export type AnyEntry = ResolveQuery<Record<string, unknown>>
export type AnyModules = Record<string, Record<string, unknown>>

export function dumpDependencies(
  deps: [string, string[]][],
  registry: Map<string, AnyEntry>,
  modules: AnyModules,
): string {
  // Add some non-class entry for starting points
  const depList = [
    ["background.ts", ["BackgroundEventRouter"]],
    ["compose.ts", ["ComposeEventRouter"]],
    ["options.ts", ["OptionsEventRouter"]],
    ...deps,
  ] as [string, string[]][]

  let mermaid = makeMermaid(modules, depList)
  let startupCode = dumpStartupCode(modules, deps, registry)

  const dump = dumpTree(mermaid, startupCode)
  return dump
}

/** Collect dependencies as an adjacency list by inspecting the registry entries */
export function* collectDependencies(registry: Map<string, AnyEntry>): Generator<[string, string[]]> {
  let knownNames = new CaseFoldingSet()
  let requiredNames = new CaseFoldingSet()
  for (let [k, v] of registry) {
    const [method, arg] = v

    knownNames.add(k)

    switch (method) {
      case "const":
        yield [k, []]
        break
      case "prepareOne":
        yield [k, arg.deps]
        for (let dep of arg.deps) {
          requiredNames.add(dep)
        }
        break
      case "resolveAll":
        yield [k, [...arg]]
        for (let dep of arg) {
          requiredNames.add(dep)
        }
        break
      case "resolveOne":
        yield [k, [arg]]
        requiredNames.add(arg)
        break
      default:
        throw Error("unexpected command name")
    }
  }

  let missingNames = requiredNames.difference(knownNames)
  if (missingNames.size) {
    throw Error(`Missing definitions: ${Array.from(missingNames)}`)
  }
}

/**
 * Make a markdown text summarizing the dependency graph
 */
function dumpTree(mermaid: Iterable<string>, startupCode: Iterable<string>): string {
  return [
    "## Dependency Graph",
    "",
    "```mermaid",
    ...mermaid,
    "```",
    "",
    "## Startup Example",
    "",
    "```typescript",
    ...startupCode,
    "```",
  ].join("\n")
}

/**
 * Write out the dependency tree to the file in mermaid syntax.
 */
function* makeMermaid(modules: AnyModules, deps: [string, string[]][]): Generator<string> {
  yield "flowchart LR"
  yield* deps.map(([name, deps]) => `${toSnakeCase(name)}["${findModule(modules, name, deps)}<br>${name}"]`)
  yield* deps.flatMap(([name, deps]) =>
    deps.length === 0 ? [] : [`${toSnakeCase(name)} --> ${deps.map(toSnakeCase).join(" & ")}`],
  )
}

/** Determine which module a name belongs to. */
function findModule(modules: AnyModules, name: string, deps: string[] | undefined): string {
  if (name.endsWith(".ts")) {
    return "root/"
  }
  let mod = Object.entries(modules).find(([_, v]) => name in v)?.[0]
  if (!mod) {
    const hasDependency = deps?.length
    if (hasDependency) {
      return "(alias)"
    } else {
      return "(const)"
    }
  }
  return `${toKebabCase(mod)}/`
}

/** Generates an example TypeScript code for startup */
function* dumpStartupCode(
  modules: AnyModules,
  depList: [string, string[]][],
  registry: Map<string, AnyEntry>,
): Generator<string> {
  const catalog: [string, string][] = depList.flatMap(([name]) =>
    registry.get(name)?.[0] === "prepareOne" ? [[toCamelCase(name), name]] : [],
  )
  const moduleNames = Object.groupBy(catalog, ([, depName]) => findModule(modules, depName, undefined))

  for (const [mod, subcatalog] of Object.entries(moduleNames)) {
    yield `import { ${subcatalog?.map(([, t]) => t).join(", ")} } from "src/${mod}"`
  }
  yield `import type { BackgroundConstants, ComposeConstants, OptionsConstants } from "src/root"`

  yield ""
  yield "export type Catalog = {"
  yield* catalog.map(([name, t]) => `  ${name}: ${t}`)
  yield "}"
  yield ""
  yield "export function startup(consts: BackgroundConstants & ComposeConstants & OptionsConstants): Catalog {"
  yield* dumpStartupBody(depList, registry)
  yield ""
  yield `  return {${catalog.map(([name]) => name).join(", ")}}`
  yield "}"
}

/** Generates body building instances for startup */
function* dumpStartupBody(depList: [string, string[]][], registry: Map<string, AnyEntry>): Generator<string> {
  let depMap = new Map(depList)
  for (const name of caseInsensitiveToposort(depList).reverse()) {
    let [method] = registry.get(name) ?? []
    let required = depMap.get(name)?.map(toCamelCase) ?? []
    let camel = toCamelCase(name)

    switch (method) {
      case "const":
        yield `  const ${camel} = consts.${camel}`
        break
      case "prepareOne":
        yield `  const ${camel} = new ${name}(${required.join(", ")})`
        break
      case "resolveAll":
        yield `  const ${camel} = [${required.join(", ")}]`
        break
      case "resolveOne":
        yield `  const ${camel} = ${toCamelCase(required[0] ?? "")}`
        break
      default:
        throw Error("unexpected command name")
    }
  }
}
