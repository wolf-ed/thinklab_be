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
import {
  GRAPHQL_MUTATION_NAME_POST,
  GrapQLPostMutation,
} from '../functionalities/Posts/Posts';
import {
  GRAPHQL_QUERY_NAME_GET_POSTS,
  GrapQLGetPostsQuery,
} from '../functionalities/Posts/GetPosts';

export const graphQL_base_Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      [GRAPHQL_QUERY_NAME_LOG_IN]: GraphQLLogInQuery,
      [GRAPHQL_QUERY_NAME_GET_POSTS]: GrapQLGetPostsQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      [GRAPHQL_MUTATION_NAME_SIGN_UP_USER]: GraphQLSignUpUserMutation,
      [GRAPHQL_MUTATION_NAME_CODE_SANDBOX]: GrapQLCodeSandboxMutation,
      [GRAPHQL_MUTATION_NAME_POST]: GrapQLPostMutation,
    },
  }),
});
