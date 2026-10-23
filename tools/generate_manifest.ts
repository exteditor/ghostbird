import { gitDescribe } from "git-describe"
import type { EmittedAsset, Plugin } from "rolldown"
import manifestTemplate from "../manifest_template.json" with { type: "json" }
import pkg from "../package.json" with { type: "json" }

type VersionInfo = { version: string; sha?: string | undefined }

export type Options = { env: Record<string, string | undefined> }

/** Generates manifest.json from the template file */
export const generateManifest = (opts: Options = { env: {} }): Plugin => ({
  name: "generate_manifest",
  async generateBundle(): Promise<void> {
    // Developer may place their own manifest.json to reproduce builds
    let existing = await this.resolve("./ext/manifest.json")
    if (existing) {
      this.info(`manifest.json already exists; skipping generation`)
      return
    }

    this.info("Generating manifest.json")
    let versionInfo = await getVersionInfo(opts).catch((e) => {
      this.warn(e)
      this.warn(
        "Generating dummy version; Build from a Git clone or place your ext/manifest.json to use the real one instead",
      )
      return { version: `0.0.${Date.now()}`, sha: "try placing your manifest.json in ext directory before building" }
    })
    let manifest = makeManifestJson(versionInfo)

    this.emitFile({
      type: "asset",
      fileName: "manifest.json",
      originalFileName: "manifest_template.json",
      source: manifest,
    } satisfies EmittedAsset)
  },
})

/** Build manifest.json by filling in template */
function makeManifestJson({ version, sha }: VersionInfo): string {
  // biome-ignore-start lint/style/useNamingConvention: required by the spec https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/homepage_url
  let contents = {
    ...manifestTemplate,
    version,
    version_name: sha ? `${version}-${sha}` : undefined,
    homepage_url: pkg.homepage,
  }
  // biome-ignore-end lint/style/useNamingConvention: required by the spec https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/homepage_url

  return JSON.stringify(contents, undefined, 2)
}

/** Make the version number to include in manifest.json */
async function getVersionInfo(opts: Options): Promise<VersionInfo> {
  // Use version info from CI environment if available
  // Use Git if not
  return tryGetVersionInfoFromEnv(opts) ?? getVersionInfoFromGit()
}

/** Get version info from GitHub Actions env variables if available */
function tryGetVersionInfoFromEnv({ env }: Options): VersionInfo | undefined {
  let { GITHUB_REF_NAME: refName, GITHUB_SHA: sha, GITHUB_REF_TYPE: refType } = env

  if (!refName || !sha || !refType) {
    return
  }
  if (refType === "tag" && refName.startsWith("v")) {
    // this is a release build
    let version = appendSha(refName.slice(1), sha)
    return { version, sha }
  } else {
    // this is a nightly build
    return { version: `nightly-${refName}-${sha}` }
  }
}

/** Get version info from `git describe` command. */
async function getVersionInfoFromGit(): Promise<VersionInfo> {
  let { semverString, hash, distance } = await gitDescribe({
    customArguments: ["--abbrev=16"],
  })
  if (!semverString) {
    throw Error("couldn't get the version from git")
  }
  const abbrev = hash.slice(1)
  let version = distance === 0 ? appendSha(semverString, abbrev) : semverString

  return { version }
}

/** Append a git commit id as a suffix to the version number. */
function appendSha(version: string, sha: string): string {
  return `${version}.${Number.parseInt(sha.slice(0, 7), 16)}`
}
