[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-session](../README.md) / UpdateRequest

# Type Alias: UpdateRequest

> **UpdateRequest** = `object`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:27

Message sent from the client to the server when the user makes a change in the browser.

## Properties

### selections

> **selections**: `ReadonlyArray`\<[`SelectionObject`](SelectionObject.md)\>

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:37

An array of selection objects that describe the user's current cursor selections in the editor

***

### syntax

> **syntax**: `""`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:33

Not used. Is empty string in current implementations

***

### text

> **text**: `string`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:35

The value of the textarea/content

***

### title

> **title**: `string`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:29

The title of the document

***

### url

> **url**: `string`

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/types.d.ts:31

The host of the document's URL
