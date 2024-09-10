"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrapQLGetPostsQuery = exports.GRAPHQL_TYPE_GET_POSTS = exports.GRAPHQL_QUERY_NAME_GET_POSTS = exports.GetPostsArgs = void 0;
const graphql_1 = require("graphql");
const error_1 = require("../../utils/error");
const Post_1 = require("../../models/Post");
exports.GetPostsArgs = {
    id: { type: graphql_1.GraphQLString },
};
exports.GRAPHQL_QUERY_NAME_GET_POSTS = 'GetPosts';
exports.GRAPHQL_TYPE_GET_POSTS = new graphql_1.GraphQLObjectType({
    name: exports.GRAPHQL_QUERY_NAME_GET_POSTS,
    fields: () => ({
        posts: { type: new graphql_1.GraphQLList(Post_1.GRAPHQL_POST) },
    }),
});
const GetPostsResolver = async (parent, params, context, info) => {
    const req = context?.req;
    // const userId = authAndGetUserId(req);
    // const user: UserInterface | null = await User.findById(userId);
    const { id } = params;
    if (id) {
        const post = await Post_1.Post.findById(id);
        if (!post) {
            throw new error_1.ApiError('Post not found or not accessible', 404);
        }
        // if (post.visibility !== POSTS_VISIBILITIES_ENUM.PUBLIC) {
        //   if (!userId) {
        //     throw new ApiError('Post not found or not accessible', 404);
        //   }
        //   if (post.userId.toString() !== userId) {
        //     throw new ApiError('Post not found or not accessible', 404);
        //   }
        // }
        return { posts: [post] };
    }
    else {
        const posts = await Post_1.Post.find().limit(20);
        return { posts };
    }
};
exports.GrapQLGetPostsQuery = {
    type: exports.GRAPHQL_TYPE_GET_POSTS,
    resolve: GetPostsResolver,
    args: exports.GetPostsArgs,
};
