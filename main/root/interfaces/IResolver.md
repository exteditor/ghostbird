[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / IResolver

# Interface: IResolver\<TCatalog\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:89](https://github.com/exteditor/ghostbird/blob/d0b443ff33fee4a1f225c01e360a67c08b1db9ee/src/root/util/wire.ts#L89)

## Type Parameters

### TCatalog

`TCatalog`

## Methods

### createOne()

> **createOne**\<`T`\>(`info`): `T`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:97](https://github.com/exteditor/ghostbird/blob/d0b443ff33fee4a1f225c01e360a67c08b1db9ee/src/root/util/wire.ts#L97)

Instantiate the class, or get the cached instance if one is available.

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

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:101](https://github.com/exteditor/ghostbird/blob/d0b443ff33fee4a1f225c01e360a67c08b1db9ee/src/root/util/wire.ts#L101)

Prepare instances of registered classes.

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

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:93](https://github.com/exteditor/ghostbird/blob/d0b443ff33fee4a1f225c01e360a67c08b1db9ee/src/root/util/wire.ts#L93)

Creates or retrieves an instance of the named class.

#### Type Parameters

##### Name

`Name` *extends* `string`

#### Parameters

##### name

`Name`

#### Returns

`TCatalog`\[`Name`\]
