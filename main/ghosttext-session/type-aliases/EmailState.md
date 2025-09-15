[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-session](../README.md) / EmailState

# Type Alias: EmailState

> **EmailState** = `object`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:50

State of compose window relevant to GhostText

## Properties

### body

> **body**: `string`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:58

Email body which is either in HTML or plain text

***

### isPlainText

> **isPlainText**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:56

Email format

***

### selections

> **selections**: `ReadonlyArray`\<[`SelectionObject`](SelectionObject.md)\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:60

An array of selection objects that describe the user's current cursor selections in the editor. TODO: Always empty until v2.0.0

***

### subject

> **subject**: `string`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:52

Subject of the email

***

### url

> **url**: `string`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:54

Extension ID
