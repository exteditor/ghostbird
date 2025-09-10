[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / PromisifiedWebSocket

# Class: PromisifiedWebSocket

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_web\_socket.d.ts:2

A full-duplex buffered message channel.

## Implements

- [`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md)\<`string`, `string`\>

## Methods

### clearReceived()

> **clearReceived**(): `undefined` \| `string`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_web\_socket.d.ts:15

Clears the buffer and returns the latest message.

#### Returns

`undefined` \| `string`

the latest message, or `undefined` if not available

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`clearReceived`](../../ghosttext-runner/interfaces/IMessagePort.md#clearreceived)

***

### close()

> **close**(): `void`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_web\_socket.d.ts:17

Closes the port.

#### Returns

`void`

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`close`](../../ghosttext-runner/interfaces/IMessagePort.md#close)

***

### dequeueReceived()

> **dequeueReceived**(): `undefined` \| `string`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_web\_socket.d.ts:14

dequeues the earliest message.

#### Returns

`undefined` \| `string`

the dequeued message, or `undefined` if not available

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`dequeueReceived`](../../ghosttext-runner/interfaces/IMessagePort.md#dequeuereceived)

***

### isOpen()

> **isOpen**(): `boolean`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_web\_socket.d.ts:12

#### Returns

`boolean`

true if the port is still open, false if already closed

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`isOpen`](../../ghosttext-runner/interfaces/IMessagePort.md#isopen)

***

### send()

> **send**(`msg`): `void`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_web\_socket.d.ts:16

Queues a message to be sent.

#### Parameters

##### msg

`string`

Object to be sent

#### Returns

`void`

#### Throws

Already disconnected

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`send`](../../ghosttext-runner/interfaces/IMessagePort.md#send)

***

### waitReady()

> **waitReady**(): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_web\_socket.d.ts:13

Wait for the next incoming message.

#### Returns

`Promise`\<`void`\>

A promise that resolves when a message is available, or rejects if disconnected

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`waitReady`](../../ghosttext-runner/interfaces/IMessagePort.md#waitready)

***

### listenTo()

> `static` **listenTo**(`socket`): `Promise`\<`PromisifiedWebSocket`\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_web\_socket.d.ts:9

Start listening to the WebSocket.

#### Parameters

##### socket

`WebSocket`

#### Returns

`Promise`\<`PromisifiedWebSocket`\>

A promise that resolves to the wrapper on open.
