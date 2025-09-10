[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [util](../README.md) / generatorTee

# Function: generatorTee()

> **generatorTee**\<`TYield`, `TResult`, `TInput`\>(`startGenerator`): `Generator`\<`TYield`, `TResult`, `TInput`\>

Defined in: work/ghostbird/ghostbird/build/src/util/generator\_tee.d.ts:11

Create a pass-through generator that logs all inputs and outputs to console.

## Type Parameters

### TYield

`TYield`

The type of values yielded by the generator

### TResult

`TResult`

The type of the final return value

### TInput

`TInput`

The type of values that can be sent to the generator

## Parameters

### startGenerator

() => `Generator`\<`TYield`, `TResult`, `TInput`\>

A factory function that creates the generator to be wrapped

## Returns

`Generator`\<`TYield`, `TResult`, `TInput`\>

A new generator that behaves identically to the original

## Throws

If the original generator throws
