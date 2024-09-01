import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';

// LOCAL
import {
  GrapQL_ResolverFunction_Interface,
  GraphQL_ResolverContext_Interface,
} from '../../graphql/resolver';
import { Languages_Sandbox_enum } from './const';
import { SelectSandboxAndExecuteCode } from './utils';

export interface CodeSandbox_Params_Interface {
  code: string;
  language: Languages_Sandbox_enum;
}
export const CodeSandboxArgs = {
  code: { type: new GraphQLNonNull(GraphQLString) },
  language: { type: new GraphQLNonNull(GraphQLString) },
};

interface CodeSandbox_Return_Interface {
  code: string;
  result: string;
  consoleLogs: string[];
  errorRunningCode: string | null;
}

type CodeSandbox_Resolver_Interface = GrapQL_ResolverFunction_Interface<
  undefined,
  CodeSandbox_Params_Interface,
  GraphQL_ResolverContext_Interface,
  Promise<CodeSandbox_Return_Interface>
>;

export const GRAPHQL_MUTATION_NAME_CODE_SANDBOX = 'CodeSandbox';
export const GRAPHQL_TYPE_CODE_SANDBOX = new GraphQLObjectType({
  name: GRAPHQL_MUTATION_NAME_CODE_SANDBOX,
  fields: () => ({
    // to be return:
    code: { type: GraphQLString },
    result: { type: new GraphQLNonNull(GraphQLString) },
    consoleLogs: { type: new GraphQLList(GraphQLString) },
    errorRunningCode: { type: GraphQLString },
  }),
});

const CodeSandboxResolver: CodeSandbox_Resolver_Interface = async (
  parent,
  params,
  context,
  info
) => {
  const { code, language } = params;
  const { result, consoleLogs, errorRunningCode } =
    await SelectSandboxAndExecuteCode(code, language);

  return {
    code: code,
    result: result,
    consoleLogs: consoleLogs,
    errorRunningCode: errorRunningCode,
  };
};

export const GrapQLCodeSandboxMutation = {
  type: GRAPHQL_TYPE_CODE_SANDBOX,
  resolve: CodeSandboxResolver,
  args: CodeSandboxArgs,
};
