[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / backgroundWire

# Function: backgroundWire()

> **backgroundWire**\<`TRoot`\>(): \<`TCtor`\>(`ctor`, `deps?`) => [`Resolved`](../type-aliases/Resolved.md)\<`TRoot` & `object`, `TCtor`\>

Defined in: [work/ghostbird/ghostbird/src/root/background\_wire.ts:24](https://github.com/exteditor/ghostbird/blob/1b5d1af7a5d928cd4724811ce3a123d2a427611d/src/root/background_wire.ts#L24)

## Type Parameters

### TRoot

`TRoot`

## Returns

> \<`TCtor`\>(`ctor`, `deps?`): [`Resolved`](../type-aliases/Resolved.md)\<`TRoot` & `object`, `TCtor`\>

### Type Parameters

#### TCtor

`TCtor`

### Parameters

#### ctor

`TCtor`

#### deps?

`Iterable`\<`"messenger"` \| `string` & keyof `TRoot`, `any`, `any`\>

### Returns

[`Resolved`](../type-aliases/Resolved.md)\<`TRoot` & `object`, `TCtor`\>
