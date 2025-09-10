[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [util](../README.md) / CaseFoldingMap

# Class: CaseFoldingMap\<T\>

Defined in: work/ghostbird/ghostbird/build/src/util/case\_folding\_map.d.ts:1

## Extends

- `Map`\<`string`, `T`\>

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new CaseFoldingMap**\<`T`\>(`entries?`): `CaseFoldingMap`\<`T`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.collection.d.ts:50

#### Parameters

##### entries?

`null` | readonly readonly \[`string`, `T`\][]

#### Returns

`CaseFoldingMap`\<`T`\>

#### Inherited from

`Map<string, T>.constructor`

### Constructor

> **new CaseFoldingMap**\<`T`\>(`iterable?`): `CaseFoldingMap`\<`T`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.collection.d.ts:49

#### Parameters

##### iterable?

`null` | `Iterable`\<readonly \[`string`, `T`\], `any`, `any`\>

#### Returns

`CaseFoldingMap`\<`T`\>

#### Inherited from

`Map<string, T>.constructor`

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:137

#### Inherited from

`Map.[toStringTag]`

***

### size

> `readonly` **size**: `number`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.collection.d.ts:45

#### Returns

the number of elements in the Map.

#### Inherited from

`Map.size`

***

### \[species\]

> `readonly` `static` **\[species\]**: `MapConstructor`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:319

#### Inherited from

`Map.[species]`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<\[`string`, `T`\]\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:143

Returns an iterable of entries in the map.

#### Returns

`MapIterator`\<\[`string`, `T`\]\>

#### Inherited from

`Map.[iterator]`

***

### clear()

> **clear**(): `void`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.collection.d.ts:20

#### Returns

`void`

#### Inherited from

`Map.clear`

***

### delete()

> **delete**(`key`): `boolean`

Defined in: work/ghostbird/ghostbird/build/src/util/case\_folding\_map.d.ts:5

#### Parameters

##### key

`string`

#### Returns

`boolean`

true if an element in the Map existed and has been removed, or false if the element does not exist.

#### Overrides

`Map.delete`

***

### entries()

> **entries**(): `MapIterator`\<\[`string`, `T`\]\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:148

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`MapIterator`\<\[`string`, `T`\]\>

#### Inherited from

`Map.entries`

***

### forEach()

> **forEach**(`callbackfn`, `thisArg?`): `void`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.collection.d.ts:28

Executes a provided function once per each key/value pair in the Map, in insertion order.

#### Parameters

##### callbackfn

(`value`, `key`, `map`) => `void`

##### thisArg?

`any`

#### Returns

`void`

#### Inherited from

`Map.forEach`

***

### get()

> **get**(`key`): `undefined` \| `T`

Defined in: work/ghostbird/ghostbird/build/src/util/case\_folding\_map.d.ts:2

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

#### Parameters

##### key

`string`

#### Returns

`undefined` \| `T`

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

#### Overrides

`Map.get`

***

### has()

> **has**(`key`): `boolean`

Defined in: work/ghostbird/ghostbird/build/src/util/case\_folding\_map.d.ts:4

#### Parameters

##### key

`string`

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Overrides

`Map.has`

***

### keys()

> **keys**(): `MapIterator`\<`string`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:153

Returns an iterable of keys in the map

#### Returns

`MapIterator`\<`string`\>

#### Inherited from

`Map.keys`

***

### set()

> **set**(`key`, `value`): `this`

Defined in: work/ghostbird/ghostbird/build/src/util/case\_folding\_map.d.ts:3

Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`this`

#### Overrides

`Map.set`

***

### values()

> **values**(): `MapIterator`\<`T`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:158

Returns an iterable of values in the map

#### Returns

`MapIterator`\<`T`\>

#### Inherited from

`Map.values`

***

### groupBy()

> `static` **groupBy**\<`K`, `T`\>(`items`, `keySelector`): `Map`\<`K`, `T`[]\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2024.collection.d.ts:25

Groups members of an iterable according to the return value of the passed callback.

#### Type Parameters

##### K

`K`

##### T

`T`

#### Parameters

##### items

`Iterable`\<`T`\>

An iterable.

##### keySelector

(`item`, `index`) => `K`

A callback which will be invoked for each item in items.

#### Returns

`Map`\<`K`, `T`[]\>

#### Inherited from

`Map.groupBy`
