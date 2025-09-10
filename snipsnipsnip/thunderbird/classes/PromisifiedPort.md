[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / PromisifiedPort

# Class: PromisifiedPort\<TRequest, TResponse\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_port.d.ts:10

A port wrapped in a Promise-based API.
NB: Type parameters are just a contract and message content aren't checked.

## See

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/Port

## Type Parameters

### TRequest

`TRequest` *extends* `object`

The type of messages which this port can send

### TResponse

`TResponse` *extends* `object` \| `string`

The type of messages which this port expects to receive

## Implements

- [`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md)\<`TRequest`, `TResponse`\>

## Methods

### clearReceived()

> **clearReceived**(): `undefined` \| `TResponse`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_port.d.ts:19

Clears the buffer and returns the latest message.

#### Returns

`undefined` \| `TResponse`

the latest message, or `undefined` if not available

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`clearReceived`](../../ghosttext-runner/interfaces/IMessagePort.md#clearreceived)

***

### close()

> **close**(): `void`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_port.d.ts:21

Closes the port.

#### Returns

`void`

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`close`](../../ghosttext-runner/interfaces/IMessagePort.md#close)

***

### dequeueReceived()

> **dequeueReceived**(): `undefined` \| `TResponse`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_port.d.ts:18

dequeues the earliest message.

#### Returns

`undefined` \| `TResponse`

the dequeued message, or `undefined` if not available

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`dequeueReceived`](../../ghosttext-runner/interfaces/IMessagePort.md#dequeuereceived)

***

### isOpen()

> **isOpen**(): `boolean`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_port.d.ts:15

#### Returns

`boolean`

true if the port is still open, false if already closed

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`isOpen`](../../ghosttext-runner/interfaces/IMessagePort.md#isopen)

***

### send()

> **send**(`msg`): `void`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_port.d.ts:20

Queues a message to be sent.

#### Parameters

##### msg

`TRequest`

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

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_port.d.ts:17

Wait for the next incoming message.

#### Returns

`Promise`\<`void`\>

A promise that resolves when a message is available, or rejects if disconnected

#### Implementation of

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md).[`waitReady`](../../ghosttext-runner/interfaces/IMessagePort.md#waitready)

***

### listenTo()

> `static` **listenTo**\<`TRequest`, `TResponse`\>(`port`): [`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md)\<`TRequest`, `TResponse`\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisified\_port.d.ts:13

#### Type Parameters

##### TRequest

`TRequest` *extends* `object`

##### TResponse

`TResponse` *extends* `object`

#### Parameters

##### port

`Port`

#### Returns

[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md)\<`TRequest`, `TResponse`\>
