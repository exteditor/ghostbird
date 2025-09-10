[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-session](../README.md) / ServerInitialResponse

# Interface: ServerInitialResponse

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:9

Response from a GhostText server on initial GET.

## Properties

### ProtocolVersion

> **ProtocolVersion**: `number`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:11

The protocol version. currently one

***

### WebSocketPort

> **WebSocketPort**: `number`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:13

The port for the listening WebSocket. This ideally is the same configured HTTP port (default 4001) but it doesn't have to be.
