[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-session](../README.md) / EditorChangeResponse

# Interface: EditorChangeResponse

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:43

Message received from the server to the client when the user makes a change in the editor.
At least one property has to be sent.

## Properties

### selections?

> `optional` **selections**: readonly [`SelectionObject`](SelectionObject.md)[]

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:47

An array of selection objects that describe the user's current cursor selections in the editor

***

### text?

> `optional` **text**: `string`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:45

The temporary file content
