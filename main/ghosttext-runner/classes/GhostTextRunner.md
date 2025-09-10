[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-runner](../README.md) / GhostTextRunner

# Class: GhostTextRunner

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/ghost\_text\_runner.d.ts:3

## Constructors

### Constructor

> **new GhostTextRunner**(`ghostTextConnector`, `clientOptions`, `ghostTextClient`, `heart`): `GhostTextRunner`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/ghost\_text\_runner.d.ts:9

#### Parameters

##### ghostTextConnector

[`IGhostTextConnector`](../interfaces/IGhostTextConnector.md)

##### clientOptions

[`IClientOptions`](../interfaces/IClientOptions.md)

##### ghostTextClient

[`GhostTextClient`](../../ghosttext-session/classes/GhostTextClient.md)

##### heart

[`IHeart`](../interfaces/IHeart.md)

#### Returns

`GhostTextRunner`

## Properties

### isSingleton

> `static` **isSingleton**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/ghost\_text\_runner.d.ts:8

## Methods

### run()

> **run**(`statusIndicator`, `editor`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/ghost\_text\_runner.d.ts:10

#### Parameters

##### statusIndicator

[`IStatusIndicator`](../interfaces/IStatusIndicator.md)

##### editor

[`IClientEditor`](../interfaces/IClientEditor.md)

#### Returns

`Promise`\<`void`\>

***

### runHandshakeCommand()

> **runHandshakeCommand**(`indicator`, `command`): `Promise`\<\[[`CommandResult`](../../ghosttext-session/type-aliases/CommandResult.md)\] \| \[[`CommandResult`](../../ghosttext-session/type-aliases/CommandResult.md), [`ISession`](../interfaces/ISession.md)\]\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/ghost\_text\_runner.d.ts:11

#### Parameters

##### indicator

[`IStatusIndicator`](../interfaces/IStatusIndicator.md)

##### command

[`Command`](../../ghosttext-session/type-aliases/Command.md)

#### Returns

`Promise`\<\[[`CommandResult`](../../ghosttext-session/type-aliases/CommandResult.md)\] \| \[[`CommandResult`](../../ghosttext-session/type-aliases/CommandResult.md), [`ISession`](../interfaces/ISession.md)\]\>

***

### runSessionCommand()

> **runSessionCommand**(`indicator`, `editor`, `session`, `command`): `Promise`\<[`CommandResult`](../../ghosttext-session/type-aliases/CommandResult.md)\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/ghost\_text\_runner.d.ts:12

#### Parameters

##### indicator

[`IStatusIndicator`](../interfaces/IStatusIndicator.md)

##### editor

[`IClientEditor`](../interfaces/IClientEditor.md)

##### session

[`ISession`](../interfaces/ISession.md)

##### command

[`Command`](../../ghosttext-session/type-aliases/Command.md)

#### Returns

`Promise`\<[`CommandResult`](../../ghosttext-session/type-aliases/CommandResult.md)\>
