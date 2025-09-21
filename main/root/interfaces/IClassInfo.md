[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / IClassInfo

# Interface: IClassInfo\<TCatalog, T, TArgs\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:23](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L23)

A class constructor with some metadata to be registered to the container.

## Type Parameters

### TCatalog

`TCatalog`

### T

`T` = `unknown`

### TArgs

`TArgs` *extends* `unknown`[] = `unknown`[]

## Properties

### aliases?

> `optional` **aliases**: keyof `TCatalog` & `string` \| keyof `TCatalog` & `string`[]

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:53](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L53)

Optional alternative names to register the class as.

***

### ctor()

> **ctor**: (...`args`) => `T`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:43](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L43)

The constructor of the class.

#### Parameters

##### args

...`TArgs`

#### Returns

`T`

***

### deps

> **deps**: `string` & keyof `TCatalog`[]

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:49](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L49)

Names of dependencies that the constructor requires.

***

### isSingleton

> **isSingleton**: `boolean`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:29](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L29)

Specifies the lifetime of the class.
If `true`, only one instance is created and shared.
If `false`, a new instance is created each time it is needed.

***

### name

> **name**: keyof `TCatalog` & `string`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:39](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L39)

The name of the class as a dependency.

***

### wantArray

> **wantArray**: `boolean`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:35](https://github.com/exteditor/ghostbird/blob/3f896472bfdb9f53de41c35a2487213bd52de1fa/src/root/util/wire.ts#L35)

Indicates whether this class expects dependencies as arrays. Useful for composites or aggregates.
If `true`, each argument to the constructor will be an array of instances.
If `false`, each argument to the constructor will be an instance.
