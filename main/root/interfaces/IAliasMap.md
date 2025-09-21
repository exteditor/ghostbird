[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / IAliasMap

# Interface: IAliasMap\<TCatalog\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:131](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L131)

Collects and handles duplicate aliases

## Type Parameters

### TCatalog

`TCatalog`

## Methods

### collectAliases()

> **collectAliases**(`info`): `void`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:135](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L135)

Classes may have duplicate aliases, so we collect them first to register later

#### Parameters

##### info

[`IClassInfo`](IClassInfo.md)\<`TCatalog`\>

#### Returns

`void`

***

### makeAliasEntries()

> **makeAliasEntries**(): `Generator`\<\[`string`, [`ResolveQuery`](../type-aliases/ResolveQuery.md)\<`TCatalog`, `unknown`\>\]\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:140](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L140)

Generates registry entries from collected aliases

#### Returns

`Generator`\<\[`string`, [`ResolveQuery`](../type-aliases/ResolveQuery.md)\<`TCatalog`, `unknown`\>\]\>
