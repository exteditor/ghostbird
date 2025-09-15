[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [app-compose](../README.md) / ComposeEventRouter

# Class: ComposeEventRouter

Defined in: work/ghostbird/ghostbird/build/src/app-compose/compose\_event\_router.d.ts:3

## Constructors

### Constructor

> **new ComposeEventRouter**(`body`, `backgroundMessenger`): `ComposeEventRouter`

Defined in: work/ghostbird/ghostbird/build/src/app-compose/compose\_event\_router.d.ts:7

#### Parameters

##### body

`HTMLBodyElement`

##### backgroundMessenger

[`IBackgroundMessenger`](../type-aliases/IBackgroundMessenger.md)

#### Returns

`ComposeEventRouter`

## Properties

### backgroundMessenger

> `readonly` **backgroundMessenger**: [`IBackgroundMessenger`](../type-aliases/IBackgroundMessenger.md)

Defined in: work/ghostbird/ghostbird/build/src/app-compose/compose\_event\_router.d.ts:5

***

### body

> `readonly` **body**: `HTMLBodyElement`

Defined in: work/ghostbird/ghostbird/build/src/app-compose/compose\_event\_router.d.ts:4

***

### isSingleton

> `static` **isSingleton**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/app-compose/compose\_event\_router.d.ts:6

## Methods

### handleConnect()

> **handleConnect**(`port`): `Promise`\<`void`\>

Defined in: work/ghostbird/ghostbird/build/src/app-compose/compose\_event\_router.d.ts:8

#### Parameters

##### port

[`IGhostClientPort`](../../ghosttext-adaptor/type-aliases/IGhostClientPort.md)

#### Returns

`Promise`\<`void`\>

***

### handleMessage()

> **handleMessage**(`message`): `"ok"` \| `"pong"`

Defined in: work/ghostbird/ghostbird/build/src/app-compose/compose\_event\_router.d.ts:9

#### Parameters

##### message

`string`

#### Returns

`"ok"` \| `"pong"`
