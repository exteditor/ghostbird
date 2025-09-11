[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [root](../README.md) / AliasMap

# Class: AliasMap\<TCatalog\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:121](https://github.com/exteditor/ghostbird/blob/1b5d1af7a5d928cd4724811ce3a123d2a427611d/src/root/util/wire.ts#L121)

Collects and handles duplicate aliases

## Type Parameters

### TCatalog

`TCatalog`

## Constructors

### Constructor

> **new AliasMap**\<`TCatalog`\>(`map`, `duplicateWanted`, `nameForDuplicatesOf`): `AliasMap`\<`TCatalog`\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:122](https://github.com/exteditor/ghostbird/blob/1b5d1af7a5d928cd4724811ce3a123d2a427611d/src/root/util/wire.ts#L122)

#### Parameters

##### map

`Map`\<keyof `TCatalog` & `string`, `Set`\<keyof `TCatalog` & `string`\>\>

##### duplicateWanted

`Set`\<keyof `TCatalog` & `string`\>

##### nameForDuplicatesOf

(`alias`) => `string`

#### Returns

`AliasMap`\<`TCatalog`\>

## Methods

### collectAliases()

> **collectAliases**(`__namedParameters`): `void`

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:131](https://github.com/exteditor/ghostbird/blob/1b5d1af7a5d928cd4724811ce3a123d2a427611d/src/root/util/wire.ts#L131)

Classes may have duplicate aliases, so we collect them first to register later

#### Parameters

##### \_\_namedParameters

[`IClassInfo`](../interfaces/IClassInfo.md)\<`TCatalog`\>

#### Returns

`void`

***

### makeAliasEntries()

> **makeAliasEntries**(): `Generator`\<\[`string`, [`ResolveQuery`](../type-aliases/ResolveQuery.md)\<`TCatalog`, `unknown`\>\]\>

Defined in: [work/ghostbird/ghostbird/src/root/util/wire.ts:151](https://github.com/exteditor/ghostbird/blob/1b5d1af7a5d928cd4724811ce3a123d2a427611d/src/root/util/wire.ts#L151)

Builds entries to add to the IRegistry from collected aliases

#### Returns

`Generator`\<\[`string`, [`ResolveQuery`](../type-aliases/ResolveQuery.md)\<`TCatalog`, `unknown`\>\]\>
