[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / InjectionResult

# Interface: InjectionResult

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:29

Result of a script injection.

## Properties

### error?

> `optional` **error**: `unknown`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:33

The error property is set when the script execution failed. The value is typically an (Error) object with a message property, but could be any value (including primitives and undefined) if the script threw or rejected with such a value.

***

### frameId

> **frameId**: `number`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:31

The frame ID associated with the injection.

***

### result?

> `optional` **result**: `unknown`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:35

The result of the script execution.
