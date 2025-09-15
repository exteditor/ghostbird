[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / IWire

# Interface: IWire\<TCatalog\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:54](https://github.com/exteditor/ghostbird/blob/ac51a24b1e01c857bb0608c7bc14825c2f36fc86/src/root/util/wire.ts#L54)

A DI container that appears to be type-safe after construction

## Type Parameters

### TCatalog

`TCatalog`

## Methods

### wire()

> **wire**\<`TCtor`\>(`ctor`, `deps`): [`Resolved`](../type-aliases/Resolved.md)\<`TCatalog`, `TCtor`\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:58](https://github.com/exteditor/ghostbird/blob/ac51a24b1e01c857bb0608c7bc14825c2f36fc86/src/root/util/wire.ts#L58)

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
