[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-session](../README.md) / CommandResult

# Type Alias: CommandResult

> **CommandResult** = \{ `init`: [`ServerInitialResponse`](ServerInitialResponse.md); `type`: `"connected"`; \} \| \{ `type`: `"statusUpdated"`; \} \| \{ `change`: [`EditorChangeResponse`](EditorChangeResponse.md); `type`: `"serverChanged"`; \} \| \{ `state`: [`EmailState`](EmailState.md); `type`: `"clientState"`; \} \| \{ `edit`: [`InternalEdit`](InternalEdit.md); `type`: `"clientEdited"`; \} \| \{ `error?`: `Error`; `type`: `"disconnected"`; \} \| \{ `type`: `"editorClosed"`; \}

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/ghost\_text\_client.d.ts:17
