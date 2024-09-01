"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrapQLCodeSandboxMutation = exports.GRAPHQL_TYPE_CODE_SANDBOX = exports.GRAPHQL_MUTATION_NAME_CODE_SANDBOX = exports.CodeSandboxArgs = void 0;
const graphql_1 = require("graphql");
const utils_1 = require("./utils");
exports.CodeSandboxArgs = {
    code: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    language: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
exports.GRAPHQL_MUTATION_NAME_CODE_SANDBOX = 'CodeSandbox';
exports.GRAPHQL_TYPE_CODE_SANDBOX = new graphql_1.GraphQLObjectType({
    name: exports.GRAPHQL_MUTATION_NAME_CODE_SANDBOX,
    fields: () => ({
        // to be return:
        code: { type: graphql_1.GraphQLString },
        result: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        consoleLogs: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        errorRunningCode: { type: graphql_1.GraphQLString },
    }),
});
const CodeSandboxResolver = async (parent, params, context, info) => {
    const { code, language } = params;
    const { result, consoleLogs, errorRunningCode } = await (0, utils_1.SelectSandboxAndExecuteCode)(code, language);
    return {
        code: code,
        result: result,
        consoleLogs: consoleLogs,
        errorRunningCode: errorRunningCode,
    };
};
exports.GrapQLCodeSandboxMutation = {
    type: exports.GRAPHQL_TYPE_CODE_SANDBOX,
    resolve: CodeSandboxResolver,
    args: exports.CodeSandboxArgs,
};
