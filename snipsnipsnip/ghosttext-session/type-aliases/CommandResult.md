[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-session](../README.md) / CommandResult

# Type Alias: CommandResult

> **CommandResult** = \{ `init`: [`ServerInitialResponse`](../interfaces/ServerInitialResponse.md); `type`: `"connected"`; \} \| \{ `type`: `"statusUpdated"`; \} \| \{ `change`: [`EditorChangeResponse`](../interfaces/EditorChangeResponse.md); `type`: `"serverChanged"`; \} \| \{ `state`: [`IEditorState`](../interfaces/IEditorState.md); `type`: `"editorState"`; \} \| \{ `state`: `Partial`\<[`IEditorState`](../interfaces/IEditorState.md)\>; `type`: `"partialEditorState"`; \} \| \{ `error?`: `Error`; `type`: `"disconnected"`; \} \| \{ `type`: `"editorClosed"`; \}

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/ghost\_text\_client.d.ts:17
