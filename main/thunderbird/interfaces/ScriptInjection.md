[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / ScriptInjection

# Interface: ScriptInjection

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:12

Details of a script injection

## Properties

### args?

> `optional` **args**: `PlainJSONValue`[]

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:22

The arguments to curry into a provided function. This is only valid if the func parameter is specified. These arguments must be JSON-serializable.

***

### files?

> `optional` **files**: `string`[]

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:18

The path of the JS files to inject, relative to the extension's root directory. Exactly one of files and func must be specified.

***

### func()?

> `optional` **func**: (`this`, ...`args`) => `unknown`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:20

A JavaScript function to inject. This function will be serialized, and then deserialized for injection. This means that any bound parameters and execution context will be lost. Exactly one of files and func must be specified.

#### Parameters

##### this

`void`

##### args

...`PlainJSONValue`[]

#### Returns

`unknown`

***

### injectImmediately?

> `optional` **injectImmediately**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:24

Whether the injection should be triggered in the target as soon as possible (but not necessarily prior to page load).

***

### target

> **target**: `object`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:14

Details specifying the target into which to inject the script.

#### tabId

> **tabId**: `number`

***

### world?

> `optional` **world**: `"ISOLATED"` \| `"MAIN"`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:26

The JavaScript world for a script to execute within. ISOLATED is the default execution environment of content scripts, MAIN is the web page's execution environment.
