[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-adaptor](../README.md) / IWebClient

# Interface: IWebClient

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/api.d.ts:3

Wrapper for `fetch` and `WebSocket`

## Methods

### getJson()

> **getJson**(`serverUrl`): `PromiseLike`\<`object`\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/api.d.ts:9

Does fetch and parse json

#### Parameters

##### serverUrl

`URL`

The base URL of the GhostText server

#### Returns

`PromiseLike`\<`object`\>

resolves to the JSON response

***

### openWebSocket()

> **openWebSocket**(`wsUrl`): `PromiseLike`\<[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md)\<`string`, `string`\>\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/api.d.ts:15

Open WebSocket connection

#### Parameters

##### wsUrl

`URL`

The WebSocket URL

#### Returns

`PromiseLike`\<[`IMessagePort`](../../ghosttext-runner/interfaces/IMessagePort.md)\<`string`, `string`\>\>

resolves to a wrapper of WebSocket
