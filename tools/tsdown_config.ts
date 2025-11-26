/**
 * @file tsdown configuration
 * Not only does it convert *.ts to *.js, it also does:
 * - Generating index.ts (./barrelsby)
 * - Type checking with tsc (./typecheck_with_tsc)
 * - Running basic unit tests with vitest (./test_sanity)
 * - Generating manifest.json (./generate_manifest)
 * - Generating messages.json in _locales (./generate_locale_messages)
 * - Bundling and minifying
 * - Copying non-js files in ext/
 *
 * It does NOT do the following:
 * - Linting and formatting (biome)
 * - Running a full test (vitest)
 * - Releasing (git and GitHub actions)
 * - Packaging and signing (web-ext and AMO)
 * - Design, documentation, coding, debugging, dogfooding (humans)
 * - Testing with the real Thunderbird (humans)
 * - Going through AMO review (humans)
 *
 * @see ../doc/building.md
 */

import { existsSync } from "node:fs"
import { join } from "node:path"
import { env } from "node:process"
import { replacePlugin } from "rolldown/experimental"
import type { Options, UserConfig } from "tsdown"
import { barrelsby } from "./barrelsby"
import { codecov } from "./codecov"
import { generateLocaleMessages } from "./generate_locale_messages"
import { generateManifest } from "./generate_manifest"
import { testSanity } from "./test_sanity"
import { chunkFileNames, makeAbsoluteSourcePath, makeRelativeSourcePath } from "./tsdown_path"
import { typecheckWithTsc } from "./typecheck_with_tsc"

// biome-ignore lint/style/noDefaultExport: tsdown requires it
export default (): UserConfig => [
  { ...commonConfig, ...esmConfig },
  { ...commonConfig, ...iifeConfig },
]

const isRelease: boolean = env.CI === "true" || existsSync(join(__dirname, "..", "ext", "manifest.json"))

// biome-ignore lint/nursery/useExplicitType: we want tsc to infer it
const commonConfig = {
  outDir: "dist/ext/",
  tsconfig: "src/root/tsconfig.json",
  ignoreWatch: [/[/](?:[.]|build[/]|dist[/])/i, /index[.]ts$/i],
  platform: "browser",
  // Corresponds to Thunderbird 128 ESR
  target: "firefox128",
  sourcemap: true,
  // We don't remove whitespaces for people like me who enjoy unpacking xpis and reading the content.
  // We still bundle because it reduces the number of files to check.
  minify: "dce-only",
  noExternal: /(?:)/,
  define: {
    // Remove in-source tests
    "import.meta.vitest": "undefined",
  },
  report: {
    gzip: false,
  },
  outputOptions: {
    entryFileNames: "js/[name].js",
    intro: "'use strict';",
    sourcemapPathTransform: isRelease ? makeRelativeSourcePath : makeAbsoluteSourcePath,
    chunkFileNames,
    plugins: [
      // Adjust console logs
      replacePlugin(
        {
          "console.log(": isRelease ? ";(" : 'console.log("[Ghostbird]",',
          "console.debug(": isRelease ? ";(" : 'console.debug("[Ghostbird]",',
          "console.info(": 'console.info("[Ghostbird]",',
          "console.warn(": 'console.warn("[Ghostbird]",',
          "console.error(": 'console.error("[Ghostbird]",',
        },
        {
          delimiters: ["\\b", '(?!"\\[Ghostbird\\])'],
        },
      ),
    ],
    advancedChunks: {
      groups: [
        // Separate library files
        {
          test: "node_modules",
          name: (moduleId: string): string => moduleId,
        },
      ],
    },
  },
} satisfies Options

// biome-ignore lint/nursery/useExplicitType: we want tsc to infer it
const esmConfig = {
  name: "ext",
  entry: [
    // Bundled to ext/js/*.js
    "src/root/background.ts",
    "src/root/options.ts",
  ],
  format: "es",
  // Add non-js files
  copy: { from: "ext", to: "dist/ext" },
  plugins: [
    // Generate index.ts
    barrelsby(),
    // Run basic tests
    !isRelease && testSanity(),
    // Run tsc
    !isRelease && typecheckWithTsc(),
    // Generate manifest.json
    generateManifest(isRelease ? { env } : undefined),
    // Generate _locales/*/messages.json
    generateLocaleMessages({ path: "./locales.toml" }),
    // Upload bundle size info to Codecov
    isRelease ? codecov({ env, bundleName: "background" }) : null,
  ],
} satisfies Options

// biome-ignore lint/nursery/useExplicitType: we want tsc to infer it
const iifeConfig = {
  name: "compose",
  entry: [
    // Bundled to ext/js/compose.js as a plain non-ESM js
    "src/root/compose.ts",
  ],
  format: "iife",
  plugins: [
    // Upload bundle size info to Codecov
    isRelease ? codecov({ env, bundleName: "compose" }) : null,
  ],
} satisfies Options

// Check that the keys are disjoint
type Test<A, B> = Extract<A, B> extends never ? "ok" : ["Keys overlap", A & B]
"ok" satisfies Test<keyof typeof commonConfig, keyof typeof esmConfig>
"ok" satisfies Test<keyof typeof commonConfig, keyof typeof iifeConfig>
