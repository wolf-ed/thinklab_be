"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQL_base_Schema = void 0;
const graphql_1 = require("graphql");
// LOCAL
const SingUp_1 = require("../functionalities/SignUp/SingUp");
const LogIn_1 = require("../functionalities/LogIn/LogIn");
const CodeSandbox_1 = require("../functionalities/CodeSandbox/CodeSandbox");
const Posts_1 = require("../functionalities/Posts/Posts");
const GetPosts_1 = require("../functionalities/Posts/GetPosts");
exports.graphQL_base_Schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'Query',
        fields: {
            [LogIn_1.GRAPHQL_QUERY_NAME_LOG_IN]: LogIn_1.GraphQLLogInQuery,
            [GetPosts_1.GRAPHQL_QUERY_NAME_GET_POSTS]: GetPosts_1.GrapQLGetPostsQuery,
        },
    }),
    mutation: new graphql_1.GraphQLObjectType({
        name: 'Mutation',
        fields: {
            [SingUp_1.GRAPHQL_MUTATION_NAME_SIGN_UP_USER]: SingUp_1.GraphQLSignUpUserMutation,
            [CodeSandbox_1.GRAPHQL_MUTATION_NAME_CODE_SANDBOX]: CodeSandbox_1.GrapQLCodeSandboxMutation,
            [Posts_1.GRAPHQL_MUTATION_NAME_POST]: Posts_1.GrapQLPostMutation,
        },
    }),
});
