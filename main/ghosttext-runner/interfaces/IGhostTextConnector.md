[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-runner](../README.md) / IGhostTextConnector

# Interface: IGhostTextConnector

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:11

Does GhostText handshake

## Methods

### connect()

> **connect**(`serverUrl`): `Promise`\<\[[`ISession`](ISession.md), [`ServerInitialResponse`](../../ghosttext-session/type-aliases/ServerInitialResponse.md)\]\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-runner/api.d.ts:17

Starts a connection.

#### Parameters

##### serverUrl

`URL`

The URL of GhostText server to initial GET

#### Returns

`Promise`\<\[[`ISession`](ISession.md), [`ServerInitialResponse`](../../ghosttext-session/type-aliases/ServerInitialResponse.md)\]\>

the connection and the initial response
