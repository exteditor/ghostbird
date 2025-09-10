[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-runner](../README.md) / IClientEditor

# Interface: IClientEditor

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:48

Client-side editor (the Thunderbird compose window) that is being synchronized with the external text editor

## Methods

### applyChange()

> **applyChange**(`change`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:56

Applies changes received from the GhostText server to the compose window

#### Parameters

##### change

[`EditorChangeResponse`](../../ghosttext-session/interfaces/EditorChangeResponse.md)

The change from the server

#### Returns

`Promise`\<`void`\>

resolves when updated, or rejects if the editor has been closed

***

### getState()

> **getState**(): `Promise`\<[`IEditorState`](../../ghosttext-session/interfaces/IEditorState.md)\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:50

#### Returns

`Promise`\<[`IEditorState`](../../ghosttext-session/interfaces/IEditorState.md)\>

complete current state of the editor

***

### popLastEdit()

> **popLastEdit**(): `undefined` \| `Partial`\<[`IEditorState`](../../ghosttext-session/interfaces/IEditorState.md)\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:66

Get the most recent edit and drop the rest

#### Returns

`undefined` \| `Partial`\<[`IEditorState`](../../ghosttext-session/interfaces/IEditorState.md)\>

recent edit or `undefined` if no new edits have occurred

***

### waitEdit()

> **waitEdit**(): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:61

Waits for an edit to occur in the local compose window.

#### Returns

`Promise`\<`void`\>

resolves when the user makes an edit, or rejects if the editor is closed
