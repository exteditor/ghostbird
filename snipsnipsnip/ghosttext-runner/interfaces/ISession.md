[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-runner](../README.md) / ISession

# Interface: ISession

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:25

Active WebSocket connection to the GhostText server

## Methods

### close()

> **close**(): `void`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:43

Closes the WebSocket

#### Returns

`void`

***

### popServerChange()

> **popServerChange**(): `undefined` \| [`EditorChangeResponse`](../../ghosttext-session/interfaces/EditorChangeResponse.md)

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:35

Get the most recent change and drop the rest

#### Returns

`undefined` \| [`EditorChangeResponse`](../../ghosttext-session/interfaces/EditorChangeResponse.md)

The latest change object, or `undefined` if no new changes are available

***

### sendUpdate()

> **sendUpdate**(`update`): `void`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:41

Send local change to the server

#### Parameters

##### update

[`UpdateRequest`](../../ghosttext-session/interfaces/UpdateRequest.md)

The update request object to send.

#### Returns

`void`

#### Throws

if the session is already closed

***

### waitServerChange()

> **waitServerChange**(): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:30

Waits for a change from the server-side editor

#### Returns

`Promise`\<`void`\>

resolves when a change is received, or rejects if the connection is closed
