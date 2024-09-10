import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

// LOCAL
import {
  GrapQL_ResolverFunction_Interface,
  GraphQL_ResolverContext_Interface,
} from '../../graphql/resolver';
import { authAndGetUserId } from '../../utils/authAndGetUserId';
import { UserInterface, User } from '../../models/User';
import { ApiError } from '../../utils/error';
import { Post, PostInterface } from '../../models/Post'; // Assuming Post is your Mongoose model

export interface Post_Params_Interface {
  title: string;
  content: string;
  id?: string;
  visibility: string;
}
export const PostArgs = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  content: { type: new GraphQLNonNull(GraphQLString) },
  visibility: { type: new GraphQLNonNull(GraphQLString) },
  id: { type: GraphQLString },
};

interface Post_Return_Interface {
  id: string;
}

type Post_Resolver_Interface = GrapQL_ResolverFunction_Interface<
  undefined,
  Post_Params_Interface,
  GraphQL_ResolverContext_Interface,
  Promise<Post_Return_Interface>
>;

export const GRAPHQL_MUTATION_NAME_POST = 'SavePost';
export const GRAPHQL_TYPE_POST = new GraphQLObjectType({
  name: GRAPHQL_MUTATION_NAME_POST,
  fields: () => ({
    id: { type: GraphQLString },
  }),
});

const PostResolver: Post_Resolver_Interface = async (
  parent,
  params,
  context,
  info
) => {
  const req = context?.req;
  const userId = authAndGetUserId(req);
  const user: UserInterface | null = await User.findById(userId);

  if (!user) {
    throw new ApiError('User not found', 401);
  }

  const { title, content, id, visibility } = params;

  if (!title || !content) {
    throw new ApiError('Title and content are required', 400);
  }
  if (!title || !content || !visibility) {
    throw new ApiError('Title, content, and visibility are required', 400);
  }
  if (id) {
    const existingPost: PostInterface | null = await Post.findById(id);

    if (!existingPost) {
      throw new ApiError('Post not found', 404);
    }

    if (existingPost.userId !== userId) {
      throw new ApiError('You are not authorized to edit this post', 403);
    }

    // Update the post
    existingPost.title = title;
    existingPost.content = content;
    existingPost.visibility = visibility;
    await existingPost.save();

    return {
      id: existingPost._id.toString(),
    };
  } else {
    const newPost = new Post({
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

export const GrapQLPostMutation = {
  type: GRAPHQL_TYPE_POST,
  resolve: PostResolver,
  args: PostArgs,
};
