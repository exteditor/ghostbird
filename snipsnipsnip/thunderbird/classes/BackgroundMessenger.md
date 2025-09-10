[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / BackgroundMessenger

# Class: BackgroundMessenger

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/compose\_util/background\_messenger.d.ts:2

## Implements

- [`IBackgroundMessenger`](../../app-compose/type-aliases/IBackgroundMessenger.md)

## Constructors

### Constructor

> **new BackgroundMessenger**(`messenger`): `BackgroundMessenger`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/compose\_util/background\_messenger.d.ts:5

#### Parameters

##### messenger

*typeof* `messenger`

#### Returns

`BackgroundMessenger`

## Properties

### messenger

> `readonly` **messenger**: *typeof* `messenger`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/compose\_util/background\_messenger.d.ts:3

***

### isSingleton

> `static` **isSingleton**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/compose\_util/background\_messenger.d.ts:4

## Methods

### send()

> **send**\<`TType`\>(`msg`): `Promise`\<`object`\[`TType`\]\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/compose\_util/background\_messenger.d.ts:6

Sends a message to the other end.

#### Type Parameters

##### TType

`TType` *extends* `"ping"`

#### Parameters

##### msg

`TType`

#### Returns

`Promise`\<`object`\[`TType`\]\>

A promise that resolves to a response, or rejects if the message couldn't be sent.

#### Implementation of

`IBackgroundMessenger.send`
