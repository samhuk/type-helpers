export type Dict<T = any> = { [key: string]: T }

/**
 * For creating types like:
 *
 * @example
 * enum Type { STRING, NUMBER }
 * type Map = {
 *   [Type.STRING]: { upperCase: string },
 *   [Type.NUMBER]: { isInteger: boolean },
 * }
 * type Field = TypeDependantBaseIntersection<Type, Map, "dataType", "dataTypeOptions">
 * const field1: Field = {
 *   dataType: Type.STRING,
 *   dataTypeOptions: {
 *     upperCase: false
 *   }
 * }
 */
export type TypeDependantBase<
  TType extends string|number,
  TMap extends { [k in TType]: any },
  TTypePropertyName extends string = 'type',
  TTypeOptionsPropertyName extends string = 'typeOptions'
> = {
  [K in TType]: { [k in TTypePropertyName]: K } & { [k in TTypeOptionsPropertyName]: TMap[K] }
}[TType] & { [k in TTypePropertyName]: TType }

/**
 * For creating types like:
 *
 * @example
 * enum Type { STRING, NUMBER }
 * type Map = {
 *   [Type.STRING]: { upperCase: string },
 *   [Type.NUMBER]: { isInteger: boolean },
 * }
 * type Field<T extends Type> = TypeDependantBaseIntersection<Type, Map, T, "dataType">
 * const field1: Field = {
 *   dataType: Type.STRING,
 *   upperCase: false
 * }
 */
export type TypeDependantBaseIntersection<
  TType extends string|number,
  TMap extends { [k in TType]: any },
  TSpecificEnumType extends string|number = TType,
  TTypePropertyName extends string = 'type',
> = {
  [K in TType]: { [k in TTypePropertyName]: K } & TMap[K]
}[TType] & { [k in TTypePropertyName]: TSpecificEnumType }

/**
 * Removes all of the `readonly` status of all the properties within `T`.
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] }

/**
 * Recursively deep version of `Mutable`, i.e. recursively removes all of the `readonly`
 * status of all properties within `T`.
 */
export type DeepMutable<T> =
  T extends (infer R)[] ? DeepMutableArray<R> :
  T extends Function ? T :
  T extends object ? DeepMutableObject<T> :
  T

interface DeepMutableArray<T> extends Array<DeepMutable<T>> {}

type DeepMutableObject<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>
}

/**
 * Makes all properties of `T` either `readonly` or not.
 */
export type ReadonlyOrMutable<T> = Readonly<T> | Mutable<T>

/**
 * Recursively deep version of `ReadonlyOrMutable`, i.e. recursively makes all of the
 * properties within `T` either `readonly` or not.
 */
export type DeepReadonlyOrMutable<T> = DeepReadonly<T> | DeepMutable<T>

/*
 * Forces typescript to expand only the first level of the type definition of `T`. Be warned,
 * this can make TS not recognise your types properly, in some cases.
 */
export type ExpandOneLevel<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: O[K] } : never
  : T

/**
 * Forces typescript to recursively expand the type definition of `T`.
 */
export type ExpandRecursively<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
  : T

/**
 * Slight modification of `ExpandRecursively`. Forces typescript to recursively expand
 * the type definition of `T`, however will stop the expansion if it reaches a node that
 * extends `TAdditionalLeafNodes`.
 *
 * This is useful if your type contains types that you don't want to expand, i.e. `Date`.
 */
export type ExpandRecursivelyWithAdditionalLeafNodes<T, TAdditionalLeafNodes> =
  T extends TAdditionalLeafNodes
    ? T
    : T extends object
      ? T extends infer O ? { [K in keyof O]: ExpandRecursivelyWithAdditionalLeafNodes<O[K], TAdditionalLeafNodes> } : never
      : T

/**
 * Recursively makes all properties within `T` `readonly`.
 */
export type DeepReadonly<T> =
  T extends (infer R)[] ? DeepReadonlyArray<R> :
  T extends Function ? T :
  T extends object ? DeepReadonlyObject<T> :
  T

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

/**
 * A version of typescript's standard `Pick<T, K>` that allows any `K`,
 * similar to how `Omit<T, K>` allows any `K`.
 */
export type PickAny<T, K extends keyof any> = Pick<T, Extract<keyof T, K>>

/**
 * A version of typescript's standard `Omit<T, K` where `K` is forced to
 * be a key in `T`, instead of anything as is the case with the standard `Omit`.
 */
export type OmitTyped<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * Creates a union of all the values within the given dict type
 */
export type DictValues<TDict> = TDict[keyof TDict]

/**
 * Returns `T[]` if `TIsArray` is `true`, else `T`.
 */
export type ArrayTernary<T, TIsArray extends boolean> = TIsArray extends false ? T : T[]

type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N

/**
 * Determines if `T` is `any`. This uses a rather strange Typescript workaround, exploiting
 * the strange nature of `any`.
 */
export type IsAny<T> = IfAny<T, true, false>

/**
 * Version of `keyof` that ensures they are all strings.
 */
export type StringKeysOf<T> = Extract<keyof T, string>

/**
 * Ensures that `T` extends `TCast`, else  `never`.
 *
 * This is useful when you know for sure that `T` is `TCast`, but tsc can't see it due
 * to complex type declarations.
 */
export type Cast<T, TCast> = T extends TCast ? T : never

/**
 * Ensures that `TAccessor` is a key of `T` before using it to access `T`, else `never`.
 */
export type Access<T, TAccessor> = TAccessor extends keyof T ? T[TAccessor] : never
