[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / ResolvableArgs

# Type Alias: ResolvableArgs\<TCatalog, T, TArgs\>

> **ResolvableArgs**\<`TCatalog`, `T`, `TArgs`\> = `TArgs` *extends* \[infer TArg, `...(infer TRest)`\] ? `TArg` *extends* `TCatalog`\[keyof `TCatalog`\] ? `ResolvableArgs`\<`TCatalog`, `T`, `TRest`\> : \[`"An argument is not listed in TCatalog"`, `never`, `TArg`\] : `TArgs` *extends* \[\] ? `T` : \[`"Failed to unpack arguments. Is it a constructor?"`, `never`, `TArgs`\]

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:81](https://github.com/exteditor/ghostbird/blob/ac51a24b1e01c857bb0608c7bc14825c2f36fc86/src/root/util/wire.ts#L81)

Resolves to `T` if all of the `TArgs` are listed in `TCatalog`. Resolves to an error otherwise.

## Type Parameters

### TCatalog

`TCatalog`

### T

`T`

### TArgs

`TArgs`
