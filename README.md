# Ghostbird: GhostText for Thunderbird :nest_with_eggs::mailbox::ghost:

[![Supports Thunderbird ESR](https://img.shields.io/badge/supports-Thunderbird_140_ESR-0a84ff?logo=thunderbird&logoSize=auto)][tb]
[![Status: Beta](https://img.shields.io/badge/project_status-beta-d2f641)][rels]
[![Latest release](https://img.shields.io/github/v/release/exteditor/ghostbird?include_prereleases&logo=refinedgithub&logoColor=white&logoSize=auto)][rels]

[![Download on AMO](https://raw.githubusercontent.com/thunderbird/webext-support/refs/heads/master/images/get-the-addon.svg)](#installation)

A [GhostText][gt] implementation for the [Thunderbird][tb] email client.

Ghostbird is a Thunderbird add-on that lets you compose your emails in your favorite text editor - Vim, Neovim, VS Code, Sublime Text, Emacs, or any other editor - with a GhostText add-on installed.

Please visit the website for the original browser add-on, [GhostText][gt] by Federico Brigante, to get the idea.

Since synchronization uses the GhostText protocol, your text editor needs to have a GhostText server function. This means you need to install a plugin on your text editor's side to listen for connections from Thunderbird.

## Requirements

* [Thunderbird 140][tb] (We will mainly support the latest ESR)
* A text editor that has a GhostText server add-on installed and running:

  [![Sublime Text][sublimetext-svg]](https://sublime.wbond.net/packages/GhostText)
  [<img width="48" height="48" alt="VSCodium" title="VSCodium" src="https://raw.githubusercontent.com/VSCodium/vscodium.github.io/refs/heads/master/img/codium_cnl.svg" >](https://open-vsx.org/extension/fregante/ghost-text)
  [![Visual Studio Code][vscode-svg]](https://marketplace.visualstudio.com/items?itemName=fregante.ghost-text)
  [![GNU Emacs][emacs-svg]](https://melpa.org/#/atomic-chrome)
  [![Vim][vim-svg]][vimghost]
  [![Neovim][nvim-svg]](https://github.com/subnut/nvim-ghost.nvim)
  [<img src="https://9fans.github.io/plan9port/dist/spaceglenda100.png" width="48" height="48" alt="Acme" title="Acme">](https://github.com/fhs/Ghost)
  [<img src="https://github.com/user-attachments/assets/b0ca34ed-5508-458f-b7af-2642824bf7f7" width="48" height="48" alt="Helix" title="Helix">][helix]
  [`$ANY_EDITOR`](https://github.com/newsch/GhostText-Any/)

  The last two implementations can wrap any editor that blocks while editing.

## Installation

[<img src="./ext/blue.svg" width="48" height="48" border="1" align="right" alt="logo" title="Grey-headed bushshrike (Malaconotus blanchoti) is sometimes called 'ghostbird'">][bird]

* See [the help page in the Mozilla Support Center](https://support.mozilla.org/kb/installing-addon-thunderbird) for details.

You can install Ghostbird in several ways:

### Install within Thunderbird (Recommended)

1. In Thunderbird, open `Add-ons Manager`.
2. Search for "Ghostbird".
3. Click the <kbd>+ Add to Thunderbird</kbd> button.

### Download and install manually

1. Download the latest release from the [Thunderbird add-on website][amo] or [Github Releases][rels].
2. In Thunderbird, go to `Add-ons Manager`.
3. Drag and drop the downloaded `.xpi` file into the `Add-ons Manager` window.

Alternatively, you can:

3. Press :gear: button at the top-right.
4. Select `Install Add-on From File...` from the menu.
5. Select downloaded `.xpi` file.

### Build from source

* Basically, running `make` will do, which is roughly equivalent to `yarn install && yarn build`.
* See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

## Usage

1. Launch your favorite text editor.
2. Start the GhostText server in your text editor (e.g., with `:GhostTextStart` in Vim).
3. Press the gray Ghostbird button <img alt="Gray button" src="./ext/gray.svg" width="24" height="24" border="1"> in the Thunderbird mail compose window. (The default shortcut is <kbd>^Ctrl</kbd>+<kbd>⇧Shift</kbd>+<kbd>H</kbd>)
   * If the connection is successful, the button will turn blue <img alt="Blue button" src="./ext/blue.svg" width="24" height="24" border="1">.
   * If the connection fails, the button will turn red <img alt="Red button" src="./ext/red.svg" width="24" height="24" border="1">. Make sure that the GhostText server is listening. See [Troubleshooting page of original GhostText](https://ghosttext.fregante.com/troubleshooting/#unable-to-connect).
4. Write your email in the text editor.
5. Close your text editor to stop Ghostbird.

* Example using [Vim-Ghost][vimghost]

  [vimghost.webm](https://github.com/user-attachments/assets/150ef991-10b8-45e2-bb2c-690f1b45a7ea)

* Example using Notepad++ via GhostText-Any

  <img width="600" height="302" alt="Screenshot using Notepad++ with GhostText-Any" src="https://github.com/user-attachments/assets/a4f92beb-a6f2-4a67-ae94-aa02af64539e" />

## How it works

* See [design.md](./doc/design.md) for details.

```mermaid
flowchart LR
subgraph Thunderbird
    mailCompose@{label: Compose<br>Window}
    gtClient@{label: Ghostbird}
end

subgraph Your favorite text editor
    gtServer@{label: GhostText<br>Server}
    textEditor@{label: Text editor<br>screen}
end

mailCompose -->|Starts| gtClient
gtClient -->|Connects to| gtServer
gtServer -->|Shows Initial Text| textEditor
textEditor -->|Returns Edited Text| gtServer
gtServer -->|Updates| gtClient
gtClient -->|Updates| mailCompose
```

## Roadmap

See also [a list of milestones][milestones].

<details>
<summary>Changelog & Milestones</summary>

### Legend

|Mark|Meaning|Description|
|----|----|----|
|:white_check_mark:|Done|Released in previous versions|
|:nest_with_eggs:|Experimental|Released recently; please try and tell us if you notice something|
|:construction:|WIP|In development but not released|
|:white_large_square:|Planned|Must be implemented to release the version|
|:no_entry:|Limitation|The version will be released with this limitation|

### Alpha

* v0.0.1 - Released

  * :white_check_mark: Prepare the project skeleton (README, build, test, lint, debug, CI)
  * :white_check_mark: Start button on the toolbar
  * :white_check_mark: Edit plain text emails
  * :white_check_mark: Keyboard shortcuts
  * :white_check_mark: [Milestones][milestones] and [Project board][proj]
  * :no_entry: Non-bidirectional: Thunderbird becomes read-only while Ghostbird is active
  * :no_entry: No i18n: the UI is only in English*
  * :no_entry: Quirky when editing HTML emails

>\*GhostText communicates only in UTF-8, so you can safely write emails in any language.

* v0.1.0 - Released

  * :white_check_mark: [Debug](https://github.com/exteditor/ghostbird/issues/2)

* v0.2.0 - Released

  * :white_check_mark: [Basic option (at minimum, the port of the GhostText server)](https://github.com/exteditor/ghostbird/issues/3)
  * :white_check_mark: [Prepare for i18n (Make texts translatable)](https://github.com/exteditor/ghostbird/issues/4)

### Beta

* v0.2.1 - Released

  * :white_check_mark: [Fix empty host field being sent to the server](https://github.com/exteditor/ghostbird/issues/22)

* v0.3.0 - Released

  * :nest_with_eggs: [Show notifications](https://github.com/exteditor/ghostbird/issues/24)
  * :nest_with_eggs: [Continue i18n (Add more languages)](https://github.com/exteditor/ghostbird/issues/26)

* v0.4.0 - Current

  * :nest_with_eggs: [Add a way to disconnect using only a mouse](https://github.com/exteditor/ghostbird/issues/30)

* v0.5.0 - 2025 Q4

  * :nest_with_eggs: [Website with some screenshots](https://github.com/exteditor/ghostbird/issues/5)
  * :construction: [Edit a HTML email as if it were a plain text email](https://github.com/exteditor/ghostbird/issues/6)

* v0.x.x - 2025 Q4

  * :white_large_square: [Workaround for the problem where the email text is cleared when VSCod(e|ium) closes or saves the tab](https://github.com/exteditor/ghostbird/issues/23)

### Stable

* v1.0.0 - 2026 Q2

  * :white_large_square: [Mark as stable on AMO (functionally identical to the last beta)](https://github.com/exteditor/ghostbird/issues/9)

* v1.x.x - 2026 Q4

  * :white_large_square: [Edit Address and Subject fields](https://github.com/exteditor/ghostbird/issues/8)
  * :white_large_square: [Support text editors that lack a GhostText add-on (e.g., Notepad)*](https://github.com/exteditor/ghostbird/issues/25)

> \*Requires protocol extension and server-side support. I intend to develop one by forking [GhostText-Any](https://github.com/newsch/GhostText-Any/).

### Future

* v2.x.x

  * [Proper implementation as a GhostText client](https://github.com/exteditor/ghostbird/issues/10)
    * :white_large_square: Cursor and selection synchronization
    * :white_large_square: Bidirectional editing; changes in Thunderbird are reflected in the text editor

  * :white_large_square: Better handling of conflicts, disconnection, and reconnection (possibly extending the protocol)
  * :white_large_square: [Automate AMO release on GitHub Action](https://github.com/exteditor/ghostbird/issues/27)

### Non-goals

* Editing text boxes other than the email compose window in Thunderbird
* WYSIWYG editing for HTML emails
* Thunderbird Mobile support

</details>

## Contributing

If you like the idea, please:

* [Star the repo](https://github.com/exteditor/ghostbird/#repository-container-header).
* [Rate the add-on][review].
* Feel free to open issues and submit pull requests. See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.
* See our [milestones page][milestones] or [issues](https://github.com/exteditor/ghostbird/issues) for tasks you can contribute to, and use the [Discussions](https://github.com/exteditor/ghostbird/discussions) page for general discussions.

### Help wanted

We need help with:

* [Website](https://exteditor.github.io/ghostbird/) and materials (please post [screenshots to the wiki](https://github.com/exteditor/ghostbird/wiki/Screenshots))
* Translations (check [`locales.toml`](./locales.toml) and let us know of any issues)
* [Testing with various text editors](https://github.com/exteditor/ghostbird/wiki/TextEditorsKnownToWorkWith)
* [Testing with various OSes](https://github.com/exteditor/ghostbird/wiki/OSesKnownToWorkWith)
* Wiki pages for [user guides](https://github.com/exteditor/ghostbird/wiki/HowTo) and [troubleshooting](https://github.com/exteditor/ghostbird/wiki/Troubleshooting)
* Developing the server counterpart so that this can be used as a replacement for External Editor ([GhostText-Any](https://github.com/newsch/GhostText-Any/) or [Helix-Ghost][helix] can be a good starting point)
* Creating a checklist for testing and debugging ([This page](https://github.com/exteditor/exteditor/wiki/Things-to-test) can be a good starting point)
* Automating tests with the actual Thunderbird (See [Testing](./doc/testing.md))
* Organization members (we want to increase [the organization](https://github.com/exteditor/)'s [bus factor](https://en.wikipedia.org/wiki/Bus_factor))

## FAQ

### Is it safe to use?

* I'd say yes, but save your work frequently since it may contain bugs and eat your email.
* This add-on does not collect any personal data and can only connect to localhost. Attempts to send any data to external servers are blocked by Thunderbird's security model.
* You can look inside the released `.xpi` files (which are just zip files) to verify that they match the build from the source code.
* As for trustworthiness, the safest option is to wait until it reaches 1.0.0, as that indicates it has passed Mozilla's manual review.

### Why not just fork the original GhostText add-on, or contribute to it?

* See [faq.md](./doc/faq.md#why).

### How do I set up a development environment?

* See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on the development workflow.

### How do I troubleshoot connection issues?

* Make sure that the GhostText server is listening. See the [Troubleshooting page of original GhostText](https://ghosttext.fregante.com/troubleshooting/#unable-to-connect).

### How do I switch between HTML mode and Plain Text mode?

* See [doc/faq.md](./doc/faq.md#mode).

### How can I support the project?

Please consider the following options:

* [Star the repo](https://github.com/exteditor/ghostbird/#repository-container-header)
* [Rate the add-on][review]
* [Donate to Thunderbird](https://www.thunderbird.net/en-US/donate/) (It's financially separate from Firefox)
* [Donate to @fregante, the author of the original GhostText](https://github.com/sponsors/fregante)
* [Contribute to the development](#help-wanted)

If you've looked at the options above and still want to motivate the maintainer [@snipsnipsnip](https://github.com/snipsnipsnip) specifically, you can tip some [ETH](https://gist.githubusercontent.com/snipsnipsnip/d0b0bd12045060c8f71fbc9ea936d886/raw/a840747caa6cac61d0bd3b59145e6ed7e9daf14f/eth.json).

## Credits

* [Federico Brigante](https://fregante.com/), the author of [GhostText][gt].
* [Alexandre Feblot](https://github.com/afeblot), the original author of [External Editor](https://github.com/exteditor/exteditor/), which I took over maintaining; it is now in a stale state. I intend to incorporate some of its features into Ghostbird.
* The button image is based on a [photo](https://commons.wikimedia.org/wiki/File:Grey-headed_Bushshrike_(Malaconotus_blanchoti)_in_tree,_crop.jpg) of a [Grey-headed Bushshrike][bird] by [Patty McGann](https://www.flickr.com/photos/10374910@N08/3093177192/) (CC-BY-2.0).

### Tools

[![Managed with Yarn](https://img.shields.io/badge/managed_with-Yarn-2c8ebb?logo=yarn&logoColor=white)](https://yarnpkg.com)
[![rolled with barrelsby](https://img.shields.io/badge/%F0%9F%9B%A2rolled_with-Barrelsby-white)](https://github.com/bencoveney/barrelsby)
[![Typed with tsc](https://img.shields.io/badge/typed_with-tsc-3178Cc?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Linted with Biome](https://img.shields.io/badge/linted_with-Biome-60a5fa?logo=biome&logoSize=auto)](https://biomejs.dev)
[![Tested with Vitest](https://img.shields.io/badge/tested_with-Vitest-6e9f18?logo=vitest&logoSize=auto)](https://vitest.dev)
[![Bundled with tsdown](https://img.shields.io/badge/bundled_with-tsdown-ff7e17?logo=rolldown)](https://tsdown.dev)
[![Packaged with web-ext](https://img.shields.io/badge/packaged_with-web--ext-00d230?logo=mozilla)](https://github.com/mozilla/web-ext#web-ext)

### Services

[![Github Actions Status](https://github.com/exteditor/ghostbird/actions/workflows/build.yml/badge.svg)](https://github.com/exteditor/ghostbird/actions/workflows/build.yml)
[![Reviewed by CodeRabbit](https://img.shields.io/coderabbit/prs/github/exteditor/ghostbird?utm_source=oss&utm_medium=github&utm_campaign=exteditor%2Fghostbird&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews&logo=coderabbit&logoSize=auto)](https://github.com/search?q=repo%3Aexteditor%2Fghostbird&type=pullrequests&s=created&o=desc)
[![Covered by Codecov](https://codecov.io/github/exteditor/ghostbird/graph/badge.svg?token=NDWAK8NEC6)](https://app.codecov.io/github/exteditor/ghostbird/commits)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/exteditor/ghostbird)

## License

[![License: MPL-2.0](https://img.shields.io/badge/license-MPL--2.0-00d230?logo=mozilla)](https://www.mozilla.org/en-US/MPL/2.0/)
[![License: GPLv3](https://img.shields.io/badge/license-GPLv3-bd0000?logo=gplv3&logoSize=auto)](https://www.gnu.org/licenses/gpl-3.0.html)<br>
Ghostbird is [dual-licensed under (MPL-2.0 OR GPL-3.0-or-later)](./LICENSE). See also [NOTICE](./ext/NOTICE.md).

[proj]: https://github.com/exteditor/ghostbird/projects
[milestones]: https://github.com/exteditor/ghostbird/milestones
[tb]: https://www.thunderbird.net/download/esr/
[gt]: https://ghosttext.fregante.com/
[helix]: https://github.com/rahji/helix-ghost
[rels]: https://github.com/exteditor/ghostbird/releases
[sublimetext-svg]: ./doc/res/sublimetext.svg
[vscode-svg]: ./doc/res/vscode.svg
[emacs-svg]: ./doc/res/emacs.svg
[vim-svg]: ./doc/res/vim.svg
[nvim-svg]: ./doc/res/nvim.svg
[bird]: https://en.wikipedia.org/wiki/Grey-headed_bushshrike
[protocol]: https://github.com/fregante/GhostText/blob/refs/heads/main/PROTOCOL.md
[amo]: https://addons.thunderbird.net/addon/ghostbird/
[vimghost]: https://github.com/raghur/vim-ghost
[review]: https://addons.thunderbird.net/en-US/thunderbird/addon/ghostbird/reviews/add
