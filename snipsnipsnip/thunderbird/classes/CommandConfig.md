[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / CommandConfig

# Class: CommandConfig

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/command\_config.d.ts:2

Queries current shortcut key config

## Implements

- [`ICommandConfig`](../../app-background/interfaces/ICommandConfig.md)

## Constructors

### Constructor

> **new CommandConfig**(`messenger`): `CommandConfig`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/command\_config.d.ts:5

#### Parameters

##### messenger

*typeof* `messenger`

#### Returns

`CommandConfig`

## Properties

### messenger

> `readonly` **messenger**: *typeof* `messenger`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/command\_config.d.ts:3

***

### isSingleton

> `static` **isSingleton**: `boolean`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/command\_config.d.ts:4

## Methods

### getAll()

> **getAll**(): `Promise`\<[`CommandInfo`](../../app-background/type-aliases/CommandInfo.md)[]\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/background\_util/command\_config.d.ts:6

#### Returns

`Promise`\<[`CommandInfo`](../../app-background/type-aliases/CommandInfo.md)[]\>

all commands defined in manifest.json

#### Implementation of

[`ICommandConfig`](../../app-background/interfaces/ICommandConfig.md).[`getAll`](../../app-background/interfaces/ICommandConfig.md#getall)
