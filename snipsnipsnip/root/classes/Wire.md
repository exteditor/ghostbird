[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / Wire

# Class: Wire\<TCatalog\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:172](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L172)

A factory to create instances of registered classes.

## Type Parameters

### TCatalog

`TCatalog`

## Implements

- [`IWire`](../interfaces/IWire.md)\<`TCatalog`\>
- [`IResolver`](../interfaces/IResolver.md)\<`TCatalog`\>

## Constructors

### Constructor

> **new Wire**\<`TCatalog`\>(`registry`, `nameForDuplicatesOf`): `Wire`\<`TCatalog`\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:175](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L175)

#### Parameters

##### registry

`Pick`\<[`IRegistry`](../type-aliases/IRegistry.md)\<`TCatalog`\>, `"get"`\>

##### nameForDuplicatesOf

(`alias`) => `string`

#### Returns

`Wire`\<`TCatalog`\>

## Properties

### cache

> `readonly` **cache**: `Map`\<keyof `TCatalog` & `string`, `unknown`\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:173](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L173)

## Methods

### createOne()

> **createOne**\<`T`\>(`info`): `T`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:208](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L208)

Instantiate the class, or get the cached instance if one is available.

#### Type Parameters

##### T

`T`

#### Parameters

##### info

`Readonly`\<[`IClassInfo`](../interfaces/IClassInfo.md)\<`TCatalog`, `T`\>\>

#### Returns

`T`

#### Implementation of

[`IResolver`](../interfaces/IResolver.md).[`createOne`](../interfaces/IResolver.md#createone)

***

### resolveAll()

> **resolveAll**\<`Name`\>(`deps`): `TCatalog`\[`Name`\][]

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:185](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L185)

Prepare instances of registered classes.

#### Type Parameters

##### Name

`Name` *extends* `string`

#### Parameters

##### deps

`Iterable`\<`Name`\>

#### Returns

`TCatalog`\[`Name`\][]

#### Implementation of

[`IResolver`](../interfaces/IResolver.md).[`resolveAll`](../interfaces/IResolver.md#resolveall)

***

### resolveOne()

> **resolveOne**\<`Name`\>(`name`): `TCatalog`\[`Name`\]

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:189](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L189)

Creates or retrieves an instance of the named class.

#### Type Parameters

##### Name

`Name` *extends* `string`

#### Parameters

##### name

`Name`

#### Returns

`TCatalog`\[`Name`\]

#### Implementation of

[`IResolver`](../interfaces/IResolver.md).[`resolveOne`](../interfaces/IResolver.md#resolveone)

***

### wire()

> **wire**\<`TCtor`\>(`ctor`, `deps`): [`Resolved`](../type-aliases/Resolved.md)\<`TCatalog`, `TCtor`\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:180](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L180)

Instantiate the given constructor with the dependencies that this container has

#### Type Parameters

##### TCtor

`TCtor`

#### Parameters

##### ctor

`TCtor`

##### deps

`Iterable`\<`string` & keyof `TCatalog`\>

#### Returns

[`Resolved`](../type-aliases/Resolved.md)\<`TCatalog`, `TCtor`\>

#### Implementation of

[`IWire`](../interfaces/IWire.md).[`wire`](../interfaces/IWire.md#wire)
