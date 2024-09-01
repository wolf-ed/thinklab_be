import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// LOCAL
import {
  GrapQL_ResolverFunction_Interface,
  GraphQL_ResolverContext_Interface,
} from '../../graphql/resolver';
import { validateSignUpUserParams } from './validation';
import { UserInterface, User } from '../../models/User';
import { TOKEN_SECRET } from '../../consts/env';

interface SignUpUser_Params_Interface {
  email: string;
  name: string;
  password: string;
  token?: string;
}

interface SignUp_Return_Interface {
  email: string;
  name: string;
  _id: string;
  token: string;
}

type SignUpUser_Resolver_Interface = GrapQL_ResolverFunction_Interface<
  undefined,
  SignUpUser_Params_Interface,
  GraphQL_ResolverContext_Interface,
  SignUp_Return_Interface
>;

export const GRAPHQL_MUTATION_NAME_SIGN_UP_USER = 'SignUpUser';
export const GRAPHQL_TYPE_SIGN_UP_USER = new GraphQLObjectType({
  name: GRAPHQL_MUTATION_NAME_SIGN_UP_USER,
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    token: { type: GraphQLString },
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
const SignUpUserResolver: SignUpUser_Resolver_Interface = async (
  parent,
  { email, password, name },
  context,
  info
) => {
  await validateSignUpUserParams({ email, name, password });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user: UserInterface = new User({
    email: email,
    name: name,
    password: hashedPassword,
  });
  user.save();

  const token = jwt.sign(
    {
      userId: user.id.toString(),
      email: user.email,
    },
    TOKEN_SECRET
    // { expiresIn: '1h' }
  );

  const finalUser = { ...user.toObject(), token };
  return finalUser;
};

export const SignUpUserArgs = {
  email: { type: new GraphQLNonNull(GraphQLString) },
  name: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },
};

export const GraphQLSignUpUserMutation = {
  type: GRAPHQL_TYPE_SIGN_UP_USER,
  resolve: SignUpUserResolver,
  args: SignUpUserArgs,
};
