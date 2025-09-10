[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-runner](../README.md) / IMessenger

# Interface: IMessenger\<TCatalog\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/message.d.ts:12

A messaging channel that returns responses.

## Type Parameters

### TCatalog

`TCatalog`

The record type that maps types of sending messages to respective expected responses

## Methods

### send()

> **send**\<`TType`\>(`msg`): `Promise`\<`TCatalog`\[`TType`\]\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/message.d.ts:17

Sends a message to the other end.

#### Type Parameters

##### TType

`TType` *extends* `string`

#### Parameters

##### msg

`TType`

#### Returns

`Promise`\<`TCatalog`\[`TType`\]\>

A promise that resolves to a response, or rejects if the message couldn't be sent.
