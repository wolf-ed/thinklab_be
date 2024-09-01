import mongoose, { Document, Schema } from 'mongoose';

import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const MODEL_NAME_USER = 'User';

export interface UserInterface extends Document {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
}

export const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

export const GRAPHQL_USER = new GraphQLObjectType({
  name: MODEL_NAME_USER,
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    telephone: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export const User = mongoose.model<UserInterface>(MODEL_NAME_USER, UserSchema);
