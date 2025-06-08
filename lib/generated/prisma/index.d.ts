
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model governorates
 * 
 */
export type governorates = $Result.DefaultSelection<Prisma.$governoratesPayload>
/**
 * Model service_categories
 * 
 */
export type service_categories = $Result.DefaultSelection<Prisma.$service_categoriesPayload>
/**
 * Model service_providers
 * 
 */
export type service_providers = $Result.DefaultSelection<Prisma.$service_providersPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const service_delivery_method: {
  online: 'online',
  offline: 'offline',
  both: 'both'
};

export type service_delivery_method = (typeof service_delivery_method)[keyof typeof service_delivery_method]


export const service_provider_status: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

export type service_provider_status = (typeof service_provider_status)[keyof typeof service_provider_status]

}

export type service_delivery_method = $Enums.service_delivery_method

export const service_delivery_method: typeof $Enums.service_delivery_method

export type service_provider_status = $Enums.service_provider_status

export const service_provider_status: typeof $Enums.service_provider_status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Governorates
 * const governorates = await prisma.governorates.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Governorates
   * const governorates = await prisma.governorates.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.governorates`: Exposes CRUD operations for the **governorates** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Governorates
    * const governorates = await prisma.governorates.findMany()
    * ```
    */
  get governorates(): Prisma.governoratesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service_categories`: Exposes CRUD operations for the **service_categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Service_categories
    * const service_categories = await prisma.service_categories.findMany()
    * ```
    */
  get service_categories(): Prisma.service_categoriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service_providers`: Exposes CRUD operations for the **service_providers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Service_providers
    * const service_providers = await prisma.service_providers.findMany()
    * ```
    */
  get service_providers(): Prisma.service_providersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    governorates: 'governorates',
    service_categories: 'service_categories',
    service_providers: 'service_providers',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "governorates" | "service_categories" | "service_providers" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      governorates: {
        payload: Prisma.$governoratesPayload<ExtArgs>
        fields: Prisma.governoratesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.governoratesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.governoratesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload>
          }
          findFirst: {
            args: Prisma.governoratesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.governoratesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload>
          }
          findMany: {
            args: Prisma.governoratesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload>[]
          }
          create: {
            args: Prisma.governoratesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload>
          }
          createMany: {
            args: Prisma.governoratesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.governoratesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload>[]
          }
          delete: {
            args: Prisma.governoratesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload>
          }
          update: {
            args: Prisma.governoratesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload>
          }
          deleteMany: {
            args: Prisma.governoratesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.governoratesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.governoratesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload>[]
          }
          upsert: {
            args: Prisma.governoratesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$governoratesPayload>
          }
          aggregate: {
            args: Prisma.GovernoratesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGovernorates>
          }
          groupBy: {
            args: Prisma.governoratesGroupByArgs<ExtArgs>
            result: $Utils.Optional<GovernoratesGroupByOutputType>[]
          }
          count: {
            args: Prisma.governoratesCountArgs<ExtArgs>
            result: $Utils.Optional<GovernoratesCountAggregateOutputType> | number
          }
        }
      }
      service_categories: {
        payload: Prisma.$service_categoriesPayload<ExtArgs>
        fields: Prisma.service_categoriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.service_categoriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.service_categoriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload>
          }
          findFirst: {
            args: Prisma.service_categoriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.service_categoriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload>
          }
          findMany: {
            args: Prisma.service_categoriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload>[]
          }
          create: {
            args: Prisma.service_categoriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload>
          }
          createMany: {
            args: Prisma.service_categoriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.service_categoriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload>[]
          }
          delete: {
            args: Prisma.service_categoriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload>
          }
          update: {
            args: Prisma.service_categoriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload>
          }
          deleteMany: {
            args: Prisma.service_categoriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.service_categoriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.service_categoriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload>[]
          }
          upsert: {
            args: Prisma.service_categoriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_categoriesPayload>
          }
          aggregate: {
            args: Prisma.Service_categoriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService_categories>
          }
          groupBy: {
            args: Prisma.service_categoriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Service_categoriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.service_categoriesCountArgs<ExtArgs>
            result: $Utils.Optional<Service_categoriesCountAggregateOutputType> | number
          }
        }
      }
      service_providers: {
        payload: Prisma.$service_providersPayload<ExtArgs>
        fields: Prisma.service_providersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.service_providersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.service_providersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload>
          }
          findFirst: {
            args: Prisma.service_providersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.service_providersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload>
          }
          findMany: {
            args: Prisma.service_providersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload>[]
          }
          create: {
            args: Prisma.service_providersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload>
          }
          createMany: {
            args: Prisma.service_providersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.service_providersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload>[]
          }
          delete: {
            args: Prisma.service_providersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload>
          }
          update: {
            args: Prisma.service_providersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload>
          }
          deleteMany: {
            args: Prisma.service_providersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.service_providersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.service_providersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload>[]
          }
          upsert: {
            args: Prisma.service_providersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$service_providersPayload>
          }
          aggregate: {
            args: Prisma.Service_providersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService_providers>
          }
          groupBy: {
            args: Prisma.service_providersGroupByArgs<ExtArgs>
            result: $Utils.Optional<Service_providersGroupByOutputType>[]
          }
          count: {
            args: Prisma.service_providersCountArgs<ExtArgs>
            result: $Utils.Optional<Service_providersCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    governorates?: governoratesOmit
    service_categories?: service_categoriesOmit
    service_providers?: service_providersOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type GovernoratesCountOutputType
   */

  export type GovernoratesCountOutputType = {
    service_providers: number
  }

  export type GovernoratesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_providers?: boolean | GovernoratesCountOutputTypeCountService_providersArgs
  }

  // Custom InputTypes
  /**
   * GovernoratesCountOutputType without action
   */
  export type GovernoratesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernoratesCountOutputType
     */
    select?: GovernoratesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GovernoratesCountOutputType without action
   */
  export type GovernoratesCountOutputTypeCountService_providersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: service_providersWhereInput
  }


  /**
   * Count Type Service_categoriesCountOutputType
   */

  export type Service_categoriesCountOutputType = {
    service_providers: number
  }

  export type Service_categoriesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_providers?: boolean | Service_categoriesCountOutputTypeCountService_providersArgs
  }

  // Custom InputTypes
  /**
   * Service_categoriesCountOutputType without action
   */
  export type Service_categoriesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service_categoriesCountOutputType
     */
    select?: Service_categoriesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Service_categoriesCountOutputType without action
   */
  export type Service_categoriesCountOutputTypeCountService_providersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: service_providersWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    service_providers: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_providers?: boolean | UsersCountOutputTypeCountService_providersArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountService_providersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: service_providersWhereInput
  }


  /**
   * Models
   */

  /**
   * Model governorates
   */

  export type AggregateGovernorates = {
    _count: GovernoratesCountAggregateOutputType | null
    _min: GovernoratesMinAggregateOutputType | null
    _max: GovernoratesMaxAggregateOutputType | null
  }

  export type GovernoratesMinAggregateOutputType = {
    id: string | null
    name: string | null
    governorate_code: string | null
    meta_title: string | null
    meta_description: string | null
    meta_keywords: string | null
    is_deleted: boolean | null
    deleted_at: Date | null
    deleted_by: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type GovernoratesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    governorate_code: string | null
    meta_title: string | null
    meta_description: string | null
    meta_keywords: string | null
    is_deleted: boolean | null
    deleted_at: Date | null
    deleted_by: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
  }

  export type GovernoratesCountAggregateOutputType = {
    id: number
    name: number
    governorate_code: number
    meta_title: number
    meta_description: number
    meta_keywords: number
    is_deleted: number
    deleted_at: number
    deleted_by: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    _all: number
  }


  export type GovernoratesMinAggregateInputType = {
    id?: true
    name?: true
    governorate_code?: true
    meta_title?: true
    meta_description?: true
    meta_keywords?: true
    is_deleted?: true
    deleted_at?: true
    deleted_by?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type GovernoratesMaxAggregateInputType = {
    id?: true
    name?: true
    governorate_code?: true
    meta_title?: true
    meta_description?: true
    meta_keywords?: true
    is_deleted?: true
    deleted_at?: true
    deleted_by?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
  }

  export type GovernoratesCountAggregateInputType = {
    id?: true
    name?: true
    governorate_code?: true
    meta_title?: true
    meta_description?: true
    meta_keywords?: true
    is_deleted?: true
    deleted_at?: true
    deleted_by?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    _all?: true
  }

  export type GovernoratesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which governorates to aggregate.
     */
    where?: governoratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of governorates to fetch.
     */
    orderBy?: governoratesOrderByWithRelationInput | governoratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: governoratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` governorates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` governorates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned governorates
    **/
    _count?: true | GovernoratesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GovernoratesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GovernoratesMaxAggregateInputType
  }

  export type GetGovernoratesAggregateType<T extends GovernoratesAggregateArgs> = {
        [P in keyof T & keyof AggregateGovernorates]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGovernorates[P]>
      : GetScalarType<T[P], AggregateGovernorates[P]>
  }




  export type governoratesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: governoratesWhereInput
    orderBy?: governoratesOrderByWithAggregationInput | governoratesOrderByWithAggregationInput[]
    by: GovernoratesScalarFieldEnum[] | GovernoratesScalarFieldEnum
    having?: governoratesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GovernoratesCountAggregateInputType | true
    _min?: GovernoratesMinAggregateInputType
    _max?: GovernoratesMaxAggregateInputType
  }

  export type GovernoratesGroupByOutputType = {
    id: string
    name: string
    governorate_code: string | null
    meta_title: string | null
    meta_description: string | null
    meta_keywords: string | null
    is_deleted: boolean | null
    deleted_at: Date | null
    deleted_by: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
    _count: GovernoratesCountAggregateOutputType | null
    _min: GovernoratesMinAggregateOutputType | null
    _max: GovernoratesMaxAggregateOutputType | null
  }

  type GetGovernoratesGroupByPayload<T extends governoratesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GovernoratesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GovernoratesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GovernoratesGroupByOutputType[P]>
            : GetScalarType<T[P], GovernoratesGroupByOutputType[P]>
        }
      >
    >


  export type governoratesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    governorate_code?: boolean
    meta_title?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    service_providers?: boolean | governorates$service_providersArgs<ExtArgs>
    _count?: boolean | GovernoratesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["governorates"]>

  export type governoratesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    governorate_code?: boolean
    meta_title?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["governorates"]>

  export type governoratesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    governorate_code?: boolean
    meta_title?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }, ExtArgs["result"]["governorates"]>

  export type governoratesSelectScalar = {
    id?: boolean
    name?: boolean
    governorate_code?: boolean
    meta_title?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
  }

  export type governoratesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "governorate_code" | "meta_title" | "meta_description" | "meta_keywords" | "is_deleted" | "deleted_at" | "deleted_by" | "created_at" | "created_by" | "updated_at" | "updated_by", ExtArgs["result"]["governorates"]>
  export type governoratesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_providers?: boolean | governorates$service_providersArgs<ExtArgs>
    _count?: boolean | GovernoratesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type governoratesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type governoratesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $governoratesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "governorates"
    objects: {
      service_providers: Prisma.$service_providersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      governorate_code: string | null
      meta_title: string | null
      meta_description: string | null
      meta_keywords: string | null
      is_deleted: boolean | null
      deleted_at: Date | null
      deleted_by: string | null
      created_at: Date | null
      created_by: string | null
      updated_at: Date | null
      updated_by: string | null
    }, ExtArgs["result"]["governorates"]>
    composites: {}
  }

  type governoratesGetPayload<S extends boolean | null | undefined | governoratesDefaultArgs> = $Result.GetResult<Prisma.$governoratesPayload, S>

  type governoratesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<governoratesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GovernoratesCountAggregateInputType | true
    }

  export interface governoratesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['governorates'], meta: { name: 'governorates' } }
    /**
     * Find zero or one Governorates that matches the filter.
     * @param {governoratesFindUniqueArgs} args - Arguments to find a Governorates
     * @example
     * // Get one Governorates
     * const governorates = await prisma.governorates.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends governoratesFindUniqueArgs>(args: SelectSubset<T, governoratesFindUniqueArgs<ExtArgs>>): Prisma__governoratesClient<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Governorates that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {governoratesFindUniqueOrThrowArgs} args - Arguments to find a Governorates
     * @example
     * // Get one Governorates
     * const governorates = await prisma.governorates.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends governoratesFindUniqueOrThrowArgs>(args: SelectSubset<T, governoratesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__governoratesClient<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Governorates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {governoratesFindFirstArgs} args - Arguments to find a Governorates
     * @example
     * // Get one Governorates
     * const governorates = await prisma.governorates.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends governoratesFindFirstArgs>(args?: SelectSubset<T, governoratesFindFirstArgs<ExtArgs>>): Prisma__governoratesClient<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Governorates that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {governoratesFindFirstOrThrowArgs} args - Arguments to find a Governorates
     * @example
     * // Get one Governorates
     * const governorates = await prisma.governorates.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends governoratesFindFirstOrThrowArgs>(args?: SelectSubset<T, governoratesFindFirstOrThrowArgs<ExtArgs>>): Prisma__governoratesClient<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Governorates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {governoratesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Governorates
     * const governorates = await prisma.governorates.findMany()
     * 
     * // Get first 10 Governorates
     * const governorates = await prisma.governorates.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const governoratesWithIdOnly = await prisma.governorates.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends governoratesFindManyArgs>(args?: SelectSubset<T, governoratesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Governorates.
     * @param {governoratesCreateArgs} args - Arguments to create a Governorates.
     * @example
     * // Create one Governorates
     * const Governorates = await prisma.governorates.create({
     *   data: {
     *     // ... data to create a Governorates
     *   }
     * })
     * 
     */
    create<T extends governoratesCreateArgs>(args: SelectSubset<T, governoratesCreateArgs<ExtArgs>>): Prisma__governoratesClient<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Governorates.
     * @param {governoratesCreateManyArgs} args - Arguments to create many Governorates.
     * @example
     * // Create many Governorates
     * const governorates = await prisma.governorates.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends governoratesCreateManyArgs>(args?: SelectSubset<T, governoratesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Governorates and returns the data saved in the database.
     * @param {governoratesCreateManyAndReturnArgs} args - Arguments to create many Governorates.
     * @example
     * // Create many Governorates
     * const governorates = await prisma.governorates.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Governorates and only return the `id`
     * const governoratesWithIdOnly = await prisma.governorates.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends governoratesCreateManyAndReturnArgs>(args?: SelectSubset<T, governoratesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Governorates.
     * @param {governoratesDeleteArgs} args - Arguments to delete one Governorates.
     * @example
     * // Delete one Governorates
     * const Governorates = await prisma.governorates.delete({
     *   where: {
     *     // ... filter to delete one Governorates
     *   }
     * })
     * 
     */
    delete<T extends governoratesDeleteArgs>(args: SelectSubset<T, governoratesDeleteArgs<ExtArgs>>): Prisma__governoratesClient<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Governorates.
     * @param {governoratesUpdateArgs} args - Arguments to update one Governorates.
     * @example
     * // Update one Governorates
     * const governorates = await prisma.governorates.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends governoratesUpdateArgs>(args: SelectSubset<T, governoratesUpdateArgs<ExtArgs>>): Prisma__governoratesClient<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Governorates.
     * @param {governoratesDeleteManyArgs} args - Arguments to filter Governorates to delete.
     * @example
     * // Delete a few Governorates
     * const { count } = await prisma.governorates.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends governoratesDeleteManyArgs>(args?: SelectSubset<T, governoratesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Governorates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {governoratesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Governorates
     * const governorates = await prisma.governorates.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends governoratesUpdateManyArgs>(args: SelectSubset<T, governoratesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Governorates and returns the data updated in the database.
     * @param {governoratesUpdateManyAndReturnArgs} args - Arguments to update many Governorates.
     * @example
     * // Update many Governorates
     * const governorates = await prisma.governorates.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Governorates and only return the `id`
     * const governoratesWithIdOnly = await prisma.governorates.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends governoratesUpdateManyAndReturnArgs>(args: SelectSubset<T, governoratesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Governorates.
     * @param {governoratesUpsertArgs} args - Arguments to update or create a Governorates.
     * @example
     * // Update or create a Governorates
     * const governorates = await prisma.governorates.upsert({
     *   create: {
     *     // ... data to create a Governorates
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Governorates we want to update
     *   }
     * })
     */
    upsert<T extends governoratesUpsertArgs>(args: SelectSubset<T, governoratesUpsertArgs<ExtArgs>>): Prisma__governoratesClient<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Governorates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {governoratesCountArgs} args - Arguments to filter Governorates to count.
     * @example
     * // Count the number of Governorates
     * const count = await prisma.governorates.count({
     *   where: {
     *     // ... the filter for the Governorates we want to count
     *   }
     * })
    **/
    count<T extends governoratesCountArgs>(
      args?: Subset<T, governoratesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GovernoratesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Governorates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernoratesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GovernoratesAggregateArgs>(args: Subset<T, GovernoratesAggregateArgs>): Prisma.PrismaPromise<GetGovernoratesAggregateType<T>>

    /**
     * Group by Governorates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {governoratesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends governoratesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: governoratesGroupByArgs['orderBy'] }
        : { orderBy?: governoratesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, governoratesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGovernoratesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the governorates model
   */
  readonly fields: governoratesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for governorates.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__governoratesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service_providers<T extends governorates$service_providersArgs<ExtArgs> = {}>(args?: Subset<T, governorates$service_providersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the governorates model
   */
  interface governoratesFieldRefs {
    readonly id: FieldRef<"governorates", 'String'>
    readonly name: FieldRef<"governorates", 'String'>
    readonly governorate_code: FieldRef<"governorates", 'String'>
    readonly meta_title: FieldRef<"governorates", 'String'>
    readonly meta_description: FieldRef<"governorates", 'String'>
    readonly meta_keywords: FieldRef<"governorates", 'String'>
    readonly is_deleted: FieldRef<"governorates", 'Boolean'>
    readonly deleted_at: FieldRef<"governorates", 'DateTime'>
    readonly deleted_by: FieldRef<"governorates", 'String'>
    readonly created_at: FieldRef<"governorates", 'DateTime'>
    readonly created_by: FieldRef<"governorates", 'String'>
    readonly updated_at: FieldRef<"governorates", 'DateTime'>
    readonly updated_by: FieldRef<"governorates", 'String'>
  }
    

  // Custom InputTypes
  /**
   * governorates findUnique
   */
  export type governoratesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
    /**
     * Filter, which governorates to fetch.
     */
    where: governoratesWhereUniqueInput
  }

  /**
   * governorates findUniqueOrThrow
   */
  export type governoratesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
    /**
     * Filter, which governorates to fetch.
     */
    where: governoratesWhereUniqueInput
  }

  /**
   * governorates findFirst
   */
  export type governoratesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
    /**
     * Filter, which governorates to fetch.
     */
    where?: governoratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of governorates to fetch.
     */
    orderBy?: governoratesOrderByWithRelationInput | governoratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for governorates.
     */
    cursor?: governoratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` governorates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` governorates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of governorates.
     */
    distinct?: GovernoratesScalarFieldEnum | GovernoratesScalarFieldEnum[]
  }

  /**
   * governorates findFirstOrThrow
   */
  export type governoratesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
    /**
     * Filter, which governorates to fetch.
     */
    where?: governoratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of governorates to fetch.
     */
    orderBy?: governoratesOrderByWithRelationInput | governoratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for governorates.
     */
    cursor?: governoratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` governorates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` governorates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of governorates.
     */
    distinct?: GovernoratesScalarFieldEnum | GovernoratesScalarFieldEnum[]
  }

  /**
   * governorates findMany
   */
  export type governoratesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
    /**
     * Filter, which governorates to fetch.
     */
    where?: governoratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of governorates to fetch.
     */
    orderBy?: governoratesOrderByWithRelationInput | governoratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing governorates.
     */
    cursor?: governoratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` governorates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` governorates.
     */
    skip?: number
    distinct?: GovernoratesScalarFieldEnum | GovernoratesScalarFieldEnum[]
  }

  /**
   * governorates create
   */
  export type governoratesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
    /**
     * The data needed to create a governorates.
     */
    data: XOR<governoratesCreateInput, governoratesUncheckedCreateInput>
  }

  /**
   * governorates createMany
   */
  export type governoratesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many governorates.
     */
    data: governoratesCreateManyInput | governoratesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * governorates createManyAndReturn
   */
  export type governoratesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * The data used to create many governorates.
     */
    data: governoratesCreateManyInput | governoratesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * governorates update
   */
  export type governoratesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
    /**
     * The data needed to update a governorates.
     */
    data: XOR<governoratesUpdateInput, governoratesUncheckedUpdateInput>
    /**
     * Choose, which governorates to update.
     */
    where: governoratesWhereUniqueInput
  }

  /**
   * governorates updateMany
   */
  export type governoratesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update governorates.
     */
    data: XOR<governoratesUpdateManyMutationInput, governoratesUncheckedUpdateManyInput>
    /**
     * Filter which governorates to update
     */
    where?: governoratesWhereInput
    /**
     * Limit how many governorates to update.
     */
    limit?: number
  }

  /**
   * governorates updateManyAndReturn
   */
  export type governoratesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * The data used to update governorates.
     */
    data: XOR<governoratesUpdateManyMutationInput, governoratesUncheckedUpdateManyInput>
    /**
     * Filter which governorates to update
     */
    where?: governoratesWhereInput
    /**
     * Limit how many governorates to update.
     */
    limit?: number
  }

  /**
   * governorates upsert
   */
  export type governoratesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
    /**
     * The filter to search for the governorates to update in case it exists.
     */
    where: governoratesWhereUniqueInput
    /**
     * In case the governorates found by the `where` argument doesn't exist, create a new governorates with this data.
     */
    create: XOR<governoratesCreateInput, governoratesUncheckedCreateInput>
    /**
     * In case the governorates was found with the provided `where` argument, update it with this data.
     */
    update: XOR<governoratesUpdateInput, governoratesUncheckedUpdateInput>
  }

  /**
   * governorates delete
   */
  export type governoratesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
    /**
     * Filter which governorates to delete.
     */
    where: governoratesWhereUniqueInput
  }

  /**
   * governorates deleteMany
   */
  export type governoratesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which governorates to delete
     */
    where?: governoratesWhereInput
    /**
     * Limit how many governorates to delete.
     */
    limit?: number
  }

  /**
   * governorates.service_providers
   */
  export type governorates$service_providersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    where?: service_providersWhereInput
    orderBy?: service_providersOrderByWithRelationInput | service_providersOrderByWithRelationInput[]
    cursor?: service_providersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Service_providersScalarFieldEnum | Service_providersScalarFieldEnum[]
  }

  /**
   * governorates without action
   */
  export type governoratesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
  }


  /**
   * Model service_categories
   */

  export type AggregateService_categories = {
    _count: Service_categoriesCountAggregateOutputType | null
    _min: Service_categoriesMinAggregateOutputType | null
    _max: Service_categoriesMaxAggregateOutputType | null
  }

  export type Service_categoriesMinAggregateOutputType = {
    id: string | null
    name: string | null
    meta_title: string | null
    meta_description: string | null
    meta_keywords: string | null
    is_deleted: boolean | null
    deleted_at: Date | null
    deleted_by: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
    icon: string | null
    slug: string | null
  }

  export type Service_categoriesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    meta_title: string | null
    meta_description: string | null
    meta_keywords: string | null
    is_deleted: boolean | null
    deleted_at: Date | null
    deleted_by: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
    icon: string | null
    slug: string | null
  }

  export type Service_categoriesCountAggregateOutputType = {
    id: number
    name: number
    meta_title: number
    meta_description: number
    meta_keywords: number
    is_deleted: number
    deleted_at: number
    deleted_by: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    icon: number
    slug: number
    _all: number
  }


  export type Service_categoriesMinAggregateInputType = {
    id?: true
    name?: true
    meta_title?: true
    meta_description?: true
    meta_keywords?: true
    is_deleted?: true
    deleted_at?: true
    deleted_by?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    icon?: true
    slug?: true
  }

  export type Service_categoriesMaxAggregateInputType = {
    id?: true
    name?: true
    meta_title?: true
    meta_description?: true
    meta_keywords?: true
    is_deleted?: true
    deleted_at?: true
    deleted_by?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    icon?: true
    slug?: true
  }

  export type Service_categoriesCountAggregateInputType = {
    id?: true
    name?: true
    meta_title?: true
    meta_description?: true
    meta_keywords?: true
    is_deleted?: true
    deleted_at?: true
    deleted_by?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    icon?: true
    slug?: true
    _all?: true
  }

  export type Service_categoriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which service_categories to aggregate.
     */
    where?: service_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_categories to fetch.
     */
    orderBy?: service_categoriesOrderByWithRelationInput | service_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: service_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned service_categories
    **/
    _count?: true | Service_categoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Service_categoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Service_categoriesMaxAggregateInputType
  }

  export type GetService_categoriesAggregateType<T extends Service_categoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateService_categories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService_categories[P]>
      : GetScalarType<T[P], AggregateService_categories[P]>
  }




  export type service_categoriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: service_categoriesWhereInput
    orderBy?: service_categoriesOrderByWithAggregationInput | service_categoriesOrderByWithAggregationInput[]
    by: Service_categoriesScalarFieldEnum[] | Service_categoriesScalarFieldEnum
    having?: service_categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Service_categoriesCountAggregateInputType | true
    _min?: Service_categoriesMinAggregateInputType
    _max?: Service_categoriesMaxAggregateInputType
  }

  export type Service_categoriesGroupByOutputType = {
    id: string
    name: string
    meta_title: string | null
    meta_description: string | null
    meta_keywords: string | null
    is_deleted: boolean | null
    deleted_at: Date | null
    deleted_by: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
    icon: string | null
    slug: string | null
    _count: Service_categoriesCountAggregateOutputType | null
    _min: Service_categoriesMinAggregateOutputType | null
    _max: Service_categoriesMaxAggregateOutputType | null
  }

  type GetService_categoriesGroupByPayload<T extends service_categoriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Service_categoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Service_categoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Service_categoriesGroupByOutputType[P]>
            : GetScalarType<T[P], Service_categoriesGroupByOutputType[P]>
        }
      >
    >


  export type service_categoriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    meta_title?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    icon?: boolean
    slug?: boolean
    service_providers?: boolean | service_categories$service_providersArgs<ExtArgs>
    _count?: boolean | Service_categoriesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service_categories"]>

  export type service_categoriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    meta_title?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    icon?: boolean
    slug?: boolean
  }, ExtArgs["result"]["service_categories"]>

  export type service_categoriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    meta_title?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    icon?: boolean
    slug?: boolean
  }, ExtArgs["result"]["service_categories"]>

  export type service_categoriesSelectScalar = {
    id?: boolean
    name?: boolean
    meta_title?: boolean
    meta_description?: boolean
    meta_keywords?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    icon?: boolean
    slug?: boolean
  }

  export type service_categoriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "meta_title" | "meta_description" | "meta_keywords" | "is_deleted" | "deleted_at" | "deleted_by" | "created_at" | "created_by" | "updated_at" | "updated_by" | "icon" | "slug", ExtArgs["result"]["service_categories"]>
  export type service_categoriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_providers?: boolean | service_categories$service_providersArgs<ExtArgs>
    _count?: boolean | Service_categoriesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type service_categoriesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type service_categoriesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $service_categoriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "service_categories"
    objects: {
      service_providers: Prisma.$service_providersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      meta_title: string | null
      meta_description: string | null
      meta_keywords: string | null
      is_deleted: boolean | null
      deleted_at: Date | null
      deleted_by: string | null
      created_at: Date | null
      created_by: string | null
      updated_at: Date | null
      updated_by: string | null
      icon: string | null
      slug: string | null
    }, ExtArgs["result"]["service_categories"]>
    composites: {}
  }

  type service_categoriesGetPayload<S extends boolean | null | undefined | service_categoriesDefaultArgs> = $Result.GetResult<Prisma.$service_categoriesPayload, S>

  type service_categoriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<service_categoriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Service_categoriesCountAggregateInputType | true
    }

  export interface service_categoriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['service_categories'], meta: { name: 'service_categories' } }
    /**
     * Find zero or one Service_categories that matches the filter.
     * @param {service_categoriesFindUniqueArgs} args - Arguments to find a Service_categories
     * @example
     * // Get one Service_categories
     * const service_categories = await prisma.service_categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends service_categoriesFindUniqueArgs>(args: SelectSubset<T, service_categoriesFindUniqueArgs<ExtArgs>>): Prisma__service_categoriesClient<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service_categories that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {service_categoriesFindUniqueOrThrowArgs} args - Arguments to find a Service_categories
     * @example
     * // Get one Service_categories
     * const service_categories = await prisma.service_categories.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends service_categoriesFindUniqueOrThrowArgs>(args: SelectSubset<T, service_categoriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__service_categoriesClient<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_categoriesFindFirstArgs} args - Arguments to find a Service_categories
     * @example
     * // Get one Service_categories
     * const service_categories = await prisma.service_categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends service_categoriesFindFirstArgs>(args?: SelectSubset<T, service_categoriesFindFirstArgs<ExtArgs>>): Prisma__service_categoriesClient<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service_categories that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_categoriesFindFirstOrThrowArgs} args - Arguments to find a Service_categories
     * @example
     * // Get one Service_categories
     * const service_categories = await prisma.service_categories.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends service_categoriesFindFirstOrThrowArgs>(args?: SelectSubset<T, service_categoriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__service_categoriesClient<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Service_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_categoriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Service_categories
     * const service_categories = await prisma.service_categories.findMany()
     * 
     * // Get first 10 Service_categories
     * const service_categories = await prisma.service_categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const service_categoriesWithIdOnly = await prisma.service_categories.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends service_categoriesFindManyArgs>(args?: SelectSubset<T, service_categoriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service_categories.
     * @param {service_categoriesCreateArgs} args - Arguments to create a Service_categories.
     * @example
     * // Create one Service_categories
     * const Service_categories = await prisma.service_categories.create({
     *   data: {
     *     // ... data to create a Service_categories
     *   }
     * })
     * 
     */
    create<T extends service_categoriesCreateArgs>(args: SelectSubset<T, service_categoriesCreateArgs<ExtArgs>>): Prisma__service_categoriesClient<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Service_categories.
     * @param {service_categoriesCreateManyArgs} args - Arguments to create many Service_categories.
     * @example
     * // Create many Service_categories
     * const service_categories = await prisma.service_categories.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends service_categoriesCreateManyArgs>(args?: SelectSubset<T, service_categoriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Service_categories and returns the data saved in the database.
     * @param {service_categoriesCreateManyAndReturnArgs} args - Arguments to create many Service_categories.
     * @example
     * // Create many Service_categories
     * const service_categories = await prisma.service_categories.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Service_categories and only return the `id`
     * const service_categoriesWithIdOnly = await prisma.service_categories.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends service_categoriesCreateManyAndReturnArgs>(args?: SelectSubset<T, service_categoriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service_categories.
     * @param {service_categoriesDeleteArgs} args - Arguments to delete one Service_categories.
     * @example
     * // Delete one Service_categories
     * const Service_categories = await prisma.service_categories.delete({
     *   where: {
     *     // ... filter to delete one Service_categories
     *   }
     * })
     * 
     */
    delete<T extends service_categoriesDeleteArgs>(args: SelectSubset<T, service_categoriesDeleteArgs<ExtArgs>>): Prisma__service_categoriesClient<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service_categories.
     * @param {service_categoriesUpdateArgs} args - Arguments to update one Service_categories.
     * @example
     * // Update one Service_categories
     * const service_categories = await prisma.service_categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends service_categoriesUpdateArgs>(args: SelectSubset<T, service_categoriesUpdateArgs<ExtArgs>>): Prisma__service_categoriesClient<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Service_categories.
     * @param {service_categoriesDeleteManyArgs} args - Arguments to filter Service_categories to delete.
     * @example
     * // Delete a few Service_categories
     * const { count } = await prisma.service_categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends service_categoriesDeleteManyArgs>(args?: SelectSubset<T, service_categoriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Service_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Service_categories
     * const service_categories = await prisma.service_categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends service_categoriesUpdateManyArgs>(args: SelectSubset<T, service_categoriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Service_categories and returns the data updated in the database.
     * @param {service_categoriesUpdateManyAndReturnArgs} args - Arguments to update many Service_categories.
     * @example
     * // Update many Service_categories
     * const service_categories = await prisma.service_categories.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Service_categories and only return the `id`
     * const service_categoriesWithIdOnly = await prisma.service_categories.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends service_categoriesUpdateManyAndReturnArgs>(args: SelectSubset<T, service_categoriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service_categories.
     * @param {service_categoriesUpsertArgs} args - Arguments to update or create a Service_categories.
     * @example
     * // Update or create a Service_categories
     * const service_categories = await prisma.service_categories.upsert({
     *   create: {
     *     // ... data to create a Service_categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service_categories we want to update
     *   }
     * })
     */
    upsert<T extends service_categoriesUpsertArgs>(args: SelectSubset<T, service_categoriesUpsertArgs<ExtArgs>>): Prisma__service_categoriesClient<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Service_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_categoriesCountArgs} args - Arguments to filter Service_categories to count.
     * @example
     * // Count the number of Service_categories
     * const count = await prisma.service_categories.count({
     *   where: {
     *     // ... the filter for the Service_categories we want to count
     *   }
     * })
    **/
    count<T extends service_categoriesCountArgs>(
      args?: Subset<T, service_categoriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Service_categoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Service_categoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Service_categoriesAggregateArgs>(args: Subset<T, Service_categoriesAggregateArgs>): Prisma.PrismaPromise<GetService_categoriesAggregateType<T>>

    /**
     * Group by Service_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_categoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends service_categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: service_categoriesGroupByArgs['orderBy'] }
        : { orderBy?: service_categoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, service_categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetService_categoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the service_categories model
   */
  readonly fields: service_categoriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for service_categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__service_categoriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service_providers<T extends service_categories$service_providersArgs<ExtArgs> = {}>(args?: Subset<T, service_categories$service_providersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the service_categories model
   */
  interface service_categoriesFieldRefs {
    readonly id: FieldRef<"service_categories", 'String'>
    readonly name: FieldRef<"service_categories", 'String'>
    readonly meta_title: FieldRef<"service_categories", 'String'>
    readonly meta_description: FieldRef<"service_categories", 'String'>
    readonly meta_keywords: FieldRef<"service_categories", 'String'>
    readonly is_deleted: FieldRef<"service_categories", 'Boolean'>
    readonly deleted_at: FieldRef<"service_categories", 'DateTime'>
    readonly deleted_by: FieldRef<"service_categories", 'String'>
    readonly created_at: FieldRef<"service_categories", 'DateTime'>
    readonly created_by: FieldRef<"service_categories", 'String'>
    readonly updated_at: FieldRef<"service_categories", 'DateTime'>
    readonly updated_by: FieldRef<"service_categories", 'String'>
    readonly icon: FieldRef<"service_categories", 'String'>
    readonly slug: FieldRef<"service_categories", 'String'>
  }
    

  // Custom InputTypes
  /**
   * service_categories findUnique
   */
  export type service_categoriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which service_categories to fetch.
     */
    where: service_categoriesWhereUniqueInput
  }

  /**
   * service_categories findUniqueOrThrow
   */
  export type service_categoriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which service_categories to fetch.
     */
    where: service_categoriesWhereUniqueInput
  }

  /**
   * service_categories findFirst
   */
  export type service_categoriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which service_categories to fetch.
     */
    where?: service_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_categories to fetch.
     */
    orderBy?: service_categoriesOrderByWithRelationInput | service_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for service_categories.
     */
    cursor?: service_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of service_categories.
     */
    distinct?: Service_categoriesScalarFieldEnum | Service_categoriesScalarFieldEnum[]
  }

  /**
   * service_categories findFirstOrThrow
   */
  export type service_categoriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which service_categories to fetch.
     */
    where?: service_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_categories to fetch.
     */
    orderBy?: service_categoriesOrderByWithRelationInput | service_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for service_categories.
     */
    cursor?: service_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of service_categories.
     */
    distinct?: Service_categoriesScalarFieldEnum | Service_categoriesScalarFieldEnum[]
  }

  /**
   * service_categories findMany
   */
  export type service_categoriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which service_categories to fetch.
     */
    where?: service_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_categories to fetch.
     */
    orderBy?: service_categoriesOrderByWithRelationInput | service_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing service_categories.
     */
    cursor?: service_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_categories.
     */
    skip?: number
    distinct?: Service_categoriesScalarFieldEnum | Service_categoriesScalarFieldEnum[]
  }

  /**
   * service_categories create
   */
  export type service_categoriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
    /**
     * The data needed to create a service_categories.
     */
    data: XOR<service_categoriesCreateInput, service_categoriesUncheckedCreateInput>
  }

  /**
   * service_categories createMany
   */
  export type service_categoriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many service_categories.
     */
    data: service_categoriesCreateManyInput | service_categoriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * service_categories createManyAndReturn
   */
  export type service_categoriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * The data used to create many service_categories.
     */
    data: service_categoriesCreateManyInput | service_categoriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * service_categories update
   */
  export type service_categoriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
    /**
     * The data needed to update a service_categories.
     */
    data: XOR<service_categoriesUpdateInput, service_categoriesUncheckedUpdateInput>
    /**
     * Choose, which service_categories to update.
     */
    where: service_categoriesWhereUniqueInput
  }

  /**
   * service_categories updateMany
   */
  export type service_categoriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update service_categories.
     */
    data: XOR<service_categoriesUpdateManyMutationInput, service_categoriesUncheckedUpdateManyInput>
    /**
     * Filter which service_categories to update
     */
    where?: service_categoriesWhereInput
    /**
     * Limit how many service_categories to update.
     */
    limit?: number
  }

  /**
   * service_categories updateManyAndReturn
   */
  export type service_categoriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * The data used to update service_categories.
     */
    data: XOR<service_categoriesUpdateManyMutationInput, service_categoriesUncheckedUpdateManyInput>
    /**
     * Filter which service_categories to update
     */
    where?: service_categoriesWhereInput
    /**
     * Limit how many service_categories to update.
     */
    limit?: number
  }

  /**
   * service_categories upsert
   */
  export type service_categoriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
    /**
     * The filter to search for the service_categories to update in case it exists.
     */
    where: service_categoriesWhereUniqueInput
    /**
     * In case the service_categories found by the `where` argument doesn't exist, create a new service_categories with this data.
     */
    create: XOR<service_categoriesCreateInput, service_categoriesUncheckedCreateInput>
    /**
     * In case the service_categories was found with the provided `where` argument, update it with this data.
     */
    update: XOR<service_categoriesUpdateInput, service_categoriesUncheckedUpdateInput>
  }

  /**
   * service_categories delete
   */
  export type service_categoriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
    /**
     * Filter which service_categories to delete.
     */
    where: service_categoriesWhereUniqueInput
  }

  /**
   * service_categories deleteMany
   */
  export type service_categoriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which service_categories to delete
     */
    where?: service_categoriesWhereInput
    /**
     * Limit how many service_categories to delete.
     */
    limit?: number
  }

  /**
   * service_categories.service_providers
   */
  export type service_categories$service_providersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    where?: service_providersWhereInput
    orderBy?: service_providersOrderByWithRelationInput | service_providersOrderByWithRelationInput[]
    cursor?: service_providersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Service_providersScalarFieldEnum | Service_providersScalarFieldEnum[]
  }

  /**
   * service_categories without action
   */
  export type service_categoriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
  }


  /**
   * Model service_providers
   */

  export type AggregateService_providers = {
    _count: Service_providersCountAggregateOutputType | null
    _avg: Service_providersAvgAggregateOutputType | null
    _sum: Service_providersSumAggregateOutputType | null
    _min: Service_providersMinAggregateOutputType | null
    _max: Service_providersMaxAggregateOutputType | null
  }

  export type Service_providersAvgAggregateOutputType = {
    years_of_experience: number | null
  }

  export type Service_providersSumAggregateOutputType = {
    years_of_experience: number | null
  }

  export type Service_providersMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    years_of_experience: number | null
    service_name: string | null
    governorate_id: string | null
    service_category_id: string | null
    service_delivery_method: $Enums.service_delivery_method | null
    service_description: string | null
    bio: string | null
    facebook_url: string | null
    instagram_url: string | null
    whatsapp_url: string | null
    other_urls: string | null
    logo_image: string | null
    id_card_front_image: string | null
    id_card_back_image: string | null
    certificates_images: string | null
    document_list: string | null
    video_url: string | null
    keywords: string | null
    notes: string | null
    status: $Enums.service_provider_status | null
    is_deleted: boolean | null
    deleted_at: Date | null
    deleted_by: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
    slug: string | null
    address: string | null
    official_url: string | null
    services: string | null
  }

  export type Service_providersMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    years_of_experience: number | null
    service_name: string | null
    governorate_id: string | null
    service_category_id: string | null
    service_delivery_method: $Enums.service_delivery_method | null
    service_description: string | null
    bio: string | null
    facebook_url: string | null
    instagram_url: string | null
    whatsapp_url: string | null
    other_urls: string | null
    logo_image: string | null
    id_card_front_image: string | null
    id_card_back_image: string | null
    certificates_images: string | null
    document_list: string | null
    video_url: string | null
    keywords: string | null
    notes: string | null
    status: $Enums.service_provider_status | null
    is_deleted: boolean | null
    deleted_at: Date | null
    deleted_by: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
    slug: string | null
    address: string | null
    official_url: string | null
    services: string | null
  }

  export type Service_providersCountAggregateOutputType = {
    id: number
    user_id: number
    years_of_experience: number
    service_name: number
    governorate_id: number
    service_category_id: number
    service_delivery_method: number
    service_description: number
    bio: number
    facebook_url: number
    instagram_url: number
    whatsapp_url: number
    other_urls: number
    logo_image: number
    id_card_front_image: number
    id_card_back_image: number
    certificates_images: number
    document_list: number
    video_url: number
    keywords: number
    notes: number
    status: number
    is_deleted: number
    deleted_at: number
    deleted_by: number
    created_at: number
    created_by: number
    updated_at: number
    updated_by: number
    slug: number
    address: number
    official_url: number
    services: number
    _all: number
  }


  export type Service_providersAvgAggregateInputType = {
    years_of_experience?: true
  }

  export type Service_providersSumAggregateInputType = {
    years_of_experience?: true
  }

  export type Service_providersMinAggregateInputType = {
    id?: true
    user_id?: true
    years_of_experience?: true
    service_name?: true
    governorate_id?: true
    service_category_id?: true
    service_delivery_method?: true
    service_description?: true
    bio?: true
    facebook_url?: true
    instagram_url?: true
    whatsapp_url?: true
    other_urls?: true
    logo_image?: true
    id_card_front_image?: true
    id_card_back_image?: true
    certificates_images?: true
    document_list?: true
    video_url?: true
    keywords?: true
    notes?: true
    status?: true
    is_deleted?: true
    deleted_at?: true
    deleted_by?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    slug?: true
    address?: true
    official_url?: true
    services?: true
  }

  export type Service_providersMaxAggregateInputType = {
    id?: true
    user_id?: true
    years_of_experience?: true
    service_name?: true
    governorate_id?: true
    service_category_id?: true
    service_delivery_method?: true
    service_description?: true
    bio?: true
    facebook_url?: true
    instagram_url?: true
    whatsapp_url?: true
    other_urls?: true
    logo_image?: true
    id_card_front_image?: true
    id_card_back_image?: true
    certificates_images?: true
    document_list?: true
    video_url?: true
    keywords?: true
    notes?: true
    status?: true
    is_deleted?: true
    deleted_at?: true
    deleted_by?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    slug?: true
    address?: true
    official_url?: true
    services?: true
  }

  export type Service_providersCountAggregateInputType = {
    id?: true
    user_id?: true
    years_of_experience?: true
    service_name?: true
    governorate_id?: true
    service_category_id?: true
    service_delivery_method?: true
    service_description?: true
    bio?: true
    facebook_url?: true
    instagram_url?: true
    whatsapp_url?: true
    other_urls?: true
    logo_image?: true
    id_card_front_image?: true
    id_card_back_image?: true
    certificates_images?: true
    document_list?: true
    video_url?: true
    keywords?: true
    notes?: true
    status?: true
    is_deleted?: true
    deleted_at?: true
    deleted_by?: true
    created_at?: true
    created_by?: true
    updated_at?: true
    updated_by?: true
    slug?: true
    address?: true
    official_url?: true
    services?: true
    _all?: true
  }

  export type Service_providersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which service_providers to aggregate.
     */
    where?: service_providersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_providers to fetch.
     */
    orderBy?: service_providersOrderByWithRelationInput | service_providersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: service_providersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned service_providers
    **/
    _count?: true | Service_providersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Service_providersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Service_providersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Service_providersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Service_providersMaxAggregateInputType
  }

  export type GetService_providersAggregateType<T extends Service_providersAggregateArgs> = {
        [P in keyof T & keyof AggregateService_providers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService_providers[P]>
      : GetScalarType<T[P], AggregateService_providers[P]>
  }




  export type service_providersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: service_providersWhereInput
    orderBy?: service_providersOrderByWithAggregationInput | service_providersOrderByWithAggregationInput[]
    by: Service_providersScalarFieldEnum[] | Service_providersScalarFieldEnum
    having?: service_providersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Service_providersCountAggregateInputType | true
    _avg?: Service_providersAvgAggregateInputType
    _sum?: Service_providersSumAggregateInputType
    _min?: Service_providersMinAggregateInputType
    _max?: Service_providersMaxAggregateInputType
  }

  export type Service_providersGroupByOutputType = {
    id: string
    user_id: string | null
    years_of_experience: number | null
    service_name: string | null
    governorate_id: string | null
    service_category_id: string | null
    service_delivery_method: $Enums.service_delivery_method | null
    service_description: string | null
    bio: string | null
    facebook_url: string | null
    instagram_url: string | null
    whatsapp_url: string | null
    other_urls: string | null
    logo_image: string | null
    id_card_front_image: string | null
    id_card_back_image: string | null
    certificates_images: string | null
    document_list: string | null
    video_url: string | null
    keywords: string | null
    notes: string | null
    status: $Enums.service_provider_status
    is_deleted: boolean | null
    deleted_at: Date | null
    deleted_by: string | null
    created_at: Date | null
    created_by: string | null
    updated_at: Date | null
    updated_by: string | null
    slug: string | null
    address: string | null
    official_url: string | null
    services: string | null
    _count: Service_providersCountAggregateOutputType | null
    _avg: Service_providersAvgAggregateOutputType | null
    _sum: Service_providersSumAggregateOutputType | null
    _min: Service_providersMinAggregateOutputType | null
    _max: Service_providersMaxAggregateOutputType | null
  }

  type GetService_providersGroupByPayload<T extends service_providersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Service_providersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Service_providersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Service_providersGroupByOutputType[P]>
            : GetScalarType<T[P], Service_providersGroupByOutputType[P]>
        }
      >
    >


  export type service_providersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    years_of_experience?: boolean
    service_name?: boolean
    governorate_id?: boolean
    service_category_id?: boolean
    service_delivery_method?: boolean
    service_description?: boolean
    bio?: boolean
    facebook_url?: boolean
    instagram_url?: boolean
    whatsapp_url?: boolean
    other_urls?: boolean
    logo_image?: boolean
    id_card_front_image?: boolean
    id_card_back_image?: boolean
    certificates_images?: boolean
    document_list?: boolean
    video_url?: boolean
    keywords?: boolean
    notes?: boolean
    status?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    slug?: boolean
    address?: boolean
    official_url?: boolean
    services?: boolean
    governorates?: boolean | service_providers$governoratesArgs<ExtArgs>
    service_categories?: boolean | service_providers$service_categoriesArgs<ExtArgs>
    users?: boolean | service_providers$usersArgs<ExtArgs>
  }, ExtArgs["result"]["service_providers"]>

  export type service_providersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    years_of_experience?: boolean
    service_name?: boolean
    governorate_id?: boolean
    service_category_id?: boolean
    service_delivery_method?: boolean
    service_description?: boolean
    bio?: boolean
    facebook_url?: boolean
    instagram_url?: boolean
    whatsapp_url?: boolean
    other_urls?: boolean
    logo_image?: boolean
    id_card_front_image?: boolean
    id_card_back_image?: boolean
    certificates_images?: boolean
    document_list?: boolean
    video_url?: boolean
    keywords?: boolean
    notes?: boolean
    status?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    slug?: boolean
    address?: boolean
    official_url?: boolean
    services?: boolean
    governorates?: boolean | service_providers$governoratesArgs<ExtArgs>
    service_categories?: boolean | service_providers$service_categoriesArgs<ExtArgs>
    users?: boolean | service_providers$usersArgs<ExtArgs>
  }, ExtArgs["result"]["service_providers"]>

  export type service_providersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    years_of_experience?: boolean
    service_name?: boolean
    governorate_id?: boolean
    service_category_id?: boolean
    service_delivery_method?: boolean
    service_description?: boolean
    bio?: boolean
    facebook_url?: boolean
    instagram_url?: boolean
    whatsapp_url?: boolean
    other_urls?: boolean
    logo_image?: boolean
    id_card_front_image?: boolean
    id_card_back_image?: boolean
    certificates_images?: boolean
    document_list?: boolean
    video_url?: boolean
    keywords?: boolean
    notes?: boolean
    status?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    slug?: boolean
    address?: boolean
    official_url?: boolean
    services?: boolean
    governorates?: boolean | service_providers$governoratesArgs<ExtArgs>
    service_categories?: boolean | service_providers$service_categoriesArgs<ExtArgs>
    users?: boolean | service_providers$usersArgs<ExtArgs>
  }, ExtArgs["result"]["service_providers"]>

  export type service_providersSelectScalar = {
    id?: boolean
    user_id?: boolean
    years_of_experience?: boolean
    service_name?: boolean
    governorate_id?: boolean
    service_category_id?: boolean
    service_delivery_method?: boolean
    service_description?: boolean
    bio?: boolean
    facebook_url?: boolean
    instagram_url?: boolean
    whatsapp_url?: boolean
    other_urls?: boolean
    logo_image?: boolean
    id_card_front_image?: boolean
    id_card_back_image?: boolean
    certificates_images?: boolean
    document_list?: boolean
    video_url?: boolean
    keywords?: boolean
    notes?: boolean
    status?: boolean
    is_deleted?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_at?: boolean
    updated_by?: boolean
    slug?: boolean
    address?: boolean
    official_url?: boolean
    services?: boolean
  }

  export type service_providersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "years_of_experience" | "service_name" | "governorate_id" | "service_category_id" | "service_delivery_method" | "service_description" | "bio" | "facebook_url" | "instagram_url" | "whatsapp_url" | "other_urls" | "logo_image" | "id_card_front_image" | "id_card_back_image" | "certificates_images" | "document_list" | "video_url" | "keywords" | "notes" | "status" | "is_deleted" | "deleted_at" | "deleted_by" | "created_at" | "created_by" | "updated_at" | "updated_by" | "slug" | "address" | "official_url" | "services", ExtArgs["result"]["service_providers"]>
  export type service_providersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    governorates?: boolean | service_providers$governoratesArgs<ExtArgs>
    service_categories?: boolean | service_providers$service_categoriesArgs<ExtArgs>
    users?: boolean | service_providers$usersArgs<ExtArgs>
  }
  export type service_providersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    governorates?: boolean | service_providers$governoratesArgs<ExtArgs>
    service_categories?: boolean | service_providers$service_categoriesArgs<ExtArgs>
    users?: boolean | service_providers$usersArgs<ExtArgs>
  }
  export type service_providersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    governorates?: boolean | service_providers$governoratesArgs<ExtArgs>
    service_categories?: boolean | service_providers$service_categoriesArgs<ExtArgs>
    users?: boolean | service_providers$usersArgs<ExtArgs>
  }

  export type $service_providersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "service_providers"
    objects: {
      governorates: Prisma.$governoratesPayload<ExtArgs> | null
      service_categories: Prisma.$service_categoriesPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string | null
      years_of_experience: number | null
      service_name: string | null
      governorate_id: string | null
      service_category_id: string | null
      service_delivery_method: $Enums.service_delivery_method | null
      service_description: string | null
      bio: string | null
      facebook_url: string | null
      instagram_url: string | null
      whatsapp_url: string | null
      other_urls: string | null
      logo_image: string | null
      id_card_front_image: string | null
      id_card_back_image: string | null
      certificates_images: string | null
      document_list: string | null
      video_url: string | null
      keywords: string | null
      notes: string | null
      status: $Enums.service_provider_status
      is_deleted: boolean | null
      deleted_at: Date | null
      deleted_by: string | null
      created_at: Date | null
      created_by: string | null
      updated_at: Date | null
      updated_by: string | null
      slug: string | null
      address: string | null
      official_url: string | null
      services: string | null
    }, ExtArgs["result"]["service_providers"]>
    composites: {}
  }

  type service_providersGetPayload<S extends boolean | null | undefined | service_providersDefaultArgs> = $Result.GetResult<Prisma.$service_providersPayload, S>

  type service_providersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<service_providersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Service_providersCountAggregateInputType | true
    }

  export interface service_providersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['service_providers'], meta: { name: 'service_providers' } }
    /**
     * Find zero or one Service_providers that matches the filter.
     * @param {service_providersFindUniqueArgs} args - Arguments to find a Service_providers
     * @example
     * // Get one Service_providers
     * const service_providers = await prisma.service_providers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends service_providersFindUniqueArgs>(args: SelectSubset<T, service_providersFindUniqueArgs<ExtArgs>>): Prisma__service_providersClient<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service_providers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {service_providersFindUniqueOrThrowArgs} args - Arguments to find a Service_providers
     * @example
     * // Get one Service_providers
     * const service_providers = await prisma.service_providers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends service_providersFindUniqueOrThrowArgs>(args: SelectSubset<T, service_providersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__service_providersClient<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service_providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_providersFindFirstArgs} args - Arguments to find a Service_providers
     * @example
     * // Get one Service_providers
     * const service_providers = await prisma.service_providers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends service_providersFindFirstArgs>(args?: SelectSubset<T, service_providersFindFirstArgs<ExtArgs>>): Prisma__service_providersClient<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service_providers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_providersFindFirstOrThrowArgs} args - Arguments to find a Service_providers
     * @example
     * // Get one Service_providers
     * const service_providers = await prisma.service_providers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends service_providersFindFirstOrThrowArgs>(args?: SelectSubset<T, service_providersFindFirstOrThrowArgs<ExtArgs>>): Prisma__service_providersClient<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Service_providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_providersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Service_providers
     * const service_providers = await prisma.service_providers.findMany()
     * 
     * // Get first 10 Service_providers
     * const service_providers = await prisma.service_providers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const service_providersWithIdOnly = await prisma.service_providers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends service_providersFindManyArgs>(args?: SelectSubset<T, service_providersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service_providers.
     * @param {service_providersCreateArgs} args - Arguments to create a Service_providers.
     * @example
     * // Create one Service_providers
     * const Service_providers = await prisma.service_providers.create({
     *   data: {
     *     // ... data to create a Service_providers
     *   }
     * })
     * 
     */
    create<T extends service_providersCreateArgs>(args: SelectSubset<T, service_providersCreateArgs<ExtArgs>>): Prisma__service_providersClient<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Service_providers.
     * @param {service_providersCreateManyArgs} args - Arguments to create many Service_providers.
     * @example
     * // Create many Service_providers
     * const service_providers = await prisma.service_providers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends service_providersCreateManyArgs>(args?: SelectSubset<T, service_providersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Service_providers and returns the data saved in the database.
     * @param {service_providersCreateManyAndReturnArgs} args - Arguments to create many Service_providers.
     * @example
     * // Create many Service_providers
     * const service_providers = await prisma.service_providers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Service_providers and only return the `id`
     * const service_providersWithIdOnly = await prisma.service_providers.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends service_providersCreateManyAndReturnArgs>(args?: SelectSubset<T, service_providersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service_providers.
     * @param {service_providersDeleteArgs} args - Arguments to delete one Service_providers.
     * @example
     * // Delete one Service_providers
     * const Service_providers = await prisma.service_providers.delete({
     *   where: {
     *     // ... filter to delete one Service_providers
     *   }
     * })
     * 
     */
    delete<T extends service_providersDeleteArgs>(args: SelectSubset<T, service_providersDeleteArgs<ExtArgs>>): Prisma__service_providersClient<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service_providers.
     * @param {service_providersUpdateArgs} args - Arguments to update one Service_providers.
     * @example
     * // Update one Service_providers
     * const service_providers = await prisma.service_providers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends service_providersUpdateArgs>(args: SelectSubset<T, service_providersUpdateArgs<ExtArgs>>): Prisma__service_providersClient<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Service_providers.
     * @param {service_providersDeleteManyArgs} args - Arguments to filter Service_providers to delete.
     * @example
     * // Delete a few Service_providers
     * const { count } = await prisma.service_providers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends service_providersDeleteManyArgs>(args?: SelectSubset<T, service_providersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Service_providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_providersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Service_providers
     * const service_providers = await prisma.service_providers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends service_providersUpdateManyArgs>(args: SelectSubset<T, service_providersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Service_providers and returns the data updated in the database.
     * @param {service_providersUpdateManyAndReturnArgs} args - Arguments to update many Service_providers.
     * @example
     * // Update many Service_providers
     * const service_providers = await prisma.service_providers.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Service_providers and only return the `id`
     * const service_providersWithIdOnly = await prisma.service_providers.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends service_providersUpdateManyAndReturnArgs>(args: SelectSubset<T, service_providersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service_providers.
     * @param {service_providersUpsertArgs} args - Arguments to update or create a Service_providers.
     * @example
     * // Update or create a Service_providers
     * const service_providers = await prisma.service_providers.upsert({
     *   create: {
     *     // ... data to create a Service_providers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service_providers we want to update
     *   }
     * })
     */
    upsert<T extends service_providersUpsertArgs>(args: SelectSubset<T, service_providersUpsertArgs<ExtArgs>>): Prisma__service_providersClient<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Service_providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_providersCountArgs} args - Arguments to filter Service_providers to count.
     * @example
     * // Count the number of Service_providers
     * const count = await prisma.service_providers.count({
     *   where: {
     *     // ... the filter for the Service_providers we want to count
     *   }
     * })
    **/
    count<T extends service_providersCountArgs>(
      args?: Subset<T, service_providersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Service_providersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service_providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Service_providersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Service_providersAggregateArgs>(args: Subset<T, Service_providersAggregateArgs>): Prisma.PrismaPromise<GetService_providersAggregateType<T>>

    /**
     * Group by Service_providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {service_providersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends service_providersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: service_providersGroupByArgs['orderBy'] }
        : { orderBy?: service_providersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, service_providersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetService_providersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the service_providers model
   */
  readonly fields: service_providersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for service_providers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__service_providersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    governorates<T extends service_providers$governoratesArgs<ExtArgs> = {}>(args?: Subset<T, service_providers$governoratesArgs<ExtArgs>>): Prisma__governoratesClient<$Result.GetResult<Prisma.$governoratesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    service_categories<T extends service_providers$service_categoriesArgs<ExtArgs> = {}>(args?: Subset<T, service_providers$service_categoriesArgs<ExtArgs>>): Prisma__service_categoriesClient<$Result.GetResult<Prisma.$service_categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends service_providers$usersArgs<ExtArgs> = {}>(args?: Subset<T, service_providers$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the service_providers model
   */
  interface service_providersFieldRefs {
    readonly id: FieldRef<"service_providers", 'String'>
    readonly user_id: FieldRef<"service_providers", 'String'>
    readonly years_of_experience: FieldRef<"service_providers", 'Int'>
    readonly service_name: FieldRef<"service_providers", 'String'>
    readonly governorate_id: FieldRef<"service_providers", 'String'>
    readonly service_category_id: FieldRef<"service_providers", 'String'>
    readonly service_delivery_method: FieldRef<"service_providers", 'service_delivery_method'>
    readonly service_description: FieldRef<"service_providers", 'String'>
    readonly bio: FieldRef<"service_providers", 'String'>
    readonly facebook_url: FieldRef<"service_providers", 'String'>
    readonly instagram_url: FieldRef<"service_providers", 'String'>
    readonly whatsapp_url: FieldRef<"service_providers", 'String'>
    readonly other_urls: FieldRef<"service_providers", 'String'>
    readonly logo_image: FieldRef<"service_providers", 'String'>
    readonly id_card_front_image: FieldRef<"service_providers", 'String'>
    readonly id_card_back_image: FieldRef<"service_providers", 'String'>
    readonly certificates_images: FieldRef<"service_providers", 'String'>
    readonly document_list: FieldRef<"service_providers", 'String'>
    readonly video_url: FieldRef<"service_providers", 'String'>
    readonly keywords: FieldRef<"service_providers", 'String'>
    readonly notes: FieldRef<"service_providers", 'String'>
    readonly status: FieldRef<"service_providers", 'service_provider_status'>
    readonly is_deleted: FieldRef<"service_providers", 'Boolean'>
    readonly deleted_at: FieldRef<"service_providers", 'DateTime'>
    readonly deleted_by: FieldRef<"service_providers", 'String'>
    readonly created_at: FieldRef<"service_providers", 'DateTime'>
    readonly created_by: FieldRef<"service_providers", 'String'>
    readonly updated_at: FieldRef<"service_providers", 'DateTime'>
    readonly updated_by: FieldRef<"service_providers", 'String'>
    readonly slug: FieldRef<"service_providers", 'String'>
    readonly address: FieldRef<"service_providers", 'String'>
    readonly official_url: FieldRef<"service_providers", 'String'>
    readonly services: FieldRef<"service_providers", 'String'>
  }
    

  // Custom InputTypes
  /**
   * service_providers findUnique
   */
  export type service_providersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    /**
     * Filter, which service_providers to fetch.
     */
    where: service_providersWhereUniqueInput
  }

  /**
   * service_providers findUniqueOrThrow
   */
  export type service_providersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    /**
     * Filter, which service_providers to fetch.
     */
    where: service_providersWhereUniqueInput
  }

  /**
   * service_providers findFirst
   */
  export type service_providersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    /**
     * Filter, which service_providers to fetch.
     */
    where?: service_providersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_providers to fetch.
     */
    orderBy?: service_providersOrderByWithRelationInput | service_providersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for service_providers.
     */
    cursor?: service_providersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of service_providers.
     */
    distinct?: Service_providersScalarFieldEnum | Service_providersScalarFieldEnum[]
  }

  /**
   * service_providers findFirstOrThrow
   */
  export type service_providersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    /**
     * Filter, which service_providers to fetch.
     */
    where?: service_providersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_providers to fetch.
     */
    orderBy?: service_providersOrderByWithRelationInput | service_providersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for service_providers.
     */
    cursor?: service_providersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of service_providers.
     */
    distinct?: Service_providersScalarFieldEnum | Service_providersScalarFieldEnum[]
  }

  /**
   * service_providers findMany
   */
  export type service_providersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    /**
     * Filter, which service_providers to fetch.
     */
    where?: service_providersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of service_providers to fetch.
     */
    orderBy?: service_providersOrderByWithRelationInput | service_providersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing service_providers.
     */
    cursor?: service_providersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` service_providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` service_providers.
     */
    skip?: number
    distinct?: Service_providersScalarFieldEnum | Service_providersScalarFieldEnum[]
  }

  /**
   * service_providers create
   */
  export type service_providersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    /**
     * The data needed to create a service_providers.
     */
    data?: XOR<service_providersCreateInput, service_providersUncheckedCreateInput>
  }

  /**
   * service_providers createMany
   */
  export type service_providersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many service_providers.
     */
    data: service_providersCreateManyInput | service_providersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * service_providers createManyAndReturn
   */
  export type service_providersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * The data used to create many service_providers.
     */
    data: service_providersCreateManyInput | service_providersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * service_providers update
   */
  export type service_providersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    /**
     * The data needed to update a service_providers.
     */
    data: XOR<service_providersUpdateInput, service_providersUncheckedUpdateInput>
    /**
     * Choose, which service_providers to update.
     */
    where: service_providersWhereUniqueInput
  }

  /**
   * service_providers updateMany
   */
  export type service_providersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update service_providers.
     */
    data: XOR<service_providersUpdateManyMutationInput, service_providersUncheckedUpdateManyInput>
    /**
     * Filter which service_providers to update
     */
    where?: service_providersWhereInput
    /**
     * Limit how many service_providers to update.
     */
    limit?: number
  }

  /**
   * service_providers updateManyAndReturn
   */
  export type service_providersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * The data used to update service_providers.
     */
    data: XOR<service_providersUpdateManyMutationInput, service_providersUncheckedUpdateManyInput>
    /**
     * Filter which service_providers to update
     */
    where?: service_providersWhereInput
    /**
     * Limit how many service_providers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * service_providers upsert
   */
  export type service_providersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    /**
     * The filter to search for the service_providers to update in case it exists.
     */
    where: service_providersWhereUniqueInput
    /**
     * In case the service_providers found by the `where` argument doesn't exist, create a new service_providers with this data.
     */
    create: XOR<service_providersCreateInput, service_providersUncheckedCreateInput>
    /**
     * In case the service_providers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<service_providersUpdateInput, service_providersUncheckedUpdateInput>
  }

  /**
   * service_providers delete
   */
  export type service_providersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    /**
     * Filter which service_providers to delete.
     */
    where: service_providersWhereUniqueInput
  }

  /**
   * service_providers deleteMany
   */
  export type service_providersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which service_providers to delete
     */
    where?: service_providersWhereInput
    /**
     * Limit how many service_providers to delete.
     */
    limit?: number
  }

  /**
   * service_providers.governorates
   */
  export type service_providers$governoratesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the governorates
     */
    select?: governoratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the governorates
     */
    omit?: governoratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: governoratesInclude<ExtArgs> | null
    where?: governoratesWhereInput
  }

  /**
   * service_providers.service_categories
   */
  export type service_providers$service_categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_categories
     */
    select?: service_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_categories
     */
    omit?: service_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_categoriesInclude<ExtArgs> | null
    where?: service_categoriesWhereInput
  }

  /**
   * service_providers.users
   */
  export type service_providers$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * service_providers without action
   */
  export type service_providersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    email: string | null
    first_name: string | null
    last_name: string | null
    avatar: string | null
    phone: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    is_deleted: boolean | null
    is_banned: boolean | null
    created_by: string | null
    updated_by: string | null
    deleted_by: string | null
    user_id: string | null
    is_admin: boolean | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    email: string | null
    first_name: string | null
    last_name: string | null
    avatar: string | null
    phone: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    is_deleted: boolean | null
    is_banned: boolean | null
    created_by: string | null
    updated_by: string | null
    deleted_by: string | null
    user_id: string | null
    is_admin: boolean | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    first_name: number
    last_name: number
    avatar: number
    phone: number
    created_at: number
    updated_at: number
    deleted_at: number
    is_deleted: number
    is_banned: number
    created_by: number
    updated_by: number
    deleted_by: number
    user_id: number
    is_admin: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    first_name?: true
    last_name?: true
    avatar?: true
    phone?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    is_deleted?: true
    is_banned?: true
    created_by?: true
    updated_by?: true
    deleted_by?: true
    user_id?: true
    is_admin?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    first_name?: true
    last_name?: true
    avatar?: true
    phone?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    is_deleted?: true
    is_banned?: true
    created_by?: true
    updated_by?: true
    deleted_by?: true
    user_id?: true
    is_admin?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    first_name?: true
    last_name?: true
    avatar?: true
    phone?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    is_deleted?: true
    is_banned?: true
    created_by?: true
    updated_by?: true
    deleted_by?: true
    user_id?: true
    is_admin?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    email: string
    first_name: string | null
    last_name: string | null
    avatar: string | null
    phone: string | null
    created_at: Date
    updated_at: Date | null
    deleted_at: Date | null
    is_deleted: boolean | null
    is_banned: boolean | null
    created_by: string | null
    updated_by: string | null
    deleted_by: string | null
    user_id: string | null
    is_admin: boolean | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    avatar?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    is_deleted?: boolean
    is_banned?: boolean
    created_by?: boolean
    updated_by?: boolean
    deleted_by?: boolean
    user_id?: boolean
    is_admin?: boolean
    service_providers?: boolean | users$service_providersArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    avatar?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    is_deleted?: boolean
    is_banned?: boolean
    created_by?: boolean
    updated_by?: boolean
    deleted_by?: boolean
    user_id?: boolean
    is_admin?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    avatar?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    is_deleted?: boolean
    is_banned?: boolean
    created_by?: boolean
    updated_by?: boolean
    deleted_by?: boolean
    user_id?: boolean
    is_admin?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    avatar?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    is_deleted?: boolean
    is_banned?: boolean
    created_by?: boolean
    updated_by?: boolean
    deleted_by?: boolean
    user_id?: boolean
    is_admin?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "first_name" | "last_name" | "avatar" | "phone" | "created_at" | "updated_at" | "deleted_at" | "is_deleted" | "is_banned" | "created_by" | "updated_by" | "deleted_by" | "user_id" | "is_admin", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service_providers?: boolean | users$service_providersArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      service_providers: Prisma.$service_providersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      first_name: string | null
      last_name: string | null
      avatar: string | null
      phone: string | null
      created_at: Date
      updated_at: Date | null
      deleted_at: Date | null
      is_deleted: boolean | null
      is_banned: boolean | null
      created_by: string | null
      updated_by: string | null
      deleted_by: string | null
      user_id: string | null
      is_admin: boolean | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service_providers<T extends users$service_providersArgs<ExtArgs> = {}>(args?: Subset<T, users$service_providersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$service_providersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly first_name: FieldRef<"users", 'String'>
    readonly last_name: FieldRef<"users", 'String'>
    readonly avatar: FieldRef<"users", 'String'>
    readonly phone: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
    readonly deleted_at: FieldRef<"users", 'DateTime'>
    readonly is_deleted: FieldRef<"users", 'Boolean'>
    readonly is_banned: FieldRef<"users", 'Boolean'>
    readonly created_by: FieldRef<"users", 'String'>
    readonly updated_by: FieldRef<"users", 'String'>
    readonly deleted_by: FieldRef<"users", 'String'>
    readonly user_id: FieldRef<"users", 'String'>
    readonly is_admin: FieldRef<"users", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.service_providers
   */
  export type users$service_providersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the service_providers
     */
    select?: service_providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the service_providers
     */
    omit?: service_providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: service_providersInclude<ExtArgs> | null
    where?: service_providersWhereInput
    orderBy?: service_providersOrderByWithRelationInput | service_providersOrderByWithRelationInput[]
    cursor?: service_providersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Service_providersScalarFieldEnum | Service_providersScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const GovernoratesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    governorate_code: 'governorate_code',
    meta_title: 'meta_title',
    meta_description: 'meta_description',
    meta_keywords: 'meta_keywords',
    is_deleted: 'is_deleted',
    deleted_at: 'deleted_at',
    deleted_by: 'deleted_by',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by'
  };

  export type GovernoratesScalarFieldEnum = (typeof GovernoratesScalarFieldEnum)[keyof typeof GovernoratesScalarFieldEnum]


  export const Service_categoriesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    meta_title: 'meta_title',
    meta_description: 'meta_description',
    meta_keywords: 'meta_keywords',
    is_deleted: 'is_deleted',
    deleted_at: 'deleted_at',
    deleted_by: 'deleted_by',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by',
    icon: 'icon',
    slug: 'slug'
  };

  export type Service_categoriesScalarFieldEnum = (typeof Service_categoriesScalarFieldEnum)[keyof typeof Service_categoriesScalarFieldEnum]


  export const Service_providersScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    years_of_experience: 'years_of_experience',
    service_name: 'service_name',
    governorate_id: 'governorate_id',
    service_category_id: 'service_category_id',
    service_delivery_method: 'service_delivery_method',
    service_description: 'service_description',
    bio: 'bio',
    facebook_url: 'facebook_url',
    instagram_url: 'instagram_url',
    whatsapp_url: 'whatsapp_url',
    other_urls: 'other_urls',
    logo_image: 'logo_image',
    id_card_front_image: 'id_card_front_image',
    id_card_back_image: 'id_card_back_image',
    certificates_images: 'certificates_images',
    document_list: 'document_list',
    video_url: 'video_url',
    keywords: 'keywords',
    notes: 'notes',
    status: 'status',
    is_deleted: 'is_deleted',
    deleted_at: 'deleted_at',
    deleted_by: 'deleted_by',
    created_at: 'created_at',
    created_by: 'created_by',
    updated_at: 'updated_at',
    updated_by: 'updated_by',
    slug: 'slug',
    address: 'address',
    official_url: 'official_url',
    services: 'services'
  };

  export type Service_providersScalarFieldEnum = (typeof Service_providersScalarFieldEnum)[keyof typeof Service_providersScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    avatar: 'avatar',
    phone: 'phone',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    is_deleted: 'is_deleted',
    is_banned: 'is_banned',
    created_by: 'created_by',
    updated_by: 'updated_by',
    deleted_by: 'deleted_by',
    user_id: 'user_id',
    is_admin: 'is_admin'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'service_delivery_method'
   */
  export type Enumservice_delivery_methodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'service_delivery_method'>
    


  /**
   * Reference to a field of type 'service_delivery_method[]'
   */
  export type ListEnumservice_delivery_methodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'service_delivery_method[]'>
    


  /**
   * Reference to a field of type 'service_provider_status'
   */
  export type Enumservice_provider_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'service_provider_status'>
    


  /**
   * Reference to a field of type 'service_provider_status[]'
   */
  export type ListEnumservice_provider_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'service_provider_status[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type governoratesWhereInput = {
    AND?: governoratesWhereInput | governoratesWhereInput[]
    OR?: governoratesWhereInput[]
    NOT?: governoratesWhereInput | governoratesWhereInput[]
    id?: UuidFilter<"governorates"> | string
    name?: StringFilter<"governorates"> | string
    governorate_code?: StringNullableFilter<"governorates"> | string | null
    meta_title?: StringNullableFilter<"governorates"> | string | null
    meta_description?: StringNullableFilter<"governorates"> | string | null
    meta_keywords?: StringNullableFilter<"governorates"> | string | null
    is_deleted?: BoolNullableFilter<"governorates"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"governorates"> | Date | string | null
    deleted_by?: StringNullableFilter<"governorates"> | string | null
    created_at?: DateTimeNullableFilter<"governorates"> | Date | string | null
    created_by?: StringNullableFilter<"governorates"> | string | null
    updated_at?: DateTimeNullableFilter<"governorates"> | Date | string | null
    updated_by?: StringNullableFilter<"governorates"> | string | null
    service_providers?: Service_providersListRelationFilter
  }

  export type governoratesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    governorate_code?: SortOrderInput | SortOrder
    meta_title?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    meta_keywords?: SortOrderInput | SortOrder
    is_deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    service_providers?: service_providersOrderByRelationAggregateInput
  }

  export type governoratesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    governorate_code?: string
    AND?: governoratesWhereInput | governoratesWhereInput[]
    OR?: governoratesWhereInput[]
    NOT?: governoratesWhereInput | governoratesWhereInput[]
    name?: StringFilter<"governorates"> | string
    meta_title?: StringNullableFilter<"governorates"> | string | null
    meta_description?: StringNullableFilter<"governorates"> | string | null
    meta_keywords?: StringNullableFilter<"governorates"> | string | null
    is_deleted?: BoolNullableFilter<"governorates"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"governorates"> | Date | string | null
    deleted_by?: StringNullableFilter<"governorates"> | string | null
    created_at?: DateTimeNullableFilter<"governorates"> | Date | string | null
    created_by?: StringNullableFilter<"governorates"> | string | null
    updated_at?: DateTimeNullableFilter<"governorates"> | Date | string | null
    updated_by?: StringNullableFilter<"governorates"> | string | null
    service_providers?: Service_providersListRelationFilter
  }, "id" | "governorate_code">

  export type governoratesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    governorate_code?: SortOrderInput | SortOrder
    meta_title?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    meta_keywords?: SortOrderInput | SortOrder
    is_deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    _count?: governoratesCountOrderByAggregateInput
    _max?: governoratesMaxOrderByAggregateInput
    _min?: governoratesMinOrderByAggregateInput
  }

  export type governoratesScalarWhereWithAggregatesInput = {
    AND?: governoratesScalarWhereWithAggregatesInput | governoratesScalarWhereWithAggregatesInput[]
    OR?: governoratesScalarWhereWithAggregatesInput[]
    NOT?: governoratesScalarWhereWithAggregatesInput | governoratesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"governorates"> | string
    name?: StringWithAggregatesFilter<"governorates"> | string
    governorate_code?: StringNullableWithAggregatesFilter<"governorates"> | string | null
    meta_title?: StringNullableWithAggregatesFilter<"governorates"> | string | null
    meta_description?: StringNullableWithAggregatesFilter<"governorates"> | string | null
    meta_keywords?: StringNullableWithAggregatesFilter<"governorates"> | string | null
    is_deleted?: BoolNullableWithAggregatesFilter<"governorates"> | boolean | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"governorates"> | Date | string | null
    deleted_by?: StringNullableWithAggregatesFilter<"governorates"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"governorates"> | Date | string | null
    created_by?: StringNullableWithAggregatesFilter<"governorates"> | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"governorates"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"governorates"> | string | null
  }

  export type service_categoriesWhereInput = {
    AND?: service_categoriesWhereInput | service_categoriesWhereInput[]
    OR?: service_categoriesWhereInput[]
    NOT?: service_categoriesWhereInput | service_categoriesWhereInput[]
    id?: UuidFilter<"service_categories"> | string
    name?: StringFilter<"service_categories"> | string
    meta_title?: StringNullableFilter<"service_categories"> | string | null
    meta_description?: StringNullableFilter<"service_categories"> | string | null
    meta_keywords?: StringNullableFilter<"service_categories"> | string | null
    is_deleted?: BoolNullableFilter<"service_categories"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"service_categories"> | Date | string | null
    deleted_by?: StringNullableFilter<"service_categories"> | string | null
    created_at?: DateTimeNullableFilter<"service_categories"> | Date | string | null
    created_by?: StringNullableFilter<"service_categories"> | string | null
    updated_at?: DateTimeNullableFilter<"service_categories"> | Date | string | null
    updated_by?: StringNullableFilter<"service_categories"> | string | null
    icon?: StringNullableFilter<"service_categories"> | string | null
    slug?: StringNullableFilter<"service_categories"> | string | null
    service_providers?: Service_providersListRelationFilter
  }

  export type service_categoriesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    meta_title?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    meta_keywords?: SortOrderInput | SortOrder
    is_deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    slug?: SortOrderInput | SortOrder
    service_providers?: service_providersOrderByRelationAggregateInput
  }

  export type service_categoriesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: service_categoriesWhereInput | service_categoriesWhereInput[]
    OR?: service_categoriesWhereInput[]
    NOT?: service_categoriesWhereInput | service_categoriesWhereInput[]
    name?: StringFilter<"service_categories"> | string
    meta_title?: StringNullableFilter<"service_categories"> | string | null
    meta_description?: StringNullableFilter<"service_categories"> | string | null
    meta_keywords?: StringNullableFilter<"service_categories"> | string | null
    is_deleted?: BoolNullableFilter<"service_categories"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"service_categories"> | Date | string | null
    deleted_by?: StringNullableFilter<"service_categories"> | string | null
    created_at?: DateTimeNullableFilter<"service_categories"> | Date | string | null
    created_by?: StringNullableFilter<"service_categories"> | string | null
    updated_at?: DateTimeNullableFilter<"service_categories"> | Date | string | null
    updated_by?: StringNullableFilter<"service_categories"> | string | null
    icon?: StringNullableFilter<"service_categories"> | string | null
    slug?: StringNullableFilter<"service_categories"> | string | null
    service_providers?: Service_providersListRelationFilter
  }, "id">

  export type service_categoriesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    meta_title?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    meta_keywords?: SortOrderInput | SortOrder
    is_deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    slug?: SortOrderInput | SortOrder
    _count?: service_categoriesCountOrderByAggregateInput
    _max?: service_categoriesMaxOrderByAggregateInput
    _min?: service_categoriesMinOrderByAggregateInput
  }

  export type service_categoriesScalarWhereWithAggregatesInput = {
    AND?: service_categoriesScalarWhereWithAggregatesInput | service_categoriesScalarWhereWithAggregatesInput[]
    OR?: service_categoriesScalarWhereWithAggregatesInput[]
    NOT?: service_categoriesScalarWhereWithAggregatesInput | service_categoriesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"service_categories"> | string
    name?: StringWithAggregatesFilter<"service_categories"> | string
    meta_title?: StringNullableWithAggregatesFilter<"service_categories"> | string | null
    meta_description?: StringNullableWithAggregatesFilter<"service_categories"> | string | null
    meta_keywords?: StringNullableWithAggregatesFilter<"service_categories"> | string | null
    is_deleted?: BoolNullableWithAggregatesFilter<"service_categories"> | boolean | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"service_categories"> | Date | string | null
    deleted_by?: StringNullableWithAggregatesFilter<"service_categories"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"service_categories"> | Date | string | null
    created_by?: StringNullableWithAggregatesFilter<"service_categories"> | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"service_categories"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"service_categories"> | string | null
    icon?: StringNullableWithAggregatesFilter<"service_categories"> | string | null
    slug?: StringNullableWithAggregatesFilter<"service_categories"> | string | null
  }

  export type service_providersWhereInput = {
    AND?: service_providersWhereInput | service_providersWhereInput[]
    OR?: service_providersWhereInput[]
    NOT?: service_providersWhereInput | service_providersWhereInput[]
    id?: UuidFilter<"service_providers"> | string
    user_id?: UuidNullableFilter<"service_providers"> | string | null
    years_of_experience?: IntNullableFilter<"service_providers"> | number | null
    service_name?: StringNullableFilter<"service_providers"> | string | null
    governorate_id?: UuidNullableFilter<"service_providers"> | string | null
    service_category_id?: UuidNullableFilter<"service_providers"> | string | null
    service_delivery_method?: Enumservice_delivery_methodNullableFilter<"service_providers"> | $Enums.service_delivery_method | null
    service_description?: StringNullableFilter<"service_providers"> | string | null
    bio?: StringNullableFilter<"service_providers"> | string | null
    facebook_url?: StringNullableFilter<"service_providers"> | string | null
    instagram_url?: StringNullableFilter<"service_providers"> | string | null
    whatsapp_url?: StringNullableFilter<"service_providers"> | string | null
    other_urls?: StringNullableFilter<"service_providers"> | string | null
    logo_image?: StringNullableFilter<"service_providers"> | string | null
    id_card_front_image?: StringNullableFilter<"service_providers"> | string | null
    id_card_back_image?: StringNullableFilter<"service_providers"> | string | null
    certificates_images?: StringNullableFilter<"service_providers"> | string | null
    document_list?: StringNullableFilter<"service_providers"> | string | null
    video_url?: StringNullableFilter<"service_providers"> | string | null
    keywords?: StringNullableFilter<"service_providers"> | string | null
    notes?: StringNullableFilter<"service_providers"> | string | null
    status?: Enumservice_provider_statusFilter<"service_providers"> | $Enums.service_provider_status
    is_deleted?: BoolNullableFilter<"service_providers"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"service_providers"> | Date | string | null
    deleted_by?: StringNullableFilter<"service_providers"> | string | null
    created_at?: DateTimeNullableFilter<"service_providers"> | Date | string | null
    created_by?: StringNullableFilter<"service_providers"> | string | null
    updated_at?: DateTimeNullableFilter<"service_providers"> | Date | string | null
    updated_by?: StringNullableFilter<"service_providers"> | string | null
    slug?: StringNullableFilter<"service_providers"> | string | null
    address?: StringNullableFilter<"service_providers"> | string | null
    official_url?: StringNullableFilter<"service_providers"> | string | null
    services?: StringNullableFilter<"service_providers"> | string | null
    governorates?: XOR<GovernoratesNullableScalarRelationFilter, governoratesWhereInput> | null
    service_categories?: XOR<Service_categoriesNullableScalarRelationFilter, service_categoriesWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type service_providersOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    years_of_experience?: SortOrderInput | SortOrder
    service_name?: SortOrderInput | SortOrder
    governorate_id?: SortOrderInput | SortOrder
    service_category_id?: SortOrderInput | SortOrder
    service_delivery_method?: SortOrderInput | SortOrder
    service_description?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    facebook_url?: SortOrderInput | SortOrder
    instagram_url?: SortOrderInput | SortOrder
    whatsapp_url?: SortOrderInput | SortOrder
    other_urls?: SortOrderInput | SortOrder
    logo_image?: SortOrderInput | SortOrder
    id_card_front_image?: SortOrderInput | SortOrder
    id_card_back_image?: SortOrderInput | SortOrder
    certificates_images?: SortOrderInput | SortOrder
    document_list?: SortOrderInput | SortOrder
    video_url?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    is_deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    slug?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    official_url?: SortOrderInput | SortOrder
    services?: SortOrderInput | SortOrder
    governorates?: governoratesOrderByWithRelationInput
    service_categories?: service_categoriesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type service_providersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: service_providersWhereInput | service_providersWhereInput[]
    OR?: service_providersWhereInput[]
    NOT?: service_providersWhereInput | service_providersWhereInput[]
    user_id?: UuidNullableFilter<"service_providers"> | string | null
    years_of_experience?: IntNullableFilter<"service_providers"> | number | null
    service_name?: StringNullableFilter<"service_providers"> | string | null
    governorate_id?: UuidNullableFilter<"service_providers"> | string | null
    service_category_id?: UuidNullableFilter<"service_providers"> | string | null
    service_delivery_method?: Enumservice_delivery_methodNullableFilter<"service_providers"> | $Enums.service_delivery_method | null
    service_description?: StringNullableFilter<"service_providers"> | string | null
    bio?: StringNullableFilter<"service_providers"> | string | null
    facebook_url?: StringNullableFilter<"service_providers"> | string | null
    instagram_url?: StringNullableFilter<"service_providers"> | string | null
    whatsapp_url?: StringNullableFilter<"service_providers"> | string | null
    other_urls?: StringNullableFilter<"service_providers"> | string | null
    logo_image?: StringNullableFilter<"service_providers"> | string | null
    id_card_front_image?: StringNullableFilter<"service_providers"> | string | null
    id_card_back_image?: StringNullableFilter<"service_providers"> | string | null
    certificates_images?: StringNullableFilter<"service_providers"> | string | null
    document_list?: StringNullableFilter<"service_providers"> | string | null
    video_url?: StringNullableFilter<"service_providers"> | string | null
    keywords?: StringNullableFilter<"service_providers"> | string | null
    notes?: StringNullableFilter<"service_providers"> | string | null
    status?: Enumservice_provider_statusFilter<"service_providers"> | $Enums.service_provider_status
    is_deleted?: BoolNullableFilter<"service_providers"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"service_providers"> | Date | string | null
    deleted_by?: StringNullableFilter<"service_providers"> | string | null
    created_at?: DateTimeNullableFilter<"service_providers"> | Date | string | null
    created_by?: StringNullableFilter<"service_providers"> | string | null
    updated_at?: DateTimeNullableFilter<"service_providers"> | Date | string | null
    updated_by?: StringNullableFilter<"service_providers"> | string | null
    slug?: StringNullableFilter<"service_providers"> | string | null
    address?: StringNullableFilter<"service_providers"> | string | null
    official_url?: StringNullableFilter<"service_providers"> | string | null
    services?: StringNullableFilter<"service_providers"> | string | null
    governorates?: XOR<GovernoratesNullableScalarRelationFilter, governoratesWhereInput> | null
    service_categories?: XOR<Service_categoriesNullableScalarRelationFilter, service_categoriesWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type service_providersOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    years_of_experience?: SortOrderInput | SortOrder
    service_name?: SortOrderInput | SortOrder
    governorate_id?: SortOrderInput | SortOrder
    service_category_id?: SortOrderInput | SortOrder
    service_delivery_method?: SortOrderInput | SortOrder
    service_description?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    facebook_url?: SortOrderInput | SortOrder
    instagram_url?: SortOrderInput | SortOrder
    whatsapp_url?: SortOrderInput | SortOrder
    other_urls?: SortOrderInput | SortOrder
    logo_image?: SortOrderInput | SortOrder
    id_card_front_image?: SortOrderInput | SortOrder
    id_card_back_image?: SortOrderInput | SortOrder
    certificates_images?: SortOrderInput | SortOrder
    document_list?: SortOrderInput | SortOrder
    video_url?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    is_deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    slug?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    official_url?: SortOrderInput | SortOrder
    services?: SortOrderInput | SortOrder
    _count?: service_providersCountOrderByAggregateInput
    _avg?: service_providersAvgOrderByAggregateInput
    _max?: service_providersMaxOrderByAggregateInput
    _min?: service_providersMinOrderByAggregateInput
    _sum?: service_providersSumOrderByAggregateInput
  }

  export type service_providersScalarWhereWithAggregatesInput = {
    AND?: service_providersScalarWhereWithAggregatesInput | service_providersScalarWhereWithAggregatesInput[]
    OR?: service_providersScalarWhereWithAggregatesInput[]
    NOT?: service_providersScalarWhereWithAggregatesInput | service_providersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"service_providers"> | string
    user_id?: UuidNullableWithAggregatesFilter<"service_providers"> | string | null
    years_of_experience?: IntNullableWithAggregatesFilter<"service_providers"> | number | null
    service_name?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    governorate_id?: UuidNullableWithAggregatesFilter<"service_providers"> | string | null
    service_category_id?: UuidNullableWithAggregatesFilter<"service_providers"> | string | null
    service_delivery_method?: Enumservice_delivery_methodNullableWithAggregatesFilter<"service_providers"> | $Enums.service_delivery_method | null
    service_description?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    bio?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    facebook_url?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    instagram_url?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    whatsapp_url?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    other_urls?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    logo_image?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    id_card_front_image?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    id_card_back_image?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    certificates_images?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    document_list?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    video_url?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    keywords?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    notes?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    status?: Enumservice_provider_statusWithAggregatesFilter<"service_providers"> | $Enums.service_provider_status
    is_deleted?: BoolNullableWithAggregatesFilter<"service_providers"> | boolean | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"service_providers"> | Date | string | null
    deleted_by?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"service_providers"> | Date | string | null
    created_by?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"service_providers"> | Date | string | null
    updated_by?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    slug?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    address?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    official_url?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
    services?: StringNullableWithAggregatesFilter<"service_providers"> | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: UuidFilter<"users"> | string
    email?: StringFilter<"users"> | string
    first_name?: StringNullableFilter<"users"> | string | null
    last_name?: StringNullableFilter<"users"> | string | null
    avatar?: StringNullableFilter<"users"> | string | null
    phone?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    deleted_at?: DateTimeNullableFilter<"users"> | Date | string | null
    is_deleted?: BoolNullableFilter<"users"> | boolean | null
    is_banned?: BoolNullableFilter<"users"> | boolean | null
    created_by?: StringNullableFilter<"users"> | string | null
    updated_by?: StringNullableFilter<"users"> | string | null
    deleted_by?: StringNullableFilter<"users"> | string | null
    user_id?: UuidNullableFilter<"users"> | string | null
    is_admin?: BoolNullableFilter<"users"> | boolean | null
    service_providers?: Service_providersListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    is_deleted?: SortOrderInput | SortOrder
    is_banned?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    is_admin?: SortOrderInput | SortOrder
    service_providers?: service_providersOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    user_id?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    first_name?: StringNullableFilter<"users"> | string | null
    last_name?: StringNullableFilter<"users"> | string | null
    avatar?: StringNullableFilter<"users"> | string | null
    phone?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    deleted_at?: DateTimeNullableFilter<"users"> | Date | string | null
    is_deleted?: BoolNullableFilter<"users"> | boolean | null
    is_banned?: BoolNullableFilter<"users"> | boolean | null
    created_by?: StringNullableFilter<"users"> | string | null
    updated_by?: StringNullableFilter<"users"> | string | null
    deleted_by?: StringNullableFilter<"users"> | string | null
    is_admin?: BoolNullableFilter<"users"> | boolean | null
    service_providers?: Service_providersListRelationFilter
  }, "id" | "email" | "user_id">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    is_deleted?: SortOrderInput | SortOrder
    is_banned?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    is_admin?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    first_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"users"> | string | null
    phone?: StringNullableWithAggregatesFilter<"users"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    is_deleted?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
    is_banned?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
    created_by?: StringNullableWithAggregatesFilter<"users"> | string | null
    updated_by?: StringNullableWithAggregatesFilter<"users"> | string | null
    deleted_by?: StringNullableWithAggregatesFilter<"users"> | string | null
    user_id?: UuidNullableWithAggregatesFilter<"users"> | string | null
    is_admin?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
  }

  export type governoratesCreateInput = {
    id?: string
    name: string
    governorate_code?: string | null
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    service_providers?: service_providersCreateNestedManyWithoutGovernoratesInput
  }

  export type governoratesUncheckedCreateInput = {
    id?: string
    name: string
    governorate_code?: string | null
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    service_providers?: service_providersUncheckedCreateNestedManyWithoutGovernoratesInput
  }

  export type governoratesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    governorate_code?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    service_providers?: service_providersUpdateManyWithoutGovernoratesNestedInput
  }

  export type governoratesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    governorate_code?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    service_providers?: service_providersUncheckedUpdateManyWithoutGovernoratesNestedInput
  }

  export type governoratesCreateManyInput = {
    id?: string
    name: string
    governorate_code?: string | null
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type governoratesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    governorate_code?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type governoratesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    governorate_code?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_categoriesCreateInput = {
    id?: string
    name: string
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    icon?: string | null
    slug?: string | null
    service_providers?: service_providersCreateNestedManyWithoutService_categoriesInput
  }

  export type service_categoriesUncheckedCreateInput = {
    id?: string
    name: string
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    icon?: string | null
    slug?: string | null
    service_providers?: service_providersUncheckedCreateNestedManyWithoutService_categoriesInput
  }

  export type service_categoriesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    service_providers?: service_providersUpdateManyWithoutService_categoriesNestedInput
  }

  export type service_categoriesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    service_providers?: service_providersUncheckedUpdateManyWithoutService_categoriesNestedInput
  }

  export type service_categoriesCreateManyInput = {
    id?: string
    name: string
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    icon?: string | null
    slug?: string | null
  }

  export type service_categoriesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_categoriesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_providersCreateInput = {
    id?: string
    years_of_experience?: number | null
    service_name?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
    governorates?: governoratesCreateNestedOneWithoutService_providersInput
    service_categories?: service_categoriesCreateNestedOneWithoutService_providersInput
    users?: usersCreateNestedOneWithoutService_providersInput
  }

  export type service_providersUncheckedCreateInput = {
    id?: string
    user_id?: string | null
    years_of_experience?: number | null
    service_name?: string | null
    governorate_id?: string | null
    service_category_id?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
  }

  export type service_providersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
    governorates?: governoratesUpdateOneWithoutService_providersNestedInput
    service_categories?: service_categoriesUpdateOneWithoutService_providersNestedInput
    users?: usersUpdateOneWithoutService_providersNestedInput
  }

  export type service_providersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    governorate_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_category_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_providersCreateManyInput = {
    id?: string
    user_id?: string | null
    years_of_experience?: number | null
    service_name?: string | null
    governorate_id?: string | null
    service_category_id?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
  }

  export type service_providersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_providersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    governorate_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_category_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateInput = {
    id?: string
    email: string
    first_name?: string | null
    last_name?: string | null
    avatar?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    is_deleted?: boolean | null
    is_banned?: boolean | null
    created_by?: string | null
    updated_by?: string | null
    deleted_by?: string | null
    user_id?: string | null
    is_admin?: boolean | null
    service_providers?: service_providersCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    email: string
    first_name?: string | null
    last_name?: string | null
    avatar?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    is_deleted?: boolean | null
    is_banned?: boolean | null
    created_by?: string | null
    updated_by?: string | null
    deleted_by?: string | null
    user_id?: string | null
    is_admin?: boolean | null
    service_providers?: service_providersUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    service_providers?: service_providersUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    service_providers?: service_providersUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    email: string
    first_name?: string | null
    last_name?: string | null
    avatar?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    is_deleted?: boolean | null
    is_banned?: boolean | null
    created_by?: string | null
    updated_by?: string | null
    deleted_by?: string | null
    user_id?: string | null
    is_admin?: boolean | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Service_providersListRelationFilter = {
    every?: service_providersWhereInput
    some?: service_providersWhereInput
    none?: service_providersWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type service_providersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type governoratesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    governorate_code?: SortOrder
    meta_title?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type governoratesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    governorate_code?: SortOrder
    meta_title?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type governoratesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    governorate_code?: SortOrder
    meta_title?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type service_categoriesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    meta_title?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
    icon?: SortOrder
    slug?: SortOrder
  }

  export type service_categoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    meta_title?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
    icon?: SortOrder
    slug?: SortOrder
  }

  export type service_categoriesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    meta_title?: SortOrder
    meta_description?: SortOrder
    meta_keywords?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
    icon?: SortOrder
    slug?: SortOrder
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type Enumservice_delivery_methodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.service_delivery_method | Enumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    in?: $Enums.service_delivery_method[] | ListEnumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.service_delivery_method[] | ListEnumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumservice_delivery_methodNullableFilter<$PrismaModel> | $Enums.service_delivery_method | null
  }

  export type Enumservice_provider_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.service_provider_status | Enumservice_provider_statusFieldRefInput<$PrismaModel>
    in?: $Enums.service_provider_status[] | ListEnumservice_provider_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.service_provider_status[] | ListEnumservice_provider_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumservice_provider_statusFilter<$PrismaModel> | $Enums.service_provider_status
  }

  export type GovernoratesNullableScalarRelationFilter = {
    is?: governoratesWhereInput | null
    isNot?: governoratesWhereInput | null
  }

  export type Service_categoriesNullableScalarRelationFilter = {
    is?: service_categoriesWhereInput | null
    isNot?: service_categoriesWhereInput | null
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type service_providersCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    years_of_experience?: SortOrder
    service_name?: SortOrder
    governorate_id?: SortOrder
    service_category_id?: SortOrder
    service_delivery_method?: SortOrder
    service_description?: SortOrder
    bio?: SortOrder
    facebook_url?: SortOrder
    instagram_url?: SortOrder
    whatsapp_url?: SortOrder
    other_urls?: SortOrder
    logo_image?: SortOrder
    id_card_front_image?: SortOrder
    id_card_back_image?: SortOrder
    certificates_images?: SortOrder
    document_list?: SortOrder
    video_url?: SortOrder
    keywords?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
    slug?: SortOrder
    address?: SortOrder
    official_url?: SortOrder
    services?: SortOrder
  }

  export type service_providersAvgOrderByAggregateInput = {
    years_of_experience?: SortOrder
  }

  export type service_providersMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    years_of_experience?: SortOrder
    service_name?: SortOrder
    governorate_id?: SortOrder
    service_category_id?: SortOrder
    service_delivery_method?: SortOrder
    service_description?: SortOrder
    bio?: SortOrder
    facebook_url?: SortOrder
    instagram_url?: SortOrder
    whatsapp_url?: SortOrder
    other_urls?: SortOrder
    logo_image?: SortOrder
    id_card_front_image?: SortOrder
    id_card_back_image?: SortOrder
    certificates_images?: SortOrder
    document_list?: SortOrder
    video_url?: SortOrder
    keywords?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
    slug?: SortOrder
    address?: SortOrder
    official_url?: SortOrder
    services?: SortOrder
  }

  export type service_providersMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    years_of_experience?: SortOrder
    service_name?: SortOrder
    governorate_id?: SortOrder
    service_category_id?: SortOrder
    service_delivery_method?: SortOrder
    service_description?: SortOrder
    bio?: SortOrder
    facebook_url?: SortOrder
    instagram_url?: SortOrder
    whatsapp_url?: SortOrder
    other_urls?: SortOrder
    logo_image?: SortOrder
    id_card_front_image?: SortOrder
    id_card_back_image?: SortOrder
    certificates_images?: SortOrder
    document_list?: SortOrder
    video_url?: SortOrder
    keywords?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    is_deleted?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_at?: SortOrder
    updated_by?: SortOrder
    slug?: SortOrder
    address?: SortOrder
    official_url?: SortOrder
    services?: SortOrder
  }

  export type service_providersSumOrderByAggregateInput = {
    years_of_experience?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type Enumservice_delivery_methodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.service_delivery_method | Enumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    in?: $Enums.service_delivery_method[] | ListEnumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.service_delivery_method[] | ListEnumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumservice_delivery_methodNullableWithAggregatesFilter<$PrismaModel> | $Enums.service_delivery_method | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumservice_delivery_methodNullableFilter<$PrismaModel>
    _max?: NestedEnumservice_delivery_methodNullableFilter<$PrismaModel>
  }

  export type Enumservice_provider_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.service_provider_status | Enumservice_provider_statusFieldRefInput<$PrismaModel>
    in?: $Enums.service_provider_status[] | ListEnumservice_provider_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.service_provider_status[] | ListEnumservice_provider_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumservice_provider_statusWithAggregatesFilter<$PrismaModel> | $Enums.service_provider_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumservice_provider_statusFilter<$PrismaModel>
    _max?: NestedEnumservice_provider_statusFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    is_deleted?: SortOrder
    is_banned?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    deleted_by?: SortOrder
    user_id?: SortOrder
    is_admin?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    is_deleted?: SortOrder
    is_banned?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    deleted_by?: SortOrder
    user_id?: SortOrder
    is_admin?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    is_deleted?: SortOrder
    is_banned?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    deleted_by?: SortOrder
    user_id?: SortOrder
    is_admin?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type service_providersCreateNestedManyWithoutGovernoratesInput = {
    create?: XOR<service_providersCreateWithoutGovernoratesInput, service_providersUncheckedCreateWithoutGovernoratesInput> | service_providersCreateWithoutGovernoratesInput[] | service_providersUncheckedCreateWithoutGovernoratesInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutGovernoratesInput | service_providersCreateOrConnectWithoutGovernoratesInput[]
    createMany?: service_providersCreateManyGovernoratesInputEnvelope
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
  }

  export type service_providersUncheckedCreateNestedManyWithoutGovernoratesInput = {
    create?: XOR<service_providersCreateWithoutGovernoratesInput, service_providersUncheckedCreateWithoutGovernoratesInput> | service_providersCreateWithoutGovernoratesInput[] | service_providersUncheckedCreateWithoutGovernoratesInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutGovernoratesInput | service_providersCreateOrConnectWithoutGovernoratesInput[]
    createMany?: service_providersCreateManyGovernoratesInputEnvelope
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type service_providersUpdateManyWithoutGovernoratesNestedInput = {
    create?: XOR<service_providersCreateWithoutGovernoratesInput, service_providersUncheckedCreateWithoutGovernoratesInput> | service_providersCreateWithoutGovernoratesInput[] | service_providersUncheckedCreateWithoutGovernoratesInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutGovernoratesInput | service_providersCreateOrConnectWithoutGovernoratesInput[]
    upsert?: service_providersUpsertWithWhereUniqueWithoutGovernoratesInput | service_providersUpsertWithWhereUniqueWithoutGovernoratesInput[]
    createMany?: service_providersCreateManyGovernoratesInputEnvelope
    set?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    disconnect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    delete?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    update?: service_providersUpdateWithWhereUniqueWithoutGovernoratesInput | service_providersUpdateWithWhereUniqueWithoutGovernoratesInput[]
    updateMany?: service_providersUpdateManyWithWhereWithoutGovernoratesInput | service_providersUpdateManyWithWhereWithoutGovernoratesInput[]
    deleteMany?: service_providersScalarWhereInput | service_providersScalarWhereInput[]
  }

  export type service_providersUncheckedUpdateManyWithoutGovernoratesNestedInput = {
    create?: XOR<service_providersCreateWithoutGovernoratesInput, service_providersUncheckedCreateWithoutGovernoratesInput> | service_providersCreateWithoutGovernoratesInput[] | service_providersUncheckedCreateWithoutGovernoratesInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutGovernoratesInput | service_providersCreateOrConnectWithoutGovernoratesInput[]
    upsert?: service_providersUpsertWithWhereUniqueWithoutGovernoratesInput | service_providersUpsertWithWhereUniqueWithoutGovernoratesInput[]
    createMany?: service_providersCreateManyGovernoratesInputEnvelope
    set?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    disconnect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    delete?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    update?: service_providersUpdateWithWhereUniqueWithoutGovernoratesInput | service_providersUpdateWithWhereUniqueWithoutGovernoratesInput[]
    updateMany?: service_providersUpdateManyWithWhereWithoutGovernoratesInput | service_providersUpdateManyWithWhereWithoutGovernoratesInput[]
    deleteMany?: service_providersScalarWhereInput | service_providersScalarWhereInput[]
  }

  export type service_providersCreateNestedManyWithoutService_categoriesInput = {
    create?: XOR<service_providersCreateWithoutService_categoriesInput, service_providersUncheckedCreateWithoutService_categoriesInput> | service_providersCreateWithoutService_categoriesInput[] | service_providersUncheckedCreateWithoutService_categoriesInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutService_categoriesInput | service_providersCreateOrConnectWithoutService_categoriesInput[]
    createMany?: service_providersCreateManyService_categoriesInputEnvelope
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
  }

  export type service_providersUncheckedCreateNestedManyWithoutService_categoriesInput = {
    create?: XOR<service_providersCreateWithoutService_categoriesInput, service_providersUncheckedCreateWithoutService_categoriesInput> | service_providersCreateWithoutService_categoriesInput[] | service_providersUncheckedCreateWithoutService_categoriesInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutService_categoriesInput | service_providersCreateOrConnectWithoutService_categoriesInput[]
    createMany?: service_providersCreateManyService_categoriesInputEnvelope
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
  }

  export type service_providersUpdateManyWithoutService_categoriesNestedInput = {
    create?: XOR<service_providersCreateWithoutService_categoriesInput, service_providersUncheckedCreateWithoutService_categoriesInput> | service_providersCreateWithoutService_categoriesInput[] | service_providersUncheckedCreateWithoutService_categoriesInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutService_categoriesInput | service_providersCreateOrConnectWithoutService_categoriesInput[]
    upsert?: service_providersUpsertWithWhereUniqueWithoutService_categoriesInput | service_providersUpsertWithWhereUniqueWithoutService_categoriesInput[]
    createMany?: service_providersCreateManyService_categoriesInputEnvelope
    set?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    disconnect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    delete?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    update?: service_providersUpdateWithWhereUniqueWithoutService_categoriesInput | service_providersUpdateWithWhereUniqueWithoutService_categoriesInput[]
    updateMany?: service_providersUpdateManyWithWhereWithoutService_categoriesInput | service_providersUpdateManyWithWhereWithoutService_categoriesInput[]
    deleteMany?: service_providersScalarWhereInput | service_providersScalarWhereInput[]
  }

  export type service_providersUncheckedUpdateManyWithoutService_categoriesNestedInput = {
    create?: XOR<service_providersCreateWithoutService_categoriesInput, service_providersUncheckedCreateWithoutService_categoriesInput> | service_providersCreateWithoutService_categoriesInput[] | service_providersUncheckedCreateWithoutService_categoriesInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutService_categoriesInput | service_providersCreateOrConnectWithoutService_categoriesInput[]
    upsert?: service_providersUpsertWithWhereUniqueWithoutService_categoriesInput | service_providersUpsertWithWhereUniqueWithoutService_categoriesInput[]
    createMany?: service_providersCreateManyService_categoriesInputEnvelope
    set?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    disconnect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    delete?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    update?: service_providersUpdateWithWhereUniqueWithoutService_categoriesInput | service_providersUpdateWithWhereUniqueWithoutService_categoriesInput[]
    updateMany?: service_providersUpdateManyWithWhereWithoutService_categoriesInput | service_providersUpdateManyWithWhereWithoutService_categoriesInput[]
    deleteMany?: service_providersScalarWhereInput | service_providersScalarWhereInput[]
  }

  export type governoratesCreateNestedOneWithoutService_providersInput = {
    create?: XOR<governoratesCreateWithoutService_providersInput, governoratesUncheckedCreateWithoutService_providersInput>
    connectOrCreate?: governoratesCreateOrConnectWithoutService_providersInput
    connect?: governoratesWhereUniqueInput
  }

  export type service_categoriesCreateNestedOneWithoutService_providersInput = {
    create?: XOR<service_categoriesCreateWithoutService_providersInput, service_categoriesUncheckedCreateWithoutService_providersInput>
    connectOrCreate?: service_categoriesCreateOrConnectWithoutService_providersInput
    connect?: service_categoriesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutService_providersInput = {
    create?: XOR<usersCreateWithoutService_providersInput, usersUncheckedCreateWithoutService_providersInput>
    connectOrCreate?: usersCreateOrConnectWithoutService_providersInput
    connect?: usersWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumservice_delivery_methodFieldUpdateOperationsInput = {
    set?: $Enums.service_delivery_method | null
  }

  export type Enumservice_provider_statusFieldUpdateOperationsInput = {
    set?: $Enums.service_provider_status
  }

  export type governoratesUpdateOneWithoutService_providersNestedInput = {
    create?: XOR<governoratesCreateWithoutService_providersInput, governoratesUncheckedCreateWithoutService_providersInput>
    connectOrCreate?: governoratesCreateOrConnectWithoutService_providersInput
    upsert?: governoratesUpsertWithoutService_providersInput
    disconnect?: governoratesWhereInput | boolean
    delete?: governoratesWhereInput | boolean
    connect?: governoratesWhereUniqueInput
    update?: XOR<XOR<governoratesUpdateToOneWithWhereWithoutService_providersInput, governoratesUpdateWithoutService_providersInput>, governoratesUncheckedUpdateWithoutService_providersInput>
  }

  export type service_categoriesUpdateOneWithoutService_providersNestedInput = {
    create?: XOR<service_categoriesCreateWithoutService_providersInput, service_categoriesUncheckedCreateWithoutService_providersInput>
    connectOrCreate?: service_categoriesCreateOrConnectWithoutService_providersInput
    upsert?: service_categoriesUpsertWithoutService_providersInput
    disconnect?: service_categoriesWhereInput | boolean
    delete?: service_categoriesWhereInput | boolean
    connect?: service_categoriesWhereUniqueInput
    update?: XOR<XOR<service_categoriesUpdateToOneWithWhereWithoutService_providersInput, service_categoriesUpdateWithoutService_providersInput>, service_categoriesUncheckedUpdateWithoutService_providersInput>
  }

  export type usersUpdateOneWithoutService_providersNestedInput = {
    create?: XOR<usersCreateWithoutService_providersInput, usersUncheckedCreateWithoutService_providersInput>
    connectOrCreate?: usersCreateOrConnectWithoutService_providersInput
    upsert?: usersUpsertWithoutService_providersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutService_providersInput, usersUpdateWithoutService_providersInput>, usersUncheckedUpdateWithoutService_providersInput>
  }

  export type service_providersCreateNestedManyWithoutUsersInput = {
    create?: XOR<service_providersCreateWithoutUsersInput, service_providersUncheckedCreateWithoutUsersInput> | service_providersCreateWithoutUsersInput[] | service_providersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutUsersInput | service_providersCreateOrConnectWithoutUsersInput[]
    createMany?: service_providersCreateManyUsersInputEnvelope
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
  }

  export type service_providersUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<service_providersCreateWithoutUsersInput, service_providersUncheckedCreateWithoutUsersInput> | service_providersCreateWithoutUsersInput[] | service_providersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutUsersInput | service_providersCreateOrConnectWithoutUsersInput[]
    createMany?: service_providersCreateManyUsersInputEnvelope
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type service_providersUpdateManyWithoutUsersNestedInput = {
    create?: XOR<service_providersCreateWithoutUsersInput, service_providersUncheckedCreateWithoutUsersInput> | service_providersCreateWithoutUsersInput[] | service_providersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutUsersInput | service_providersCreateOrConnectWithoutUsersInput[]
    upsert?: service_providersUpsertWithWhereUniqueWithoutUsersInput | service_providersUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: service_providersCreateManyUsersInputEnvelope
    set?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    disconnect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    delete?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    update?: service_providersUpdateWithWhereUniqueWithoutUsersInput | service_providersUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: service_providersUpdateManyWithWhereWithoutUsersInput | service_providersUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: service_providersScalarWhereInput | service_providersScalarWhereInput[]
  }

  export type service_providersUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<service_providersCreateWithoutUsersInput, service_providersUncheckedCreateWithoutUsersInput> | service_providersCreateWithoutUsersInput[] | service_providersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: service_providersCreateOrConnectWithoutUsersInput | service_providersCreateOrConnectWithoutUsersInput[]
    upsert?: service_providersUpsertWithWhereUniqueWithoutUsersInput | service_providersUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: service_providersCreateManyUsersInputEnvelope
    set?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    disconnect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    delete?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    connect?: service_providersWhereUniqueInput | service_providersWhereUniqueInput[]
    update?: service_providersUpdateWithWhereUniqueWithoutUsersInput | service_providersUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: service_providersUpdateManyWithWhereWithoutUsersInput | service_providersUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: service_providersScalarWhereInput | service_providersScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumservice_delivery_methodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.service_delivery_method | Enumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    in?: $Enums.service_delivery_method[] | ListEnumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.service_delivery_method[] | ListEnumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumservice_delivery_methodNullableFilter<$PrismaModel> | $Enums.service_delivery_method | null
  }

  export type NestedEnumservice_provider_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.service_provider_status | Enumservice_provider_statusFieldRefInput<$PrismaModel>
    in?: $Enums.service_provider_status[] | ListEnumservice_provider_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.service_provider_status[] | ListEnumservice_provider_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumservice_provider_statusFilter<$PrismaModel> | $Enums.service_provider_status
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumservice_delivery_methodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.service_delivery_method | Enumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    in?: $Enums.service_delivery_method[] | ListEnumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.service_delivery_method[] | ListEnumservice_delivery_methodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumservice_delivery_methodNullableWithAggregatesFilter<$PrismaModel> | $Enums.service_delivery_method | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumservice_delivery_methodNullableFilter<$PrismaModel>
    _max?: NestedEnumservice_delivery_methodNullableFilter<$PrismaModel>
  }

  export type NestedEnumservice_provider_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.service_provider_status | Enumservice_provider_statusFieldRefInput<$PrismaModel>
    in?: $Enums.service_provider_status[] | ListEnumservice_provider_statusFieldRefInput<$PrismaModel>
    notIn?: $Enums.service_provider_status[] | ListEnumservice_provider_statusFieldRefInput<$PrismaModel>
    not?: NestedEnumservice_provider_statusWithAggregatesFilter<$PrismaModel> | $Enums.service_provider_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumservice_provider_statusFilter<$PrismaModel>
    _max?: NestedEnumservice_provider_statusFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type service_providersCreateWithoutGovernoratesInput = {
    id?: string
    years_of_experience?: number | null
    service_name?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
    service_categories?: service_categoriesCreateNestedOneWithoutService_providersInput
    users?: usersCreateNestedOneWithoutService_providersInput
  }

  export type service_providersUncheckedCreateWithoutGovernoratesInput = {
    id?: string
    user_id?: string | null
    years_of_experience?: number | null
    service_name?: string | null
    service_category_id?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
  }

  export type service_providersCreateOrConnectWithoutGovernoratesInput = {
    where: service_providersWhereUniqueInput
    create: XOR<service_providersCreateWithoutGovernoratesInput, service_providersUncheckedCreateWithoutGovernoratesInput>
  }

  export type service_providersCreateManyGovernoratesInputEnvelope = {
    data: service_providersCreateManyGovernoratesInput | service_providersCreateManyGovernoratesInput[]
    skipDuplicates?: boolean
  }

  export type service_providersUpsertWithWhereUniqueWithoutGovernoratesInput = {
    where: service_providersWhereUniqueInput
    update: XOR<service_providersUpdateWithoutGovernoratesInput, service_providersUncheckedUpdateWithoutGovernoratesInput>
    create: XOR<service_providersCreateWithoutGovernoratesInput, service_providersUncheckedCreateWithoutGovernoratesInput>
  }

  export type service_providersUpdateWithWhereUniqueWithoutGovernoratesInput = {
    where: service_providersWhereUniqueInput
    data: XOR<service_providersUpdateWithoutGovernoratesInput, service_providersUncheckedUpdateWithoutGovernoratesInput>
  }

  export type service_providersUpdateManyWithWhereWithoutGovernoratesInput = {
    where: service_providersScalarWhereInput
    data: XOR<service_providersUpdateManyMutationInput, service_providersUncheckedUpdateManyWithoutGovernoratesInput>
  }

  export type service_providersScalarWhereInput = {
    AND?: service_providersScalarWhereInput | service_providersScalarWhereInput[]
    OR?: service_providersScalarWhereInput[]
    NOT?: service_providersScalarWhereInput | service_providersScalarWhereInput[]
    id?: UuidFilter<"service_providers"> | string
    user_id?: UuidNullableFilter<"service_providers"> | string | null
    years_of_experience?: IntNullableFilter<"service_providers"> | number | null
    service_name?: StringNullableFilter<"service_providers"> | string | null
    governorate_id?: UuidNullableFilter<"service_providers"> | string | null
    service_category_id?: UuidNullableFilter<"service_providers"> | string | null
    service_delivery_method?: Enumservice_delivery_methodNullableFilter<"service_providers"> | $Enums.service_delivery_method | null
    service_description?: StringNullableFilter<"service_providers"> | string | null
    bio?: StringNullableFilter<"service_providers"> | string | null
    facebook_url?: StringNullableFilter<"service_providers"> | string | null
    instagram_url?: StringNullableFilter<"service_providers"> | string | null
    whatsapp_url?: StringNullableFilter<"service_providers"> | string | null
    other_urls?: StringNullableFilter<"service_providers"> | string | null
    logo_image?: StringNullableFilter<"service_providers"> | string | null
    id_card_front_image?: StringNullableFilter<"service_providers"> | string | null
    id_card_back_image?: StringNullableFilter<"service_providers"> | string | null
    certificates_images?: StringNullableFilter<"service_providers"> | string | null
    document_list?: StringNullableFilter<"service_providers"> | string | null
    video_url?: StringNullableFilter<"service_providers"> | string | null
    keywords?: StringNullableFilter<"service_providers"> | string | null
    notes?: StringNullableFilter<"service_providers"> | string | null
    status?: Enumservice_provider_statusFilter<"service_providers"> | $Enums.service_provider_status
    is_deleted?: BoolNullableFilter<"service_providers"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"service_providers"> | Date | string | null
    deleted_by?: StringNullableFilter<"service_providers"> | string | null
    created_at?: DateTimeNullableFilter<"service_providers"> | Date | string | null
    created_by?: StringNullableFilter<"service_providers"> | string | null
    updated_at?: DateTimeNullableFilter<"service_providers"> | Date | string | null
    updated_by?: StringNullableFilter<"service_providers"> | string | null
    slug?: StringNullableFilter<"service_providers"> | string | null
    address?: StringNullableFilter<"service_providers"> | string | null
    official_url?: StringNullableFilter<"service_providers"> | string | null
    services?: StringNullableFilter<"service_providers"> | string | null
  }

  export type service_providersCreateWithoutService_categoriesInput = {
    id?: string
    years_of_experience?: number | null
    service_name?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
    governorates?: governoratesCreateNestedOneWithoutService_providersInput
    users?: usersCreateNestedOneWithoutService_providersInput
  }

  export type service_providersUncheckedCreateWithoutService_categoriesInput = {
    id?: string
    user_id?: string | null
    years_of_experience?: number | null
    service_name?: string | null
    governorate_id?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
  }

  export type service_providersCreateOrConnectWithoutService_categoriesInput = {
    where: service_providersWhereUniqueInput
    create: XOR<service_providersCreateWithoutService_categoriesInput, service_providersUncheckedCreateWithoutService_categoriesInput>
  }

  export type service_providersCreateManyService_categoriesInputEnvelope = {
    data: service_providersCreateManyService_categoriesInput | service_providersCreateManyService_categoriesInput[]
    skipDuplicates?: boolean
  }

  export type service_providersUpsertWithWhereUniqueWithoutService_categoriesInput = {
    where: service_providersWhereUniqueInput
    update: XOR<service_providersUpdateWithoutService_categoriesInput, service_providersUncheckedUpdateWithoutService_categoriesInput>
    create: XOR<service_providersCreateWithoutService_categoriesInput, service_providersUncheckedCreateWithoutService_categoriesInput>
  }

  export type service_providersUpdateWithWhereUniqueWithoutService_categoriesInput = {
    where: service_providersWhereUniqueInput
    data: XOR<service_providersUpdateWithoutService_categoriesInput, service_providersUncheckedUpdateWithoutService_categoriesInput>
  }

  export type service_providersUpdateManyWithWhereWithoutService_categoriesInput = {
    where: service_providersScalarWhereInput
    data: XOR<service_providersUpdateManyMutationInput, service_providersUncheckedUpdateManyWithoutService_categoriesInput>
  }

  export type governoratesCreateWithoutService_providersInput = {
    id?: string
    name: string
    governorate_code?: string | null
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type governoratesUncheckedCreateWithoutService_providersInput = {
    id?: string
    name: string
    governorate_code?: string | null
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
  }

  export type governoratesCreateOrConnectWithoutService_providersInput = {
    where: governoratesWhereUniqueInput
    create: XOR<governoratesCreateWithoutService_providersInput, governoratesUncheckedCreateWithoutService_providersInput>
  }

  export type service_categoriesCreateWithoutService_providersInput = {
    id?: string
    name: string
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    icon?: string | null
    slug?: string | null
  }

  export type service_categoriesUncheckedCreateWithoutService_providersInput = {
    id?: string
    name: string
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    icon?: string | null
    slug?: string | null
  }

  export type service_categoriesCreateOrConnectWithoutService_providersInput = {
    where: service_categoriesWhereUniqueInput
    create: XOR<service_categoriesCreateWithoutService_providersInput, service_categoriesUncheckedCreateWithoutService_providersInput>
  }

  export type usersCreateWithoutService_providersInput = {
    id?: string
    email: string
    first_name?: string | null
    last_name?: string | null
    avatar?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    is_deleted?: boolean | null
    is_banned?: boolean | null
    created_by?: string | null
    updated_by?: string | null
    deleted_by?: string | null
    user_id?: string | null
    is_admin?: boolean | null
  }

  export type usersUncheckedCreateWithoutService_providersInput = {
    id?: string
    email: string
    first_name?: string | null
    last_name?: string | null
    avatar?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    is_deleted?: boolean | null
    is_banned?: boolean | null
    created_by?: string | null
    updated_by?: string | null
    deleted_by?: string | null
    user_id?: string | null
    is_admin?: boolean | null
  }

  export type usersCreateOrConnectWithoutService_providersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutService_providersInput, usersUncheckedCreateWithoutService_providersInput>
  }

  export type governoratesUpsertWithoutService_providersInput = {
    update: XOR<governoratesUpdateWithoutService_providersInput, governoratesUncheckedUpdateWithoutService_providersInput>
    create: XOR<governoratesCreateWithoutService_providersInput, governoratesUncheckedCreateWithoutService_providersInput>
    where?: governoratesWhereInput
  }

  export type governoratesUpdateToOneWithWhereWithoutService_providersInput = {
    where?: governoratesWhereInput
    data: XOR<governoratesUpdateWithoutService_providersInput, governoratesUncheckedUpdateWithoutService_providersInput>
  }

  export type governoratesUpdateWithoutService_providersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    governorate_code?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type governoratesUncheckedUpdateWithoutService_providersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    governorate_code?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_categoriesUpsertWithoutService_providersInput = {
    update: XOR<service_categoriesUpdateWithoutService_providersInput, service_categoriesUncheckedUpdateWithoutService_providersInput>
    create: XOR<service_categoriesCreateWithoutService_providersInput, service_categoriesUncheckedCreateWithoutService_providersInput>
    where?: service_categoriesWhereInput
  }

  export type service_categoriesUpdateToOneWithWhereWithoutService_providersInput = {
    where?: service_categoriesWhereInput
    data: XOR<service_categoriesUpdateWithoutService_providersInput, service_categoriesUncheckedUpdateWithoutService_providersInput>
  }

  export type service_categoriesUpdateWithoutService_providersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_categoriesUncheckedUpdateWithoutService_providersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    meta_keywords?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUpsertWithoutService_providersInput = {
    update: XOR<usersUpdateWithoutService_providersInput, usersUncheckedUpdateWithoutService_providersInput>
    create: XOR<usersCreateWithoutService_providersInput, usersUncheckedCreateWithoutService_providersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutService_providersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutService_providersInput, usersUncheckedUpdateWithoutService_providersInput>
  }

  export type usersUpdateWithoutService_providersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type usersUncheckedUpdateWithoutService_providersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type service_providersCreateWithoutUsersInput = {
    id?: string
    years_of_experience?: number | null
    service_name?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
    governorates?: governoratesCreateNestedOneWithoutService_providersInput
    service_categories?: service_categoriesCreateNestedOneWithoutService_providersInput
  }

  export type service_providersUncheckedCreateWithoutUsersInput = {
    id?: string
    years_of_experience?: number | null
    service_name?: string | null
    governorate_id?: string | null
    service_category_id?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
  }

  export type service_providersCreateOrConnectWithoutUsersInput = {
    where: service_providersWhereUniqueInput
    create: XOR<service_providersCreateWithoutUsersInput, service_providersUncheckedCreateWithoutUsersInput>
  }

  export type service_providersCreateManyUsersInputEnvelope = {
    data: service_providersCreateManyUsersInput | service_providersCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type service_providersUpsertWithWhereUniqueWithoutUsersInput = {
    where: service_providersWhereUniqueInput
    update: XOR<service_providersUpdateWithoutUsersInput, service_providersUncheckedUpdateWithoutUsersInput>
    create: XOR<service_providersCreateWithoutUsersInput, service_providersUncheckedCreateWithoutUsersInput>
  }

  export type service_providersUpdateWithWhereUniqueWithoutUsersInput = {
    where: service_providersWhereUniqueInput
    data: XOR<service_providersUpdateWithoutUsersInput, service_providersUncheckedUpdateWithoutUsersInput>
  }

  export type service_providersUpdateManyWithWhereWithoutUsersInput = {
    where: service_providersScalarWhereInput
    data: XOR<service_providersUpdateManyMutationInput, service_providersUncheckedUpdateManyWithoutUsersInput>
  }

  export type service_providersCreateManyGovernoratesInput = {
    id?: string
    user_id?: string | null
    years_of_experience?: number | null
    service_name?: string | null
    service_category_id?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
  }

  export type service_providersUpdateWithoutGovernoratesInput = {
    id?: StringFieldUpdateOperationsInput | string
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
    service_categories?: service_categoriesUpdateOneWithoutService_providersNestedInput
    users?: usersUpdateOneWithoutService_providersNestedInput
  }

  export type service_providersUncheckedUpdateWithoutGovernoratesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    service_category_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_providersUncheckedUpdateManyWithoutGovernoratesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    service_category_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_providersCreateManyService_categoriesInput = {
    id?: string
    user_id?: string | null
    years_of_experience?: number | null
    service_name?: string | null
    governorate_id?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
  }

  export type service_providersUpdateWithoutService_categoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
    governorates?: governoratesUpdateOneWithoutService_providersNestedInput
    users?: usersUpdateOneWithoutService_providersNestedInput
  }

  export type service_providersUncheckedUpdateWithoutService_categoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    governorate_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_providersUncheckedUpdateManyWithoutService_categoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    governorate_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_providersCreateManyUsersInput = {
    id?: string
    years_of_experience?: number | null
    service_name?: string | null
    governorate_id?: string | null
    service_category_id?: string | null
    service_delivery_method?: $Enums.service_delivery_method | null
    service_description?: string | null
    bio?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    whatsapp_url?: string | null
    other_urls?: string | null
    logo_image?: string | null
    id_card_front_image?: string | null
    id_card_back_image?: string | null
    certificates_images?: string | null
    document_list?: string | null
    video_url?: string | null
    keywords?: string | null
    notes?: string | null
    status?: $Enums.service_provider_status
    is_deleted?: boolean | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
    created_at?: Date | string | null
    created_by?: string | null
    updated_at?: Date | string | null
    updated_by?: string | null
    slug?: string | null
    address?: string | null
    official_url?: string | null
    services?: string | null
  }

  export type service_providersUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
    governorates?: governoratesUpdateOneWithoutService_providersNestedInput
    service_categories?: service_categoriesUpdateOneWithoutService_providersNestedInput
  }

  export type service_providersUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    governorate_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_category_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type service_providersUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    service_name?: NullableStringFieldUpdateOperationsInput | string | null
    governorate_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_category_id?: NullableStringFieldUpdateOperationsInput | string | null
    service_delivery_method?: NullableEnumservice_delivery_methodFieldUpdateOperationsInput | $Enums.service_delivery_method | null
    service_description?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    facebook_url?: NullableStringFieldUpdateOperationsInput | string | null
    instagram_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_url?: NullableStringFieldUpdateOperationsInput | string | null
    other_urls?: NullableStringFieldUpdateOperationsInput | string | null
    logo_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_front_image?: NullableStringFieldUpdateOperationsInput | string | null
    id_card_back_image?: NullableStringFieldUpdateOperationsInput | string | null
    certificates_images?: NullableStringFieldUpdateOperationsInput | string | null
    document_list?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumservice_provider_statusFieldUpdateOperationsInput | $Enums.service_provider_status
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    official_url?: NullableStringFieldUpdateOperationsInput | string | null
    services?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}