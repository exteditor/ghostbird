[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / IWire

# Interface: IWire\<TCatalog\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:59](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L59)

A DI container that lets you pretend to be type-safe after construction

## Type Parameters

### TCatalog

`TCatalog`

## Methods

### wire()

> **wire**\<`TCtor`\>(`ctor`, `deps`): [`Resolved`](../type-aliases/Resolved.md)\<`TCatalog`, `TCtor`\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:65](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L65)

Instantiate the given class using the dependencies available

#### Type Parameters

##### TCtor

`TCtor`

#### Parameters

##### ctor

`TCtor`

the constructor to instantiate

##### deps

`Iterable`\<`string` & keyof `TCatalog`\>

names of dependencies to pass to the constructor as arguments

#### Returns

[`Resolved`](../type-aliases/Resolved.md)\<`TCatalog`, `TCtor`\>
