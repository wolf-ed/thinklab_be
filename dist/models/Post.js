"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.GRAPHQL_POST = exports.PostSchema = exports.POSTS_VISIBILITIES_ENUM = exports.MODEL_NAME_POST = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const graphql_1 = require("graphql");
exports.MODEL_NAME_POST = 'Post';
var POSTS_VISIBILITIES_ENUM;
(function (POSTS_VISIBILITIES_ENUM) {
    POSTS_VISIBILITIES_ENUM["PUBLIC"] = "public";
    POSTS_VISIBILITIES_ENUM["PRIVATE"] = "private";
})(POSTS_VISIBILITIES_ENUM || (exports.POSTS_VISIBILITIES_ENUM = POSTS_VISIBILITIES_ENUM = {}));
exports.PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    userName: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        required: true,
        enum: POSTS_VISIBILITIES_ENUM,
    },
});
exports.GRAPHQL_POST = new graphql_1.GraphQLObjectType({
    name: exports.MODEL_NAME_POST,
    fields: () => ({
        id: { type: graphql_1.GraphQLID, resolve: (post) => post._id.toString() },
        title: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        userName: { type: graphql_1.GraphQLString },
        userId: { type: graphql_1.GraphQLString },
        visibility: { type: graphql_1.GraphQLString },
    }),
});
exports.Post = mongoose_1.default.model(exports.MODEL_NAME_POST, exports.PostSchema);
