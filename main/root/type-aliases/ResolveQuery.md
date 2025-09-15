[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / ResolveQuery

# Type Alias: ResolveQuery\<TCatalog, T\>

> **ResolveQuery**\<`TCatalog`, `T`\> = \[`"createOne"`, `Readonly`\<[`IClassInfo`](../interfaces/IClassInfo.md)\<`TCatalog`, `T`\>\>\] \| \[`"resolveOne"`, keyof `TCatalog` & `string`\] \| \[`"resolveAll"`, `Iterable`\<keyof `TCatalog` & `string`\>\] \| \[`"const"`, `T`\]

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:112](https://github.com/exteditor/ghostbird/blob/ac51a24b1e01c857bb0608c7bc14825c2f36fc86/src/root/util/wire.ts#L112)

An entry in the registry. It contains a query to the `IResolver` paired with a key.

## Type Parameters

### TCatalog

`TCatalog`

### T

`T`
