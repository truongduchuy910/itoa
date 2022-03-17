<!--[meta]
section: guides
title: Hooks
[meta]-->

# Hooks

Hooks give developers a way to add custom logic to the framework of lists, fields and operations Itoa provides.

This document provides an overview of the concepts, patterns and function of the Itoa hook system.
The [Hooks API docs](/docs/api/hooks.md) describe the specific arguments and usage information.

## Conceptual organisation

There are several categorisations that can be applied to hooks and are useful for understanding what is run and when.

> **Note:** the concepts listed here have some exceptions.
> See the [Gotchas section](#gotchas).

### Stage

Itoa defines several *stages* within the [hook execution order](#intra-hook-execution-order).
These stages are intended to be used for different purposes; they help organise your hook functionality.

* Input resolution - modify the values supplied
* Data validation - check the values are valid
* Before operation - perform side effects *before* the primary operation
* After operation - perform side effects *after* the primary operation

### Operation

Hooks are available for these core operations:

* `create`
* `update`
* `delete`
* `authenticate`
* `unauthenticate`

These operations are used for both "single" and "many" modes.
E.g. the `deleteUser` (singular) and `deleteUsers` (plural) mutations are both considered to be `delete` operations.

Hooks for these operations have different signatures due to the nature of the operations being performed.
See the [Hook API docs](/docs/api/hooks.md) for specifics.

> **Note:** Itoa does not currently implement `read` hooks.

### Hook type

A hook *type* is defined by where it is attached.
Itoa recognises three *types* of hook:

* [Field Type hooks](/docs/api/hooks.md#field-type-hooks) -
  Field Type hooks are associated with a particular *field type* and are applied to all fields of that type across all lists.
* [Field hooks](/docs/api/hooks.md#field-hooks) -
  Field hooks can be defined by the app developer by specifying the `hooks` attribute of a field configuration when calling `createList()`.
* [List hooks](/docs/api/hooks.md#list-hooks) -
  List hooks can be defined by the app developer by specifying the `hooks` attribute of a list configuration when calling `createList()`.

### Hook set

For most *stage* and *operation* combinations, different functions (hooks) can be supplied for each *hook type*.
This group of distinct but related hooks are referred to as a *hook set*.

E.g. a `beforeDelete` function could be supplied for a list, several specific fields on the list and a field type used by the list.
All hooks in a hook set share the same functional signature but are invoked at different times.
See the [Hooks API docs](/docs/api/hooks.md) and [Intra-Hook Execution Order section](#intra-hook-execution-order) for more information.

### Putting it together

In total there are 13 *hook sets* available.
This table shows the *hook set* relevant to each combination of *stage* and *operation*:

| Stage            | `create`        | `update`        | `delete`         | `authenticate`      | `unauthenticate` |
| ---------------- | --------------- | --------------- | ---------------- | ------------------- | ---------------- |
| Input resolution | `resolveInput`  | `resolveInput`  | n/a              | `resolveAuthInput`  |                  |
| Data validation  | `validateInput` | `validateInput` | `validateDelete` | `validateAuthInput` |                  |
| Before operation | `beforeChange`  | `beforeChange`  | `beforeDelete`   | `beforeAuth`        | `beforeUnauth`   |
| After operation  | `afterChange`   | `afterChange`   | `afterDelete`    | `afterAuth`         | `afterUnauth`    |

The `create`, `update` and `delete` *hook sets* can be attached as *list*, *field* or *field type* hooks.
The `authenticate` and `unauthenticate` hook sets are unique in that they can only be defined when creating an authentication strategy.

Due to their similarity, the `create` and `update` operations share a single set of hooks.
To implement different logic for these operations make it conditional on either the `operation` or `existingItem` arguments;
for create operations `existingItem` will be `undefined`.

See the [Hooks API docs](/docs/api/hooks.md) for argument details and usage.

## Execution order

The hooks are invoked in a specific order during an operation.
For full details of the mutation lifecycle, and where hooks fit within this, see the [Mutation Lifecycle Guide](/docs/guides/mutation-lifecycle.md).

### Create/Update

1. Access control checks
2. Field defaults applied
3. `resolveInput` called on all fields, even if they are not defined in the supplied data
4. `validateInput` called on all fields which have a resolved value (after all `resolveInput` calls have returned)
5. `beforeChange` called on all fields which have a resolved value (after all `validateInput` calls have returned)
6. Database operation
7. `afterChange` called on all fields, even if their value was not changed

### Delete

1. Access control checks
2. `validateDelete` called on all fields
3. `beforeDelete` called on all fields (after all `validateDelete` calls have returned)
4. Database operation (after all `beforeDelete` calls have returned)
5. `afterDelete` called on all fields (after the DB operation has completed)

### Authentication

1. Access control checks
2. `resolveAuthInput` called for the list
3. `validateAuthInput` called for the list
4. `beforeAuth` called for the list
5. Auth strategy `validate()` is called
6. `afterAuth` called for the list

### Unauthentication

1. Access control checks
2. `beforeAuth` called for the list
3. `context.endAuthedSession()` is called
4. `afterAuth` called for the list

### Intra-hook execution order

Within each hook set, the different [hook types](#hook-type) are invoked in a specific order.

1. All relevant and defined [field type hooks](/docs/api/hooks.md#field-type-hooks) are invoked in **parallel**
2. All relevant and defined [field hooks](/docs/api/hooks.md#field-hooks) are invoked in **parallel**
3. If defined the [list hook](/docs/api/hooks.md#list-hooks) is invoked

## Gotchas

The hook system is powerful but its breadth and flexibility introduce some complexity.
A few of the main stumbling blocks are:

* The `create` and `update` operations share a single set of hooks.
  To implement different logic for these operations make it conditional on either the `operation` or `existingItem` arguments;
  for create operations `existingItem` will be `undefined`.
* As per the table above, the `delete` operations have no hook set for the *input resolution* stage.
  This operation doesn't accept any input (other than the target IDs).
* Itoa does not currently implement `read` hooks.
* Field type hooks and field hooks are run in parallel.
* The `authenticate` and `unauthenticate` hook sets are unique in that they can only be defined when creating an authentication strategy.

These nuances aren't bugs per se -- they generally exist for good reason --
but they can make understanding the hook system difficult.

<!-- TODO: ## Error Handling -->
