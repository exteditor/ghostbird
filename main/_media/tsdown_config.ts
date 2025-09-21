/**
 * @file tsdown configuration
 * Not only does it convert *.ts to *.js, it also does:
 * - Generating index.ts (./barrelsby)
 * - Type checking with tsc (./typecheck_with_tsc)
 * - Generating manifest.json (./generate_manifest)
 * - Generating messages.json in _locales (./generate_locale_messages)
 * - Bundling and minifying
 * - Copying non-js files in ext/
 *
 * It does NOT do the following:
 * - Linting and formatting (biome)
 * - Unit-testing (vitest)
 * - Releasing (git and GitHub actions)
 * - Packaging and signing (web-ext and AMO)
 * - Design, documentation, coding, debugging, dogfooding (humans)
 * - Testing with the real Thunderbird (humans)
 * - Going through AMO review (humans)
 */

import { existsSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { env } from "node:process"
import type { Options, UserConfig } from "tsdown"
import { barrelsby } from "./barrelsby"
import { generateLocaleMessages } from "./generate_locale_messages"
import { generateManifest } from "./generate_manifest"
import { typecheckWithTsc } from "./typecheck_with_tsc"

// biome-ignore lint/style/noDefaultExport: tsdown requires it
export default (): UserConfig => {
  return [
    { ...commonConfig, ...esmConfig },
    { ...commonConfig, ...iifeConfig },
  ]
}

const isRelease: boolean = env.CI === "true" || existsSync(join(__dirname, "..", "ext", "manifest.json"))

// biome-ignore lint/nursery/useExplicitType: we want tsc to infer it
const commonConfig = {
  outDir: "dist/ext/",
  tsconfig: "src/root/tsconfig.json",
  ignoreWatch: [/[/](?:[.]|build[/]|dist[/])/i, /index[.]ts$/i],
  platform: "browser",
  // Corresponds to Thunderbird 140 ESR
  target: "firefox140",
  sourcemap: true,
  // We don't remove whitespaces for people like me who enjoy unpacking xpis and reading the content.
  // We still bundle because it reduces the number of files to check.
  minify: "dce-only",
  define: {
    // Remove in-source tests
    "import.meta.vitest": "undefined",
  },
  report: {
    maxCompressSize: 0,
  },
} satisfies Options

// biome-ignore lint/nursery/useExplicitType: we want tsc to infer it
const esmConfig = {
  name: "ext",
  entry: [
    // Bundled to ext/*.js and common parts go to chunks/*.js
    "src/root/background.ts",
    "src/root/options.ts",
  ],
  format: "es",
  outputOptions: {
    chunkFileNames: "chunks/[name].[hash].js",
    sourcemapPathTransform,
  },
  // Add non-js files
  copy: { from: "ext", to: "dist/ext" },
  plugins: [
    // Generate index.ts
    barrelsby(),
    // Run tsc
    typecheckWithTsc(),
    // Generate manifest.json
    generateManifest({ env: isRelease ? (env as Record<string, string>) : {} }),
    // Generate _locales/*/messages.json
    generateLocaleMessages({ path: "./locales.toml" }),
  ],
} satisfies Options

// biome-ignore lint/nursery/useExplicitType: we want tsc to infer it
const iifeConfig = {
  name: "compose",
  entry: [
    // Bundled to ext/compose.js as a plain non-ESM js
    "src/root/compose.ts",
  ],
  format: "iife",
  outputOptions: {
    intro: "'use strict';",
    name: "compose",
    entryFileNames: "[name].js",
    sourcemapPathTransform,
  },
} satisfies Options

// Check the keys are disjoint
type Test<A, B> = Extract<A, B> extends never ? "ok" : ["Keys overlap", A & B]
"ok" satisfies Test<keyof typeof commonConfig, keyof typeof esmConfig>
"ok" satisfies Test<keyof typeof commonConfig, keyof typeof iifeConfig>

// Somehow absolute paths are needed to make sourcemaps browsable
function sourcemapPathTransform(relativeSourcePath: string, sourcemapPath: string): string {
  if (isRelease) {
    // Leave it as is if it's release build
    return relativeSourcePath
  }

  let p = sourcemapPath
  for (let i = 0; ; i++) {
    if (3 < i) {
      throw Error(`Couldn't fix the sourcemap path [${relativeSourcePath}] -> [${sourcemapPath}]`)
    }

    p = dirname(p)

    let resolved = resolve(p, relativeSourcePath)
    if (existsSync(resolved)) {
      return resolved
    }
  }
}
