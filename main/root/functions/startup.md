[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / startup

# Function: startup()

> **startup**\<`TCatalog`\>(`modules`, `registry`): \<`TCtor`\>(`ctor`, `deps?`) => [`Resolved`](../type-aliases/Resolved.md)\<`TCatalog`, `TCtor`\>

Defined in: [work/ghostbird/ghostbird/src/root/startup.ts:33](https://github.com/exteditor/ghostbird/blob/a08389d8cd1aeb7db7e822d763f0066efa11400a/src/root/startup.ts#L33)

Collects available classes from given module objects to make a factory.

## Type Parameters

### TCatalog

`TCatalog`

## Parameters

### modules

`Iterable`\<`Record`\<`string`, `unknown`\>\>

### registry

[`IRegistry`](../type-aliases/IRegistry.md)\<`TCatalog`\>

## Returns

> \<`TCtor`\>(`ctor`, `deps?`): [`Resolved`](../type-aliases/Resolved.md)\<`TCatalog`, `TCtor`\>

### Type Parameters

#### TCtor

`TCtor`

### Parameters

#### ctor

`TCtor`

#### deps?

`Iterable`\<`string` & keyof `TCatalog`, `any`, `any`\>

### Returns

[`Resolved`](../type-aliases/Resolved.md)\<`TCatalog`, `TCtor`\>
