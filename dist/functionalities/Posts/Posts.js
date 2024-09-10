"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrapQLPostMutation = exports.GRAPHQL_TYPE_POST = exports.GRAPHQL_MUTATION_NAME_POST = exports.PostArgs = void 0;
const graphql_1 = require("graphql");
const authAndGetUserId_1 = require("../../utils/authAndGetUserId");
const User_1 = require("../../models/User");
const error_1 = require("../../utils/error");
const Post_1 = require("../../models/Post"); // Assuming Post is your Mongoose model
exports.PostArgs = {
    title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    visibility: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    id: { type: graphql_1.GraphQLString },
};
exports.GRAPHQL_MUTATION_NAME_POST = 'SavePost';
exports.GRAPHQL_TYPE_POST = new graphql_1.GraphQLObjectType({
    name: exports.GRAPHQL_MUTATION_NAME_POST,
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
    }),
});
const PostResolver = async (parent, params, context, info) => {
    const req = context?.req;
    const userId = (0, authAndGetUserId_1.authAndGetUserId)(req);
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new error_1.ApiError('User not found', 401);
    }
    const { title, content, id, visibility } = params;
    if (!title || !content) {
        throw new error_1.ApiError('Title and content are required', 400);
    }
    if (!title || !content || !visibility) {
        throw new error_1.ApiError('Title, content, and visibility are required', 400);
    }
    if (id) {
        const existingPost = await Post_1.Post.findById(id);
        if (!existingPost) {
            throw new error_1.ApiError('Post not found', 404);
        }
        if (existingPost.userId !== userId) {
            throw new error_1.ApiError('You are not authorized to edit this post', 403);
        }
        // Update the post
        existingPost.title = title;
        existingPost.content = content;
        existingPost.visibility = visibility;
        await existingPost.save();
        return {
            id: existingPost._id.toString(),
        };
    }
    else {
        const newPost = new Post_1.Post({
            title,
            content,
            userName: user.name,
            userId: user._id,
            visibility,
        });
        await newPost.save();
        return {
            id: newPost._id.toString(),
        };
    }
};
exports.GrapQLPostMutation = {
    type: exports.GRAPHQL_TYPE_POST,
    resolve: PostResolver,
    args: exports.PostArgs,
};
