[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [ghosttext-session](../README.md) / Command

# Type Alias: Command

> **Command** = \{ `type`: `"connect"`; \} \| \{ `type`: `"queryEditor"`; \} \| \{ `type`: `"requestUpdate"`; `update`: [`UpdateRequest`](UpdateRequest.md); \} \| \{ `change`: [`ExternalEdit`](ExternalEdit.md) \| `undefined`; `type`: `"applyChange"`; \} \| \{ `status`: [`SessionStatus`](SessionStatus.md); `type`: `"notifyStatus"`; \}

Defined in: work/ghostbird/ghostbird/build/src/ghosttext-session/ghost\_text\_client.d.ts:3
