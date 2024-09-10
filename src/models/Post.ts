import mongoose, { Document, Schema } from 'mongoose';
import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const MODEL_NAME_POST = 'Post';

export enum POSTS_VISIBILITIES_ENUM {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export interface PostInterface extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  userName: string;
  userId: string;
  visibility: string;
}

export const PostSchema = new Schema<PostInterface>({
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

export const GRAPHQL_POST = new GraphQLObjectType({
  name: MODEL_NAME_POST,
  fields: () => ({
    id: { type: GraphQLID, resolve: (post) => post._id.toString() },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    userName: { type: GraphQLString },
    userId: { type: GraphQLString },
    visibility: { type: GraphQLString },
  }),
});

export const Post = mongoose.model<PostInterface>(MODEL_NAME_POST, PostSchema);
