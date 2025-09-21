[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [util](../README.md) / CaseFoldingSet

# Class: CaseFoldingSet

Defined in: work/ghostbird/ghostbird/build/src/util/case\_folding\_set.d.ts:1

## Extends

- `Set`\<`string`\>

## Constructors

### Constructor

> **new CaseFoldingSet**(`values?`): `CaseFoldingSet`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.collection.d.ts:116

#### Parameters

##### values?

`null` | readonly `string`[]

#### Returns

`CaseFoldingSet`

#### Inherited from

`Set<string>.constructor`

### Constructor

> **new CaseFoldingSet**(`iterable?`): `CaseFoldingSet`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.collection.d.ts:116

#### Parameters

##### iterable?

`null` | `Iterable`\<`string`, `any`, `any`\>

#### Returns

`CaseFoldingSet`

#### Inherited from

`Set<string>.constructor`

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:145

#### Inherited from

`Set.[toStringTag]`

***

### size

> `readonly` **size**: `number`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.collection.d.ts:112

#### Returns

the number of (unique) elements in Set.

#### Inherited from

`Set.size`

***

### \[species\]

> `readonly` `static` **\[species\]**: `SetConstructor`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:322

#### Inherited from

`Set.[species]`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `SetIterator`\<`string`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:198

Iterates over values in the set.

#### Returns

`SetIterator`\<`string`\>

#### Inherited from

`Set.[iterator]`

***

### add()

> **add**(`value`): `this`

Defined in: work/ghostbird/ghostbird/build/src/util/case\_folding\_set.d.ts:2

Appends a new element with a specified value to the end of the Set.

#### Parameters

##### value

`string`

#### Returns

`this`

#### Overrides

`Set.add`

***

### clear()

> **clear**(): `void`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.collection.d.ts:95

#### Returns

`void`

#### Inherited from

`Set.clear`

***

### delete()

> **delete**(`value`): `boolean`

Defined in: work/ghostbird/ghostbird/build/src/util/case\_folding\_set.d.ts:3

Removes a specified value from the Set.

#### Parameters

##### value

`string`

#### Returns

`boolean`

Returns true if an element in the Set existed and has been removed, or false if the element does not exist.

#### Overrides

`Set.delete`

***

### difference()

> **difference**\<`U`\>(`other`): `Set`\<`string`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.esnext.collection.d.ts:48

#### Type Parameters

##### U

`U`

#### Parameters

##### other

`ReadonlySetLike`\<`U`\>

#### Returns

`Set`\<`string`\>

a new Set containing all the elements in this Set which are not also in the argument.

#### Inherited from

`Set.difference`

***

### entries()

> **entries**(): `SetIterator`\<\[`string`, `string`\]\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:203

Returns an iterable of [v,v] pairs for every value `v` in the set.

#### Returns

`SetIterator`\<\[`string`, `string`\]\>

#### Inherited from

`Set.entries`

***

### forEach()

> **forEach**(`callbackfn`, `thisArg?`): `void`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.collection.d.ts:104

Executes a provided function once per each value in the Set object, in insertion order.

#### Parameters

##### callbackfn

(`value`, `value2`, `set`) => `void`

##### thisArg?

`any`

#### Returns

`void`

#### Inherited from

`Set.forEach`

***

### has()

> **has**(`value`): `boolean`

Defined in: work/ghostbird/ghostbird/build/src/util/case\_folding\_set.d.ts:4

#### Parameters

##### value

`string`

#### Returns

`boolean`

a boolean indicating whether an element with the specified value exists in the Set or not.

#### Overrides

`Set.has`

***

### intersection()

> **intersection**\<`U`\>(`other`): `Set`\<`string` & `U`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.esnext.collection.d.ts:44

#### Type Parameters

##### U

`U`

#### Parameters

##### other

`ReadonlySetLike`\<`U`\>

#### Returns

`Set`\<`string` & `U`\>

a new Set containing all the elements which are both in this Set and in the argument.

#### Inherited from

`Set.intersection`

***

### isDisjointFrom()

> **isDisjointFrom**(`other`): `boolean`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.esnext.collection.d.ts:64

#### Parameters

##### other

`ReadonlySetLike`\<`unknown`\>

#### Returns

`boolean`

a boolean indicating whether this Set has no elements in common with the argument.

#### Inherited from

`Set.isDisjointFrom`

***

### isSubsetOf()

> **isSubsetOf**(`other`): `boolean`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.esnext.collection.d.ts:56

#### Parameters

##### other

`ReadonlySetLike`\<`unknown`\>

#### Returns

`boolean`

a boolean indicating whether all the elements in this Set are also in the argument.

#### Inherited from

`Set.isSubsetOf`

***

### isSupersetOf()

> **isSupersetOf**(`other`): `boolean`

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.esnext.collection.d.ts:60

#### Parameters

##### other

`ReadonlySetLike`\<`unknown`\>

#### Returns

`boolean`

a boolean indicating whether all the elements in the argument are also in this Set.

#### Inherited from

`Set.isSupersetOf`

***

### keys()

> **keys**(): `SetIterator`\<`string`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:208

Despite its name, returns an iterable of the values in the set.

#### Returns

`SetIterator`\<`string`\>

#### Inherited from

`Set.keys`

***

### symmetricDifference()

> **symmetricDifference**\<`U`\>(`other`): `Set`\<`string` \| `U`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.esnext.collection.d.ts:52

#### Type Parameters

##### U

`U`

#### Parameters

##### other

`ReadonlySetLike`\<`U`\>

#### Returns

`Set`\<`string` \| `U`\>

a new Set containing all the elements which are in either this Set or in the argument, but not in both.

#### Inherited from

`Set.symmetricDifference`

***

### union()

> **union**\<`U`\>(`other`): `Set`\<`string` \| `U`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.esnext.collection.d.ts:40

#### Type Parameters

##### U

`U`

#### Parameters

##### other

`ReadonlySetLike`\<`U`\>

#### Returns

`Set`\<`string` \| `U`\>

a new Set containing all the elements in this Set and also all the elements in the argument.

#### Inherited from

`Set.union`

***

### values()

> **values**(): `SetIterator`\<`string`\>

Defined in: .yarn/berry/cache/typescript-patch-bcfe2ebaf8-10c0.zip/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:213

Returns an iterable of values in the set.

#### Returns

`SetIterator`\<`string`\>

#### Inherited from

`Set.values`
