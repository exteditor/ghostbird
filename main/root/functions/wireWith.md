[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / wireWith

# Function: wireWith()

> **wireWith**\<`TCatalog`\>(`classes`, `registry`, `aliasCollector`, `nameForDuplicatesOf`): [`IWire`](../interfaces/IWire.md)\<`TCatalog`\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:284](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L284)

Creates a factory from the collected class constructors and their parameters

## Type Parameters

### TCatalog

`TCatalog`

## Parameters

### classes

`Iterable`\<`Readonly`\<[`IClassInfo`](../interfaces/IClassInfo.md)\<`TCatalog`, `unknown`, `unknown`[]\>\>\>

Class constructors with some metadata to instruct its construction

### registry

[`IRegistry`](../type-aliases/IRegistry.md)\<`TCatalog`\>

A map used for caching registrations

### aliasCollector

[`IAliasMap`](../interfaces/IAliasMap.md)\<`TCatalog`\>

A map that collects (possibly duplicated) aliases and populate them as dependencies

### nameForDuplicatesOf

(`alias`) => `string`

A function to generate names for duplicate aliases

## Returns

[`IWire`](../interfaces/IWire.md)\<`TCatalog`\>

A DI container
