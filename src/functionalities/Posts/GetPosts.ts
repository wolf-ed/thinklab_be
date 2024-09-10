import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

// LOCAL IMPORTS REMAIN THE SAME
import {
  GrapQL_ResolverFunction_Interface,
  GraphQL_ResolverContext_Interface,
} from '../../graphql/resolver';
import { authAndGetUserId } from '../../utils/authAndGetUserId';
import { UserInterface, User } from '../../models/User';
import { ApiError } from '../../utils/error';
import {
  GRAPHQL_POST,
  Post,
  PostInterface,
  POSTS_VISIBILITIES_ENUM,
} from '../../models/Post';

export interface GetPosts_Params_Interface {
  id?: string;
}
export const GetPostsArgs = {
  id: { type: GraphQLString },
};

interface GetPosts_Return_Interface {
  posts: PostInterface[];
}

type GetPosts_Resolver_Interface = GrapQL_ResolverFunction_Interface<
  undefined,
  GetPosts_Params_Interface,
  GraphQL_ResolverContext_Interface,
  Promise<GetPosts_Return_Interface>
>;

export const GRAPHQL_QUERY_NAME_GET_POSTS = 'GetPosts';
export const GRAPHQL_TYPE_GET_POSTS = new GraphQLObjectType({
  name: GRAPHQL_QUERY_NAME_GET_POSTS,
  fields: () => ({
    posts: { type: new GraphQLList(GRAPHQL_POST) },
  }),
});

const GetPostsResolver: GetPosts_Resolver_Interface = async (
  parent,
  params,
  context,
  info
) => {
  const req = context?.req;
  // const userId = authAndGetUserId(req);
  // const user: UserInterface | null = await User.findById(userId);

  const { id } = params;
  if (id) {
    const post = await Post.findById(id);

    if (!post) {
      throw new ApiError('Post not found or not accessible', 404);
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
  } else {
    const posts = await Post.find().limit(20);

    return { posts };
  }
};

export const GrapQLGetPostsQuery = {
  type: GRAPHQL_TYPE_GET_POSTS,
  resolve: GetPostsResolver,
  args: GetPostsArgs,
};
