import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLError,
} from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// LOCAL
import {
  GrapQL_ResolverFunction_Interface,
  GraphQL_ResolverContext_Interface,
} from '../../graphql/resolver';
import { UserInterface, User } from '../../models/User';
import { validateLogInParams } from './validation';
import { TOKEN_SECRET } from '../../consts/env';

interface LogIn_Params_Interface {
  email: string;
  password: string;
}

interface LogIn_Return_Interface {
  token?: string;
  _id?: string;
  name?: string;
  email?: string;
}

type LogIn_Resolver_Interface = GrapQL_ResolverFunction_Interface<
  undefined,
  LogIn_Params_Interface,
  GraphQL_ResolverContext_Interface,
  LogIn_Return_Interface
>;

export const GRAPHQL_QUERY_NAME_LOG_IN = 'LogIn';
export const GRAPHQL_TYPE_LOG_IN = new GraphQLObjectType({
  name: GRAPHQL_QUERY_NAME_LOG_IN,
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    name: { type: GraphQLString },
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
const LogInResolver: LogIn_Resolver_Interface = async (
  parent,
  { email, password },
  context,
  info
) => {
  try {
    await validateLogInParams({ email });

    const user: UserInterface | null = await User.findOne({ email });
    if (!user) {
      throw new GraphQLError('Email or password incorrect', {
        extensions: {
          code: 'UNAUTHENTICATED',
          statusCode: 401,
        },
      });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new GraphQLError('Email or password incorrect', {
        extensions: {
          code: 'UNAUTHENTICATED',
          statusCode: 401,
        },
      });
    }

    const token = jwt.sign(
      {
        userId: user.id.toString(),
        email: user.email,
      },
      TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      _id: user.id.toString(),
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    console.error('Error during LogIn:', error);
    if (!(error instanceof GraphQLError)) {
      throw new GraphQLError('An error occurred during login', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          detail: (error as Error).message,
        },
      });
    }
    throw error;
  }
};

export const LogInArgs = {
  email: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },
};

export const GraphQLLogInQuery = {
  type: GRAPHQL_TYPE_LOG_IN,
  resolve: LogInResolver,
  args: LogInArgs,
};
