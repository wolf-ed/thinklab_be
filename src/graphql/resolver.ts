import { Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { Request_Interface } from '../middleware/auth';

export interface GraphQL_ResolverContext_Interface {
  req: Request_Interface;
  res: Response;
}

export interface GrapQL_ResolverFunction_Interface<
  TSource,
  TArgs,
  TContext,
  TResult
> {
  (source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo):
    | TResult
    | Promise<TResult>;
}
