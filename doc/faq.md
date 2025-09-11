## FAQ (general)

### What is Ghostbird?

* [Ghostbird](https://github.com/exteditor/ghostbird/) is a Thunderbird add-on that allows you to edit email text in your favorite text editor.
* Original [GhostText][gt] is an add-on for browsers that lets you edit textboxes on the webpage using your favorite text editor.
* Both work by connecting to a GhostText server, which is listening on port 4001 (the default), via [WebSocket](https://en.wikipedia.org/wiki/WebSocket) and relaying text between the compose window and the text editor.

### Is it safe to use?

* See [FAQ section in README.md](../README.md#faq).

## FAQ (usage)

### Which Thunderbird versions are supported?

* Thunderbird 128+ (We will mainly support ESR)
* Testing with newer versions is welcome. Please report if you noticed something in newer Thunderbird versions.

### What text editors are supported?

* See [Requirements section in README.md](../README.md#requirements), but it isn't the official list. If your favorite editor isn't listed, try searching for it.
* If you tried the add-on, please add your text editor to [the wiki page](https://github.com/exteditor/ghostbird/wiki/Text_editors_known_to_work_with).

### How do I install it?

* See [Installation section in README.md](../README.md#installation).

### How do I start it?

* See [Usage section in README.md](../README.md#usage).

### How do I troubleshoot connection issues?

* Make sure that the GhostText server is listening. See the [Troubleshooting page of original GhostText](https://ghosttext.fregante.com/troubleshooting/#unable-to-connect).

### Can I use this with multiple Thunderbird accounts or emails?

* Yes, it should work as long as your text editor supports editing multiple files at once.

### I found an issue. Where should I report it?

* Try searching the GitHub pages like [discussion][discussion], [wiki][wiki], and [issue][issue] pages. Please post to the discussion or issue page if you find nothing.

### How do I switch between HTML mode and Plain Text mode? {#mode}

> TL;DR: Set your preferred format in `Account Settings`>`Composition & Addressing`, then start a new message.

* In recent versions of Thunderbird, editing mode can't be switched after you start writing an email.
* Confusingly, editing mode is set at two places: profile-wide and per-account.
  * You can set profile-wide option at `Setting`>`Composition`>`Sending Format` section. Choose one from `Automatic`, `Both HTML and Plain Text`, `Only HTML`, and `Only Plain Text`.

    <img width="400" height="194" title="profile-wide email format config" alt="profile-wide email format config" src="https://github.com/user-attachments/assets/cbbe7494-1cce-4da8-944f-f5b99d925de4" />

  * You can set per-account option at `Account Setting`>`Composition & Addressing`>`Composition` section. Check or uncheck the `Compose messages in HTML format` checkbox.
 
    <img width="400" height="184" alt="per-account email format config" title="per-account email format config" src="https://github.com/user-attachments/assets/9305cec5-dc83-4893-8128-bdbaadaa9f6f" />

* After adjusting the option, you have to start a `New Message`.

## FAQ (project)

### Roadmap?

* See [README.md](../README.md#roadmap).

### The button icon is terrible. How do I contribute?

* See [README.md](../README.md#contributing).
* See [CONTRIBUTING.md](../CONTRIBUTING.md).
* As for the icon, I'm planning to add an option to choose between icons so that you can switch them. Please upvote [the issue][chooseicon] if it bothers you.
* New icons are welcome, of course, preferably in SVG.

### Why not just fork the original GhostText add-on, or contribute to it? {#why}

* I have a specific requirement to extend [the GhostText protocol][protocol] on both the client and server sides, which would allow configuration made in the client UI to be sent to the server. I think the original add-on, which is supposed to be simple, is not suitable for that purpose.
* Thunderbird-specific changes also seem hard to incorporate without complicating the code. For example, the concepts of a compose window and address lines do not exist in browsers.
* That said, I learned a lot from the original add-on.

### Why not use External Editor as a base?

(For those who don't know: [External Editor](https://github.com/exteditor/exteditor/) was an add-on for Thunderbird that lets you edit email text in an external text editor, which I took over maintaining some years ago; it is now in a stale state. It doesn't work on Thunderbird > 68 and I wanted to revive it.)

* It's not possible with the current Thunderbird API to launch arbitrary external applications like text editors for security reasons. The workarounds required are essentially what GhostText already does.
* So we have to start from scratch either way.
* I intend to replicate some of the features it had in Ghostbird. See [Roadmap](../README.md#roadmap).

### Why not use External Editor Revived as a base?

(For those who don't know: [External Editor Revived by @Frederick888](https://github.com/Frederick888/external-editor-revived) is an add-on for Thunderbird that lets you edit email text in an external text editor, which works in recent Thunderbird versions and actively maintained)

* I started working on Ghostbird while mostly offline. Had I known the existence of ERR, Ghostbird doesn't exist now!
* ERR works using [Native Messaging](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging), which is the only way to launch external process in recent Thunderbird API. It requires a companion app to be installed and registered as a Native Messaging Host. See [ERR's Wiki pages](https://github.com/Frederick888/external-editor-revived/wiki) for details.
* Reasons to continue developing Ghostbird? I think GhostText's live updating functionality is pretty (for now; there is no fundamental reason ERR can't do the same).
* That said, I think you should try ERR before using still-in-alpha Ghostbird, as ERR is more mature and already on [AMO][revived].

  [![External Editor Revived](https://raw.githubusercontent.com/thunderbird/webext-support/refs/heads/master/images/get-the-addon.svg)][revived]

## FAQ (developers)

### How does the add-on work?

* [How it works section in design.md](./design.md#how-it-works) describes how user actions are handled.
* See [Module Dependencies](./design.md#module-dependencies) for what each module does.
* Reading through the bundled `compose.js`, `background.js` and `options.js` may be clearer since they're stripped of TypeScript tricks.

### Why Yarn?

* I love cats and Yarn has [a cat logo](https://github.com/yarnpkg/assets).

### Where are `index.ts`?

* They are not checked into the repo and are generated by a tool.
* Run `yarn index-ts` to generate them. An initial `yarn install` or `yarn build` also generates them.
* [Barrelsby](https://github.com/bencoveney/barrelsby) performs the actual work. See [`tools/barrelsby.ts`](../tools/barrelsby.ts).

### What are these `api.ts` files? They seem to only contain interfaces that aren't implemented.

* Implementations are in other modules, mostly in `thunderbird/*.ts`.
* See [About `api.ts`](./design.md#about-apits) for details.
* See [Module Dependencies](./design.md#module-dependencies) for relations.

### Why do some classes have `static isSingleton` property?

* [`root/startup.ts`][startup] scans for classes that have a `static isSingleton` property defined and instantiates them.
* See [About `startup.ts`](./design.md#about-startupts) for details.
* See [faq-architectural.md](./faq-architectural.md) for some justifications.

### How do I find where a certain functionality is implemented?

* We try to keep most of the logic under `src/ghosttext-session/`. I'd start looking there.

### Aren't these docs too verbose for a small add-on?

* Sorry for that. Actually, these documents were written before I started coding, so it helps me clarify my thoughts.
* I'll keep this up-to-date.
* If a file exceeds 500 lines, I'll consider moving some parts to [a wiki page][wiki].
* I also want to share my thoughts with potential contributors. If you find any parts that are unclear or inaccurate, please let me know via issues or discussions.

[wiki]: https://github.com/exteditor/ghostbird/wiki
[issue]: https://github.com/exteditor/ghostbird/issues
[discussion]: https://github.com/exteditor/ghostbird/discussions
[startup]: ../src/root/startup.ts
[protocol]: https://github.com/fregante/GhostText/blob/main/PROTOCOL.md
[gt]: https://ghosttext.fregante.com/
[chooseicon]: https://github.com/exteditor/ghostbird/issues/<placeholder>
[revived]: https://addons.thunderbird.net/en-US/thunderbird/addon/external-editor-revived/
