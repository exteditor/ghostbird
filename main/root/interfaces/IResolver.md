[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / IResolver

# Interface: IResolver\<TCatalog\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:99](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L99)

Queries to the DI container

## Type Parameters

### TCatalog

`TCatalog`

## Methods

### prepareOne()

> **prepareOne**\<`T`\>(`info`): `T`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:111](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L111)

Instantiate the class from the info, or get the cached instance if one is available

#### Type Parameters

##### T

`T`

#### Parameters

##### info

`Readonly`\<[`IClassInfo`](IClassInfo.md)\<`TCatalog`, `T`\>\>

#### Returns

`T`

***

### resolveAll()

> **resolveAll**\<`Name`\>(`v`): `TCatalog`\[`Name`\][]

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:107](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L107)

Prepare instances of registered classes

#### Type Parameters

##### Name

`Name` *extends* `string`

#### Parameters

##### v

`Iterable`\<`Name`\>

#### Returns

`TCatalog`\[`Name`\][]

***

### resolveOne()

> **resolveOne**\<`Name`\>(`name`): `TCatalog`\[`Name`\]

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:103](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L103)

Instantiate the class by the name, or get the cached instance if one is available

#### Type Parameters

##### Name

`Name` *extends* `string`

#### Parameters

##### name

`Name`

#### Returns

`TCatalog`\[`Name`\]
