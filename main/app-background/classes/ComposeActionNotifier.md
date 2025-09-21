[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [app-background](../README.md) / ComposeActionNotifier

# Class: ComposeActionNotifier

Defined in: work/ghostbird/ghostbird/build/src/app-background/compose\_action\_notifier.d.ts:3

## Constructors

### Constructor

> **new ComposeActionNotifier**(`ghostTextRunner`): `ComposeActionNotifier`

Defined in: work/ghostbird/ghostbird/build/src/app-background/compose\_action\_notifier.d.ts:7

#### Parameters

##### ghostTextRunner

[`GhostTextRunner`](../../ghosttext-runner/classes/GhostTextRunner.md)

#### Returns

`ComposeActionNotifier`

## Properties

### ghostTextRunner

> `readonly` **ghostTextRunner**: [`GhostTextRunner`](../../ghosttext-runner/classes/GhostTextRunner.md)

Defined in: work/ghostbird/ghostbird/build/src/app-background/compose\_action\_notifier.d.ts:4

***

### runners

> `readonly` **runners**: `Map`\<`number`, [`IGhostServerPort`](../../ghosttext-adaptor/type-aliases/IGhostServerPort.md)\>

Defined in: work/ghostbird/ghostbird/build/src/app-background/compose\_action\_notifier.d.ts:6

***

### isSingleton

> `static` **isSingleton**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/app-background/compose\_action\_notifier.d.ts:5

## Methods

### start()

> **start**(`tab`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/app-background/compose\_action\_notifier.d.ts:8

#### Parameters

##### tab

[`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md)

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(`tab`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/app-background/compose\_action\_notifier.d.ts:9

#### Parameters

##### tab

[`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md)

#### Returns

`Promise`\<`void`\>

***

### toggle()

> **toggle**(`tab`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/app-background/compose\_action\_notifier.d.ts:10

#### Parameters

##### tab

[`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md)

#### Returns

`Promise`\<`void`\>
