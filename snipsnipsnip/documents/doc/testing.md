[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / doc/testing

# Testing

## Unit tests

* Unit tests can be run with `yarn test`.
  * `yarn test:watch` runs tests continuously as you edit.
  * `yarn test:ui` shows a pretty GUI as a local webpage powered by [Vitest UI](https://vitest.dev/guide/ui.html).
    * Your editor may also have an add-on to integrate Vitest.
  * Test results are output to the `build/test/` directory.
* Test files are:
  * `src/test/*.ts` contain tests that exercise multiple modules, possibly across layers, through exported public   API.
  * Also, non-test source files (`src/<other module>/*.ts`) may have test cases at the end guarded by `if (import.meta.vitest) { ... }`. They are called [in-source tests](https://vitest.dev/guide/in-source.html) and are suitable for testing individual private module functions and demonstrating usage examples.
* Policy
  * We mainly test the modules in `src/ghosttext-session/` and `src/ghosttext-runner/` as they contain most of the logic (and we should strive to keep it that way). Think of other modules as adapters to the Thunderbird API.
  * We don't aim for 100% coverage, just enough to prevent regressions.

## Manual tests

* Make sure to have a GhostText server running (e.g. in VSCode or Sublime Text).
* Open a compose window and click the Ghostbird button.
* Poke around and see if it works as expected.
* Do weird things to see if it breaks.
  * We should list the places to poke here (or possibly in a wiki page) for regression tests.

### Todo

I think automating them is possible to some extent because the Thunderbird API allows an add-on to open compose windows and trigger its own shortcut keys, but building a test harness on top of that would be a lot of work, so I'll leave it for future development. Maybe after v2.0.0, when we have a fully controllable GhostText Server implementation, we can use it as the counterpart of the endpoint.
