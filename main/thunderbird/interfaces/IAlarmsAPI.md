[**@exteditor/ghostbird**](../../README.md)

***

[@exteditor/ghostbird](../../modules.md) / [thunderbird](../README.md) / IAlarmsAPI

# Interface: IAlarmsAPI

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/alarms.d.ts:6

Use the scripting API to execute script in different contexts.

## Properties

### onAlarm

> `readonly` **onAlarm**: `WebExtEvent`\<(`name`) => `void`\>

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/alarms.d.ts:21

Fired when an alarm has expired. Useful for transient background pages.

## Methods

### clear()

> **clear**(`name?`): `boolean`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/alarms.d.ts:12

Clears the alarm with the given name.

#### Parameters

##### name?

`string`

The name of the alarm to clear. Defaults to the empty string.

#### Returns

`boolean`

Whether an alarm of the given name was found to clear.

***

### create()

#### Call Signature

> **create**(`name`, `alarmInfo`): `void`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/alarms.d.ts:18

Creates an alarm. After the delay is expired, the onAlarm event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.

##### Parameters

###### name

`string`

Optional name to identify this alarm. Defaults to the empty string.

###### alarmInfo

`Partial`\<`AlarmInfo`\>

Details about the alarm. The alarm first fires either at `when` milliseconds past the epoch (if `when` is provided), after `delayInMinutes` minutes from the current time (if `delayInMinutes` is provided instead), or after `periodInMinutes` minutes from the current time (if only `periodInMinutes` is provided). Users should never provide both `when` and `delayInMinutes`. If `periodInMinutes` is provided, then the alarm recurs repeatedly after that many minutes.

##### Returns

`void`

#### Call Signature

> **create**(`alarmInfo`): `void`

Defined in: work/ghostbird/ghostbird/build/src/thunderbird/messenger/alarms.d.ts:19

##### Parameters

###### alarmInfo

`AlarmInfo`

##### Returns

`void`
