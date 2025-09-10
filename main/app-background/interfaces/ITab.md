[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [app-background](../README.md) / ITab

# Interface: ITab

Defined in: work/ghostbird/ghostbird/build/src/app-background/api.d.ts:20

A Thunderbird window where the toolbar button is pressed

## Properties

### id?

> `readonly` `optional` **id**: `number`

Defined in: work/ghostbird/ghostbird/build/src/app-background/api.d.ts:22

The unique identifier for the tab. Missing on special windows like developer tools

***

### type?

> `readonly` `optional` **type**: `string`

Defined in: work/ghostbird/ghostbird/build/src/app-background/api.d.ts:24

The type of the tab like "mail", "content", or "messageCompose"
