[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / IClassInfo

# Interface: IClassInfo\<TCatalog, T, TArgs\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:18](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L18)

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

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:48](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L48)

Optional alternative names to register the class as.

***

### ctor()

> **ctor**: (...`args`) => `T`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:38](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L38)

The constructor of the class.

#### Parameters

##### args

...`TArgs`

#### Returns

`T`

***

### deps

> **deps**: `string` & keyof `TCatalog`[]

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:44](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L44)

Names of dependencies that the constructor requires.

***

### isSingleton

> **isSingleton**: `boolean`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:24](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L24)

Specifies the lifetime of the class.
If `true`, only one instance is created and shared.
If `false`, a new instance is created each time it is needed.

***

### name

> **name**: keyof `TCatalog` & `string`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:34](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L34)

The name of the class as a dependency.

***

### wantArray

> **wantArray**: `boolean`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:30](https://github.com/exteditor/ghostbird/blob/ad2fee8e95e8d305452bb102c3339bbb3c7e8162/src/root/util/wire.ts#L30)

Specifies whether this class requires dependencies as arrays. Useful for composites or aggregates.
If `true`, each argument to the constructor will be an array of instances.
If `false`, each argument to the constructor will be an instance.
