"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLLogInQuery = exports.LogInArgs = exports.GRAPHQL_TYPE_LOG_IN = exports.GRAPHQL_QUERY_NAME_LOG_IN = void 0;
const graphql_1 = require("graphql");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../models/User");
const validation_1 = require("./validation");
const env_1 = require("../../consts/env");
exports.GRAPHQL_QUERY_NAME_LOG_IN = 'LogIn';
exports.GRAPHQL_TYPE_LOG_IN = new graphql_1.GraphQLObjectType({
    name: exports.GRAPHQL_QUERY_NAME_LOG_IN,
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        email: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    }),
});
/**
query {
  LogIn(email: "johndoe@gmail.com", password: "123wefewfcer45") {
    token
    _id
    name
  }
}
   */
const LogInResolver = async (parent, { email, password }, context, info) => {
    try {
        await (0, validation_1.validateLogInParams)({ email });
        const user = await User_1.User.findOne({ email });
        if (!user) {
            throw new graphql_1.GraphQLError('Email or password incorrect', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    statusCode: 401,
                },
            });
        }
        const isEqual = await bcrypt_1.default.compare(password, user.password);
        if (!isEqual) {
            throw new graphql_1.GraphQLError('Email or password incorrect', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    statusCode: 401,
                },
            });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id.toString(),
            email: user.email,
        }, env_1.TOKEN_SECRET, { expiresIn: '1h' });
        return {
            token,
            _id: user.id.toString(),
            email: user.email,
            name: user.name,
        };
    }
    catch (error) {
        console.error('Error during LogIn:', error);
        if (!(error instanceof graphql_1.GraphQLError)) {
            throw new graphql_1.GraphQLError('An error occurred during login', {
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    detail: error.message,
                },
            });
        }
        throw error;
    }
};
exports.LogInArgs = {
    email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
exports.GraphQLLogInQuery = {
    type: exports.GRAPHQL_TYPE_LOG_IN,
    resolve: LogInResolver,
    args: exports.LogInArgs,
};
