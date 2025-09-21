[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-adaptor](../README.md) / EmailEditor

# Class: EmailEditor

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/email\_editor.d.ts:4

Client-side editor (the Thunderbird compose window) that is being synchronized with the external text editor

## Implements

- [`IClientEditor`](../../ghosttext-runner/interfaces/IClientEditor.md)
- [`IStatusIndicator`](../../ghosttext-runner/interfaces/IStatusIndicator.md)

## Constructors

### Constructor

> **new EmailEditor**(`composeWindow`, `port`): `EmailEditor`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/email\_editor.d.ts:7

#### Parameters

##### composeWindow

[`IComposeWindow`](../interfaces/IComposeWindow.md)

##### port

[`IGhostServerPort`](../type-aliases/IGhostServerPort.md)

#### Returns

`EmailEditor`

## Properties

### composeWindow

> `readonly` **composeWindow**: [`IComposeWindow`](../interfaces/IComposeWindow.md)

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/email\_editor.d.ts:5

***

### port

> `readonly` **port**: [`IGhostServerPort`](../type-aliases/IGhostServerPort.md)

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/email\_editor.d.ts:6

## Methods

### applyChange()

> **applyChange**(`change`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/email\_editor.d.ts:10

Applies changes received from the GhostText server to the compose window

#### Parameters

##### change

[`ExternalEdit`](../../ghosttext-session/type-aliases/ExternalEdit.md)

The change from the server

#### Returns

`Promise`\<`void`\>

resolves when updated, or rejects if the editor has been closed

#### Implementation of

[`IClientEditor`](../../ghosttext-runner/interfaces/IClientEditor.md).[`applyChange`](../../ghosttext-runner/interfaces/IClientEditor.md#applychange)

***

### getState()

> **getState**(): `Promise`\<[`EmailState`](../../ghosttext-session/type-aliases/EmailState.md)\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/email\_editor.d.ts:9

#### Returns

`Promise`\<[`EmailState`](../../ghosttext-session/type-aliases/EmailState.md)\>

complete current state of the editor

#### Implementation of

[`IClientEditor`](../../ghosttext-runner/interfaces/IClientEditor.md).[`getState`](../../ghosttext-runner/interfaces/IClientEditor.md#getstate)

***

### popLastEdit()

> **popLastEdit**(): `undefined` \| [`InternalEdit`](../../ghosttext-session/type-aliases/InternalEdit.md)

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/email\_editor.d.ts:12

Get the most recent edit and drop the rest

#### Returns

`undefined` \| [`InternalEdit`](../../ghosttext-session/type-aliases/InternalEdit.md)

recent edit or `undefined` if no new edits have occurred

#### Implementation of

[`IClientEditor`](../../ghosttext-runner/interfaces/IClientEditor.md).[`popLastEdit`](../../ghosttext-runner/interfaces/IClientEditor.md#poplastedit)

***

### update()

> **update**(`status`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/email\_editor.d.ts:8

Shows status to user

#### Parameters

##### status

[`ClientStatus`](../../ghosttext-runner/type-aliases/ClientStatus.md)

status to display

#### Returns

`Promise`\<`void`\>

resolves when shown

#### Implementation of

[`IStatusIndicator`](../../ghosttext-runner/interfaces/IStatusIndicator.md).[`update`](../../ghosttext-runner/interfaces/IStatusIndicator.md#update)

***

### waitEdit()

> **waitEdit**(): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/email\_editor.d.ts:11

Waits for an edit to occur in the local compose window.

#### Returns

`Promise`\<`void`\>

resolves when the user makes an edit, or rejects if the editor is closed

#### Implementation of

[`IClientEditor`](../../ghosttext-runner/interfaces/IClientEditor.md).[`waitEdit`](../../ghosttext-runner/interfaces/IClientEditor.md#waitedit)
