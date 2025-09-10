[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / PromisifyingQueue

# Class: PromisifyingQueue\<TResponse\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisifying\_queue.d.ts:5

A utility class to help implementation of IMessagePorts.

## Template

The type of messages queued

## Type Parameters

### TResponse

`TResponse`

## Constructors

### Constructor

> **new PromisifyingQueue**\<`TResponse`\>(): `PromisifyingQueue`\<`TResponse`\>

#### Returns

`PromisifyingQueue`\<`TResponse`\>

## Methods

### clearReceived()

> **clearReceived**(): `undefined` \| `TResponse`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisifying\_queue.d.ts:14

#### Returns

`undefined` \| `TResponse`

***

### dequeueReceived()

> **dequeueReceived**(): `undefined` \| `TResponse`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisifying\_queue.d.ts:13

#### Returns

`undefined` \| `TResponse`

***

### isOpen()

> **isOpen**(): `boolean`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisifying\_queue.d.ts:9

#### Returns

`boolean`

***

### notifyClosed()

> **notifyClosed**(`err`): `void`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisifying\_queue.d.ts:11

#### Parameters

##### err

`Error`

#### Returns

`void`

***

### pushReceived()

> **pushReceived**(`msg`): `void`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisifying\_queue.d.ts:10

#### Parameters

##### msg

`TResponse`

#### Returns

`void`

***

### waitReady()

> **waitReady**(): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/util/promisifying\_queue.d.ts:12

#### Returns

`Promise`\<`void`\>
