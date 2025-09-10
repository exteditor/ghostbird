[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / AlarmHeart

# Class: AlarmHeart

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/alarm\_heart.d.ts:2

Tries to prevent background script from suspending

## Implements

- [`IHeart`](../../ghosttext-runner/interfaces/IHeart.md)

## Constructors

### Constructor

> **new AlarmHeart**(`messenger`): `AlarmHeart`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/alarm\_heart.d.ts:8

#### Parameters

##### messenger

*typeof* `messenger`

#### Returns

`AlarmHeart`

## Properties

### messenger

> `readonly` **messenger**: *typeof* `messenger`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/alarm\_heart.d.ts:3

***

### aliases

> `static` **aliases**: `string`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/alarm\_heart.d.ts:5

***

### isSingleton

> `static` **isSingleton**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/alarm\_heart.d.ts:4

## Methods

### assumeReady()

> **assumeReady**(): `void`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/alarm\_heart.d.ts:9

#### Returns

`void`

***

### startBeat()

> **startBeat**(): () => `void`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/alarm\_heart.d.ts:10

Starts the keep-alive

#### Returns

closure to stop the keep-alive

> (): `void`

##### Returns

`void`

#### Implementation of

[`IHeart`](../../ghosttext-runner/interfaces/IHeart.md).[`startBeat`](../../ghosttext-runner/interfaces/IHeart.md#startbeat)
