[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [app-background](../README.md) / BackgroundEventRouter

# Class: BackgroundEventRouter

Defined in: work/ghostbird/ghostbird/build/src/app-background/background\_event\_router.d.ts:3

## Constructors

### Constructor

> **new BackgroundEventRouter**(`composeActionNotifier`, `composeTabDetector`, `commandConfig`): `BackgroundEventRouter`

Defined in: work/ghostbird/ghostbird/build/src/app-background/background\_event\_router.d.ts:8

#### Parameters

##### composeActionNotifier

[`ComposeActionNotifier`](ComposeActionNotifier.md)

##### composeTabDetector

[`IComposeWindowDetector`](../interfaces/IComposeWindowDetector.md)

##### commandConfig

[`ICommandConfig`](../interfaces/ICommandConfig.md)

#### Returns

`BackgroundEventRouter`

## Properties

### commandConfig

> `readonly` **commandConfig**: [`ICommandConfig`](../interfaces/ICommandConfig.md)

Defined in: work/ghostbird/ghostbird/build/src/app-background/background\_event\_router.d.ts:6

***

### composeActionNotifier

> `readonly` **composeActionNotifier**: [`ComposeActionNotifier`](ComposeActionNotifier.md)

Defined in: work/ghostbird/ghostbird/build/src/app-background/background\_event\_router.d.ts:4

***

### composeTabDetector

> `readonly` **composeTabDetector**: [`IComposeWindowDetector`](../interfaces/IComposeWindowDetector.md)

Defined in: work/ghostbird/ghostbird/build/src/app-background/background\_event\_router.d.ts:5

***

### isSingleton

> `static` **isSingleton**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/app-background/background\_event\_router.d.ts:7

## Methods

### handleCommand()

> **handleCommand**(`command`, `tab`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/app-background/background\_event\_router.d.ts:10

Handles shortcut key presses defined in the manifest.json

#### Parameters

##### command

`string`

##### tab

[`ITab`](../interfaces/ITab.md)

#### Returns

`Promise`\<`void`\>

***

### handleComposeAction()

> **handleComposeAction**(`tab`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/app-background/background\_event\_router.d.ts:14

Handles the toolbar button press

#### Parameters

##### tab

[`ITab`](../interfaces/ITab.md)

#### Returns

`Promise`\<`void`\>

***

### handleMessage()

> **handleMessage**(`_msg`, `_tab`): `string`

Defined in: work/ghostbird/ghostbird/build/src/app-background/background\_event\_router.d.ts:16

handles one-off messages from content scripts

#### Parameters

##### \_msg

`unknown`

##### \_tab

`undefined` | [`ITab`](../interfaces/ITab.md)

#### Returns

`string`
