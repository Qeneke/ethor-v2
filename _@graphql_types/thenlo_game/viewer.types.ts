import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  _Any: any,
};








export type _Entity = Viewer;

export type _Service = {
   __typename?: '_Service',
  /** 
 * The sdl representing the federated service capabilities. Includes federation
   * directives, removes federation types, and includes rest of full schema after
   * schema directives have been applied
 **/
  sdl?: Maybe<Scalars['String']>,
};

export type AllInOne = IallInOne & {
   __typename?: 'AllInOne',
  code?: Maybe<Scalars['Int']>,
  message?: Maybe<Scalars['String']>,
  success: Scalars['Boolean'],
};

export type IallInOne = {
  code?: Maybe<Scalars['Int']>,
  message?: Maybe<Scalars['String']>,
  success: Scalars['Boolean'],
};

export type IpageInfo = {
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
  endCursor?: Maybe<Scalars['String']>,
};

export type Node = {
  id: Scalars['ID'],
};

export type PageInfo = IpageInfo & {
   __typename?: 'PageInfo',
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
  endCursor?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _entities: Array<Maybe<_Entity>>,
  _service: _Service,
  viewer?: Maybe<Viewer>,
};


export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>
};

export type Viewer = Node & {
   __typename?: 'Viewer',
  id: Scalars['ID'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  _Any: ResolverTypeWrapper<Scalars['_Any']>,
  _Entity: ResolversTypes['Viewer'],
  Viewer: ResolverTypeWrapper<Viewer>,
  Node: ResolverTypeWrapper<Node>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  _Service: ResolverTypeWrapper<_Service>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  AllInOne: ResolverTypeWrapper<AllInOne>,
  IallInOne: ResolverTypeWrapper<IallInOne>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  IpageInfo: ResolverTypeWrapper<IpageInfo>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  _Any: Scalars['_Any'],
  _Entity: ResolversParentTypes['Viewer'],
  Viewer: Viewer,
  Node: Node,
  ID: Scalars['ID'],
  _Service: _Service,
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  AllInOne: AllInOne,
  IallInOne: IallInOne,
  Int: Scalars['Int'],
  IpageInfo: IpageInfo,
  PageInfo: PageInfo,
};

export type KeyDirectiveResolver<Result, Parent, ContextType = any, Args = {   fields?: Maybe<Scalars['String']> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ExtendsDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ExternalDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RequiresDirectiveResolver<Result, Parent, ContextType = any, Args = {   fields?: Maybe<Scalars['String']> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ProvidesDirectiveResolver<Result, Parent, ContextType = any, Args = {   fields?: Maybe<Scalars['String']> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CostDirectiveResolver<Result, Parent, ContextType = any, Args = {   complexity?: Maybe<Maybe<Scalars['Int']>>,
  useMultipliers?: Maybe<Maybe<Scalars['Boolean']>>,
  multipliers?: Maybe<Maybe<Array<Maybe<Scalars['String']>>>> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface _AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any'
}

export type _EntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']> = {
  __resolveType: TypeResolveFn<'Viewer', ParentType, ContextType>
};

export type _ServiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']> = {
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type AllInOneResolvers<ContextType = any, ParentType extends ResolversParentTypes['AllInOne'] = ResolversParentTypes['AllInOne']> = {
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type IallInOneResolvers<ContextType = any, ParentType extends ResolversParentTypes['IallInOne'] = ResolversParentTypes['IallInOne']> = {
  __resolveType: TypeResolveFn<'AllInOne', ParentType, ContextType>,
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type IpageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['IpageInfo'] = ResolversParentTypes['IpageInfo']> = {
  __resolveType: TypeResolveFn<'PageInfo', ParentType, ContextType>,
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Viewer', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _entities?: Resolver<Array<Maybe<ResolversTypes['_Entity']>>, ParentType, ContextType, RequireFields<Query_EntitiesArgs, 'representations'>>,
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>,
  viewer?: Resolver<Maybe<ResolversTypes['Viewer']>, ParentType, ContextType>,
};

export type ViewerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Viewer'] = ResolversParentTypes['Viewer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  _Any?: GraphQLScalarType,
  _Entity?: _EntityResolvers,
  _Service?: _ServiceResolvers<ContextType>,
  AllInOne?: AllInOneResolvers<ContextType>,
  IallInOne?: IallInOneResolvers,
  IpageInfo?: IpageInfoResolvers,
  Node?: NodeResolvers,
  PageInfo?: PageInfoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Viewer?: ViewerResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  key?: KeyDirectiveResolver<any, any, ContextType>,
  extends?: ExtendsDirectiveResolver<any, any, ContextType>,
  external?: ExternalDirectiveResolver<any, any, ContextType>,
  requires?: RequiresDirectiveResolver<any, any, ContextType>,
  provides?: ProvidesDirectiveResolver<any, any, ContextType>,
  cost?: CostDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;