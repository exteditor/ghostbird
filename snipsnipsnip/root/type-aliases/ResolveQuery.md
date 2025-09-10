[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / ResolveQuery

# Type Alias: ResolveQuery\<TCatalog, T\>

> **ResolveQuery**\<`TCatalog`, `T`\> = \[`"createOne"`, `Readonly`\<[`IClassInfo`](../interfaces/IClassInfo.md)\<`TCatalog`, `T`\>\>\] \| \[`"resolveOne"`, keyof `TCatalog` & `string`\] \| \[`"resolveAll"`, `Iterable`\<keyof `TCatalog` & `string`\>\] \| \[`"const"`, `T`\]

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:112](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L112)

An entry in the registry. It contains a query to the `IResolver` paired with a key.

## Type Parameters

### TCatalog

`TCatalog`

### T

`T`
