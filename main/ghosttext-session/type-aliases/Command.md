[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-session](../README.md) / Command

# Type Alias: Command

> **Command** = \{ `type`: `"connect"`; \} \| \{ `type`: `"queryEditor"`; \} \| \{ `type`: `"requestUpdate"`; `update`: [`UpdateRequest`](../interfaces/UpdateRequest.md); \} \| \{ `change`: [`EditorChangeResponse`](../interfaces/EditorChangeResponse.md); `type`: `"applyChange"`; \} \| \{ `status`: [`SessionStatus`](SessionStatus.md); `type`: `"notifyStatus"`; \}

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/ghost\_text\_client.d.ts:3
