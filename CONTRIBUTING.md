# Contributing

* Feel free to open issues and submit pull requests.
* See [Open source etiquette](https://developer.mozilla.org/docs/MDN/Community/Open_source_etiquette) for general guidelines.
* By contributing, you agree that your contributions will be [dual-licensed under MPL-2.0 OR GPL-3.0-or-later](./LICENSE).

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/exteditor/ghostbird?quickstart=1)

## Introduction

* Ghostbird is a Thunderbird add-on that allows you to edit email text in your favorite text editor using the [GhostText protocol][protocol].
* It works by connecting to a GhostText server (listening on port 4001 by default) via WebSocket and relaying messages between the compose window and the server.
* You can find a sequence diagram in [`doc/design.md`](./doc/design.md#sequence-diagram).

## Requirements

You need at least the following:

- [Git](https://git-scm.com/download)
- [Thunderbird](https://thunderbird.net/)
- [Node.js](https://nodejs.org/download/) LTS (v24.22.1 as of writing) or a compatible one that can run Yarn
- Your favorite code editor (e.g., [VSCodium](https://vscodium.com/))
- [a GitHub account](https://github.com/join)\*

Running `yarn` will fetch the rest of JS tools.

\* If you don't like GitHub, we have mirrors on [Codeberg](https://codeberg.org/exteditor/ghostbird/) and [GitLab](https://gitlab.com/exteditor/ghostbird), although it may not be as up-to-date. Try pinging by raising an issue on one of those platforms.

## Workflow (If you found a typo or just want to add documentation)

* If the edit doesn't touch the code, you can skip the build and test steps below.
* You can just edit the file on the GitHub website and create a PR.

## Workflow (If it involves coding)

* Pick a task from our [project board][proj] or add your own [issue][issue].
  * Pinging maintainers on the issue page or [the discussion page][discussion] is a good practice.
  * Submitting PRs directly to start a discussion is also fine.
* Fork the repo.
* Clone your forked repo and `cd` into it.
* Install Yarn by `corepack install && corepack enable`.
  * See [`.devcontainer/init.sh`](./.devcontainer/init.sh) for example.
  * You might have to prefix the command with `npx corepack` if you're using Node.js v25+.
  * You can continue using `corepack yarn` without installing Yarn globally.
  * See [the note about `corepack` in the Yarn documentation](https://yarnpkg.com/corepack) for details.
* Run `yarn` to install dependencies.
* Run `yarn test`. If it fails, that's on the maintainers; please open an issue and attach `build/test/result.xml`.
* Make your changes and debug.
  * Run `yarn build` to build the extension.
  * Run `yarn start` to launch Thunderbird with the extension loaded temporarily.
  * Add unit tests as a byproduct of debugging, or if you feel generous.
  * Run `yarn check` and `yarn fix` to lint and format.
* Run `yarn test` again.
* Commit and push your changes.
* Create a pull request.
* Install the changed add-on and dogfood your changes in Thunderbird in the meantime. (You're using Thunderbird daily, aren't you?)

## Individual tasks

### Build

* Run `yarn build` to build. A zip file will be created in `dist/`.
* Run `yarn watch` to watch for changes and rebuild automatically while editing.

### Read

* See the [Structure section of `design.md`](./doc/design.md#structure) for how the code is organized.
* Run `yarn doc` to generate API documentation.
* Ask on the [issue][issue] or [discussion][discussion] pages if documentation is insufficient to figure out how to implement something.

### Code

* Use your favorite code editor.
* Run `yarn check` to check code style and types.
* Run `yarn fix` to fix issues found with `yarn check`.
* Run `yarn format` to format code.
* Running `yarn sdk $your_editor_name` might make it work more smoothly, e.g., Vim, Emacs, or VSCode. See [Yarn SDK](https://yarnpkg.com/getting-started/editor-sdks) for details.

### Test

* Run `yarn test`.
* Results are output to `build/test/`.
* See [`doc/testing.md`](./doc/testing.md) for details.
* Not adding test cases is fine, but please describe how to test the changed part manually in the commit message.

### Debug

* It's convenient to use [`yarn exec web-ext run`](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) to start Thunderbird with Ghostbird loaded temporarily. It's aliased as `yarn start`.
  * However, by default, it starts Firefox, which is not what we want.
  * Copy [`.web-ext-config.example.mjs`](./.web-ext-config.example.mjs) to `.web-ext-config.mjs` and adjust to your environment.
* `web-ext` will start Thunderbird with a blank profile. You may want to use `--keep-profile-changes` to prepare [a testing profile](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#use-a-custom-profile).
* Also, VSCode can be used as a debugger. See [`.vscode/launch.example.json`](./.vscode/launch.example.json) for an example config. Copy to `.vscode/launch.json` and edit the paths as needed.

### Commit

* Run `yarn fix` to lint and format the code.
* Commit your changes. If you're wondering what to write, here's a template:

```
{fix|feat|feat!|docs|refactor|test|chore}: ${what_I_changed_in_imperative_mood}

${you_should_merge_my_awesome_commit_heres_why}
${this_change_impacts_users_like_this}
${this_change_can_be_tested_by_doing_these_steps}
```

### Send a pull request

* Push to your forked repo.
* Create a pull request on the GitHub website, or your favorite GitHub client.

## Code style

* We mostly adhere to [biome defaults](https://biomejs.dev/linter/rules/use-naming-convention/) for formatting and linting, with some exceptions that reflect my personal preferences.
* You can adjust [`.editorconfig`](./.editorconfig) and [`biome.jsonc`](./biome.jsonc) to your taste locally, but please make sure to run `yarn fix` with the original config before sending a PR.
* PRs that suggest adjusting these are also welcome, as long as they don't cause a huge rewrite.

## FAQ

* See [`doc/faq.md`](./doc/faq.md).

## Link

* [Ghostbird Wiki][wiki]
* [`doc/design.md`](./doc/design.md)
* [`doc/testing.md`](./doc/testing.md)
* [`doc/faq.md`](./doc/faq.md)

[protocol]: https://github.com/fregante/GhostText/blob/refs/heads/main/PROTOCOL.md
[wiki]: https://github.com/exteditor/ghostbird/wiki
[issue]: https://github.com/exteditor/ghostbird/issues
[discussion]: https://github.com/exteditor/ghostbird/discussions
[proj]: https://github.com/exteditor/ghostbird/projects
