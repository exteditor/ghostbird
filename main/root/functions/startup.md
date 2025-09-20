[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / startup

# Function: startup()

> **startup**\<`TCatalog`\>(`modules`, `registry`): [`Startup`](../type-aliases/Startup.md)\<`TCatalog`\>

Defined in: [work/ghostbird/ghostbird/src/root/startup.ts:38](https://github.com/exteditor/ghostbird/blob/d0b443ff33fee4a1f225c01e360a67c08b1db9ee/src/root/startup.ts#L38)

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

[`Startup`](../type-aliases/Startup.md)\<`TCatalog`\>
