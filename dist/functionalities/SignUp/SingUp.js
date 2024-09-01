"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLSignUpUserMutation = exports.SignUpUserArgs = exports.GRAPHQL_TYPE_SIGN_UP_USER = exports.GRAPHQL_MUTATION_NAME_SIGN_UP_USER = void 0;
const graphql_1 = require("graphql");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = require("./validation");
const User_1 = require("../../models/User");
const env_1 = require("../../consts/env");
exports.GRAPHQL_MUTATION_NAME_SIGN_UP_USER = 'SignUpUser';
exports.GRAPHQL_TYPE_SIGN_UP_USER = new graphql_1.GraphQLObjectType({
    name: exports.GRAPHQL_MUTATION_NAME_SIGN_UP_USER,
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        email: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString },
    }),
});
/**
mutation {
  SignUpUser(email: "johndoe@gmail.com", password: "12345", name: "John Doe") {
    _id
    email
    name
  }
}
   */
const SignUpUserResolver = async (parent, { email, password, name }, context, info) => {
    await (0, validation_1.validateSignUpUserParams)({ email, name, password });
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    const user = new User_1.User({
        email: email,
        name: name,
        password: hashedPassword,
    });
    user.save();
    const token = jsonwebtoken_1.default.sign({
        userId: user.id.toString(),
        email: user.email,
    }, env_1.TOKEN_SECRET
    // { expiresIn: '1h' }
    );
    const finalUser = { ...user.toObject(), token };
    return finalUser;
};
exports.SignUpUserArgs = {
    email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
exports.GraphQLSignUpUserMutation = {
    type: exports.GRAPHQL_TYPE_SIGN_UP_USER,
    resolve: SignUpUserResolver,
    args: exports.SignUpUserArgs,
};
