[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-adaptor](../README.md) / GhostTextConnector

# Class: GhostTextConnector

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/ghost\_text\_connector.d.ts:4

Does GhostText handshake

## Implements

- [`IGhostTextConnector`](../../ghosttext-runner/interfaces/IGhostTextConnector.md)

## Constructors

### Constructor

> **new GhostTextConnector**(`webClient`): `GhostTextConnector`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/ghost\_text\_connector.d.ts:7

#### Parameters

##### webClient

[`IWebClient`](../interfaces/IWebClient.md)

#### Returns

`GhostTextConnector`

## Properties

### webClient

> `readonly` **webClient**: [`IWebClient`](../interfaces/IWebClient.md)

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/ghost\_text\_connector.d.ts:5

***

### isSingleton

> `static` **isSingleton**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/ghost\_text\_connector.d.ts:6

## Methods

### connect()

> **connect**(`serverUrl`): `Promise`\<\[[`ISession`](../../ghosttext-runner/interfaces/ISession.md), [`ServerInitialResponse`](../../ghosttext-session/interfaces/ServerInitialResponse.md)\]\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-adaptor/ghost\_text\_connector.d.ts:8

Starts a connection.

#### Parameters

##### serverUrl

`URL`

The URL of GhostText server to initial GET

#### Returns

`Promise`\<\[[`ISession`](../../ghosttext-runner/interfaces/ISession.md), [`ServerInitialResponse`](../../ghosttext-session/interfaces/ServerInitialResponse.md)\]\>

the connection and the initial response

#### Implementation of

[`IGhostTextConnector`](../../ghosttext-runner/interfaces/IGhostTextConnector.md).[`connect`](../../ghosttext-runner/interfaces/IGhostTextConnector.md#connect)
