import { GraphQLSchema, GraphQLObjectType } from 'graphql';

// LOCAL
import {
  GRAPHQL_MUTATION_NAME_SIGN_UP_USER,
  GraphQLSignUpUserMutation,
} from '../functionalities/SignUp/SingUp';
import {
  GRAPHQL_QUERY_NAME_LOG_IN,
  GraphQLLogInQuery,
} from '../functionalities/LogIn/LogIn';

import {
  GRAPHQL_MUTATION_NAME_CODE_SANDBOX,
  GrapQLCodeSandboxMutation,
} from '../functionalities/CodeSandbox/CodeSandbox';

export const graphQL_base_Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      [GRAPHQL_QUERY_NAME_LOG_IN]: GraphQLLogInQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      [GRAPHQL_MUTATION_NAME_SIGN_UP_USER]: GraphQLSignUpUserMutation,
      [GRAPHQL_MUTATION_NAME_CODE_SANDBOX]: GrapQLCodeSandboxMutation,
    },
  }),
});
