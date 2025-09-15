[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-runner](../README.md) / IMessagePort

# Interface: IMessagePort\<TRequest, TResponse\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/message.d.ts:22

A full-duplex buffered message channel.

## Type Parameters

### TRequest

`TRequest` *extends* `object` \| `string`

The type of messages which this port can send

### TResponse

`TResponse` *extends* `object` \| `string`

The type of messages which this port can receive

## Methods

### clearReceived()

> **clearReceived**(): `undefined` \| `TResponse`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/message.d.ts:41

Clears the buffer and returns the latest message.

#### Returns

`undefined` \| `TResponse`

the latest message, or `undefined` if not available

***

### close()

> **close**(): `void`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/message.d.ts:51

Closes the port.

#### Returns

`void`

***

### dequeueReceived()

> **dequeueReceived**(): `undefined` \| `TResponse`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/message.d.ts:36

dequeues the earliest message.

#### Returns

`undefined` \| `TResponse`

the dequeued message, or `undefined` if not available

***

### isOpen()

> **isOpen**(): `boolean`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/message.d.ts:26

#### Returns

`boolean`

true if the port is still open, false if already closed

***

### send()

> **send**(`msg`): `void`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/message.d.ts:47

Queues a message to be sent.

#### Parameters

##### msg

`TRequest`

Object to be sent

#### Returns

`void`

#### Throws

Already disconnected

***

### waitReady()

> **waitReady**(): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/message.d.ts:31

Wait for the next incoming message.

#### Returns

`Promise`\<`void`\>

A promise that resolves when a message is available, or rejects if disconnected
