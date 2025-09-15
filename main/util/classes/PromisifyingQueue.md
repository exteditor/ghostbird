[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [util](../README.md) / PromisifyingQueue

# Class: PromisifyingQueue\<TMessage\>

Defined in: work/ghostbird/ghostbird/build/src/util/promisifying\_queue.d.ts:5

A utility class to help implementation of IMessagePorts.

## Type Parameters

### TMessage

`TMessage`

The type of messages queued

## Constructors

### Constructor

> **new PromisifyingQueue**\<`TMessage`\>(): `PromisifyingQueue`\<`TMessage`\>

#### Returns

`PromisifyingQueue`\<`TMessage`\>

## Methods

### clearReceived()

> **clearReceived**(): `undefined` \| `TMessage`

Defined in: work/ghostbird/ghostbird/build/src/util/promisifying\_queue.d.ts:47

Clears all messages from the queue and returns the last message that was queued.

#### Returns

`undefined` \| `TMessage`

The last message that was in the queue, or undefined if the queue was empty

#### Throws

The disconnect error if the connection is closed

***

### dequeueReceived()

> **dequeueReceived**(): `undefined` \| `TMessage`

Defined in: work/ghostbird/ghostbird/build/src/util/promisifying\_queue.d.ts:40

Removes and returns the first message from the queue.

#### Returns

`undefined` \| `TMessage`

The first message in the queue, or undefined if the queue is empty

#### Throws

The disconnect error if the connection is closed

***

### isOpen()

> **isOpen**(): `boolean`

Defined in: work/ghostbird/ghostbird/build/src/util/promisifying\_queue.d.ts:14

Checks if the queue connection is still open.

#### Returns

`boolean`

true if the connection is open, false if closed

***

### notifyClosed()

> **notifyClosed**(`err`): `void`

Defined in: work/ghostbird/ghostbird/build/src/util/promisifying\_queue.d.ts:26

Close the queue. Rejects all pending and subsequent consumers.

#### Parameters

##### err

`Error`

Reason to close used to reject awaiting consumers

#### Returns

`void`

***

### pushReceived()

> **pushReceived**(`msg`): `void`

Defined in: work/ghostbird/ghostbird/build/src/util/promisifying\_queue.d.ts:20

Adds a received message to the queue. Resolves all pending consumers.

#### Parameters

##### msg

`TMessage`

The message to add to the queue

#### Returns

`void`

***

### waitReady()

> **waitReady**(): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/util/promisifying\_queue.d.ts:33

Wait for a new message to be dequeued.

#### Returns

`Promise`\<`void`\>

resolves when messages are ready to be dequeued

#### Throws

The disconnect error if the connection is closed
