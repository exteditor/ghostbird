import { rm } from "node:fs/promises"
import { join } from "node:path"
import { argv } from "node:process"
import { fileURLToPath } from "node:url"
import { Barrelsby } from "barrelsby/bin/index.js"
import type { Arguments } from "barrelsby/bin/options/options"
import type { Plugin, PluginContext } from "rolldown"
import tsconfig from "../tsconfig.json" with { type: "json" }

/** Runs barrelsby before building */
export const barrelsby = (opts: Arguments = {}): Plugin => ({
  name: "barrelsby",
  buildStart(this: PluginContext): Promise<void> {
    this.info("Generating index.ts")
    const args = Object.assign({}, tsconfig.barrelsby, opts)
    Barrelsby(args)

    // We don't want src/index.ts
    return rm(join(args.directory, args.name)).catch(() => {})
  },
})

// This runs at `yarn install`
if (argv[1] === fileURLToPath(import.meta.url)) {
  const { buildStart } = barrelsby() as unknown as { buildStart(): void }
  buildStart.apply(console)
}
