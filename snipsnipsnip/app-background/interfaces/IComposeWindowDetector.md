[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [app-background](../README.md) / IComposeWindowDetector

# Interface: IComposeWindowDetector

Defined in: work/ghostbird/ghostbird/build/src/app-background/api.d.ts:27

Casts an ITab to a usable utility

## Methods

### tryWrap()

> **tryWrap**(`tab`): `undefined` \| [`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md)

Defined in: work/ghostbird/ghostbird/build/src/app-background/api.d.ts:35

Attempts to wrap a generic tab object into a more specific `IComposeWindow` object.
Checks if the tab corresponds to a mail compose window before wrapping.

#### Parameters

##### tab

[`ITab`](ITab.md)

The tab to check

#### Returns

`undefined` \| [`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md)

a wrapped instance if the tab is a compose window, otherwise `undefined`
