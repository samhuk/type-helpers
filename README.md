<h1 align="center">type-helpers</h1>
<p align="center">
  <em>Useful Common Typescript Types</em>
</p>

<p align="center">
  <a href="https://img.shields.io/badge/License-MIT-green.svg" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="license" />
  </a>
  <a href="https://badge.fury.io/js/@samhuk/type-helpers.svg" target="_blank">
    <img src="https://badge.fury.io/js/{{npm-package-name}}.svg" alt="npm version" />
  </a>
</p>

## Overview

This package provides some useful common Typescript types.

## Usage Overview

This section shows simple usage examples for some of the types.

`OmitTyped` - type-enforced version of Typescript's built-in `Omit`.

```typescript
import { OmitTyped } from '@samhuk/type-helpers'

type A = { foo: string, bar: string, fizz: string, buzz: string }
type B = OmitTyped<A, 'fizz'> // OK
type C = OmitTyped<A, 'notAProp'> // tsc error
```

`IsAny` - determines if a type is explicitly `any` or not.

```typescript
import { IsAny } from '@samhuk/type-helpers'

type A = IsAny<any> // true
type B = IsAny<1> // false
```

`DictValues` - converts a dictionary type to a union of it's values.

```typescript
import { DictValues } from '@samhuk/type-helpers'

type A = { a: 1, b: 2, c: 3, d: 4 }
type B = DictValues<A> // 1 | 2 | 3 | 4
```

`StringKeysOf` - converts a dictionary type to a union of it's keys, ensuring that they are all strings. This is useful because `keyof` will tell typescript that your union will be values of `string`, `number`, or `symbol`, which is quite often not what you want.

```typescript
import { StringKeysOf } from '@samhuk/type-helpers'

type A = { a: 1, b: 2, c: 3, d: 4 }
type B = StringKeysOf<A> // 'a' | 'b' | 'c' | 'd'
```

## Development

Contributions are welcome! See [./contributing/development.md](./contributing/development.md).

---

*Package generated from [ts-npm-package-template](https://github.com/samhuk/ts-npm-package-template)*