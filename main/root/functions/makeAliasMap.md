[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / makeAliasMap

# Function: makeAliasMap()

> **makeAliasMap**\<`TCatalog`\>(`nameForDuplicatesOf`): [`IAliasMap`](../interfaces/IAliasMap.md)\<`TCatalog`\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:272](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L272)

Creates a map that collects (possibly duplicated) aliases and populate them as dependencies

## Type Parameters

### TCatalog

`TCatalog`

## Parameters

### nameForDuplicatesOf

(`alias`) => `string`

A function to generate names for duplicate aliases

## Returns

[`IAliasMap`](../interfaces/IAliasMap.md)\<`TCatalog`\>

AliasMap that can be passed as an argument to `wireWith`
