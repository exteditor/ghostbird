[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / ComposeTab

# Class: ComposeTab

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:4

an utility to interact with a mail compose window

## Implements

- [`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md)

## Constructors

### Constructor

> **new ComposeTab**(`tabId`, `tabs`, `scripting`, `compose`, `composeAction`): `ComposeTab`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:10

#### Parameters

##### tabId

`number`

##### tabs

*typeof* `tabs`

##### scripting

[`IScriptingAPI`](../interfaces/IScriptingAPI.md)

##### compose

*typeof* `compose`

##### composeAction

*typeof* `composeAction`

#### Returns

`ComposeTab`

## Properties

### compose

> `readonly` **compose**: *typeof* `compose`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:8

***

### composeAction

> `readonly` **composeAction**: *typeof* `composeAction`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:9

***

### scripting

> `readonly` **scripting**: [`IScriptingAPI`](../interfaces/IScriptingAPI.md)

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:7

***

### tabId

> `readonly` **tabId**: `number`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:5

Practically ID of the compose window

#### Implementation of

[`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md).[`tabId`](../../ghosttext-adaptor/interfaces/IComposeWindow.md#tabid)

***

### tabs

> `readonly` **tabs**: *typeof* `tabs`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:6

## Methods

### getDetails()

> **getDetails**(): `Promise`\<[`ComposeDetails`](../../ghosttext-adaptor/type-aliases/ComposeDetails.md)\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:12

#### Returns

`Promise`\<[`ComposeDetails`](../../ghosttext-adaptor/type-aliases/ComposeDetails.md)\>

Values of input fields

#### Implementation of

[`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md).[`getDetails`](../../ghosttext-adaptor/interfaces/IComposeWindow.md#getdetails)

***

### openPort()

> **openPort**(): [`IGhostServerPort`](../../ghosttext-adaptor/type-aliases/IGhostServerPort.md)

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:15

#### Returns

[`IGhostServerPort`](../../ghosttext-adaptor/type-aliases/IGhostServerPort.md)

a connected port from the background script to the content script

#### Implementation of

[`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md).[`openPort`](../../ghosttext-adaptor/interfaces/IComposeWindow.md#openport)

***

### prepareContentScript()

> **prepareContentScript**(): `Promise`\<`boolean`\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:11

Injects `compose.js` if it hasn't been injected yet

#### Returns

`Promise`\<`boolean`\>

resolves to `true` if the script was injected, or `false` if it was already present

#### Implementation of

[`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md).[`prepareContentScript`](../../ghosttext-adaptor/interfaces/IComposeWindow.md#preparecontentscript)

***

### setDetails()

> **setDetails**(`details`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:13

Updates the input fields

#### Parameters

##### details

[`SettableComposeDetails`](../../ghosttext-adaptor/type-aliases/SettableComposeDetails.md)

The new details to set

#### Returns

`Promise`\<`void`\>

resolves after the update

#### Implementation of

[`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md).[`setDetails`](../../ghosttext-adaptor/interfaces/IComposeWindow.md#setdetails)

***

### setIcon()

> **setIcon**(`path`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab.d.ts:16

Updates the toolbar icon

#### Parameters

##### path

`string`

#### Returns

`Promise`\<`void`\>

resolves when the icon has been set

#### Implementation of

[`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md).[`setIcon`](../../ghosttext-adaptor/interfaces/IComposeWindow.md#seticon)
