[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / ComposeTabDetector

# Class: ComposeTabDetector

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab\_detector.d.ts:3

Casts an ITab to a usable utility

## Implements

- [`IComposeWindowDetector`](../../app-background/interfaces/IComposeWindowDetector.md)

## Constructors

### Constructor

> **new ComposeTabDetector**(`messenger`): `ComposeTabDetector`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab\_detector.d.ts:6

#### Parameters

##### messenger

*typeof* `messenger`

#### Returns

`ComposeTabDetector`

## Properties

### messenger

> `readonly` **messenger**: *typeof* `messenger`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab\_detector.d.ts:4

***

### isSingleton

> `static` **isSingleton**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab\_detector.d.ts:5

## Methods

### tryWrap()

> **tryWrap**(`tab`): `undefined` \| [`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md)

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/compose\_tab\_detector.d.ts:7

Attempts to wrap a generic tab object into a more specific `IComposeWindow` object.
Checks if the tab corresponds to a mail compose window before wrapping.

#### Parameters

##### tab

[`ITab`](../../app-background/interfaces/ITab.md)

The tab to check

#### Returns

`undefined` \| [`IComposeWindow`](../../ghosttext-adaptor/interfaces/IComposeWindow.md)

a wrapped instance if the tab is a compose window, otherwise `undefined`

#### Implementation of

[`IComposeWindowDetector`](../../app-background/interfaces/IComposeWindowDetector.md).[`tryWrap`](../../app-background/interfaces/IComposeWindowDetector.md#trywrap)
