[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / IScriptingAPI

# Interface: IScriptingAPI

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:7

Use the scripting API to execute script in different contexts.

## Methods

### executeScript()

> **executeScript**(`injection`): `Promise`\<`unknown`\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/scripting.d.ts:9

Injects a script into a target context. The script will be run at document_idle.

#### Parameters

##### injection

[`ScriptInjection`](ScriptInjection.md)

#### Returns

`Promise`\<`unknown`\>
