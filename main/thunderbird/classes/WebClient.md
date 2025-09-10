[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / WebClient

# Class: WebClient

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/web\_client.d.ts:3

Wrapper for `fetch` and `WebSocket`

## Implements

- [`IWebClient`](../../ghosttext-adaptor/interfaces/IWebClient.md)

## Constructors

### Constructor

> **new WebClient**(): `WebClient`

#### Returns

`WebClient`

## Properties

### isSingleton

> `static` **isSingleton**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/web\_client.d.ts:4

## Methods

### getJson()

> **getJson**(`serverUrl`): `Promise`\<`object`\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/web\_client.d.ts:6

Does fetch and parse json

#### Parameters

##### serverUrl

`URL`

The base URL of the GhostText server

#### Returns

`Promise`\<`object`\>

resolves to the JSON response

#### Implementation of

[`IWebClient`](../../ghosttext-adaptor/interfaces/IWebClient.md).[`getJson`](../../ghosttext-adaptor/interfaces/IWebClient.md#getjson)

***

### openWebSocket()

> **openWebSocket**(`wsUrl`): `PromiseLike`\<[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md)\<`string`, `string`\>\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/web\_client.d.ts:5

Open WebSocket connection

#### Parameters

##### wsUrl

`URL`

The WebSocket URL

#### Returns

`PromiseLike`\<[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md)\<`string`, `string`\>\>

resolves to a wrapper of WebSocket

#### Implementation of

[`IWebClient`](../../ghosttext-adaptor/interfaces/IWebClient.md).[`openWebSocket`](../../ghosttext-adaptor/interfaces/IWebClient.md#openwebsocket)
