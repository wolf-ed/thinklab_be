import express from 'express';
import bodyParser from 'body-parser';
import { createHandler } from 'graphql-http/lib/use/express';
import { renderGraphiQL } from 'graphql-helix';
import helmet from 'helmet';
import morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import cors from 'cors';

// LOCAL
import { graphQL_base_Schema } from './graphql/schema';
import mongoose from 'mongoose';
import { authMiddleware } from './middleware/auth';
import { MONGODB_URI } from './consts/db';
import { PORT } from './consts/env';
import { corsOptions } from './utils/cors';
import { requestsLimit } from './utils/requestsLimit';

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

const app = express();

app.use(cors(corsOptions));

app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(authMiddleware);

app.use('/graphql', requestsLimit);
app.use('/graphql', (req, res, next) => {
  const handler = createHandler({
    schema: graphQL_base_Schema,
    context: () => ({ req, res }),
    formatError: (e) => {
      const formattedError = { ...e };
      return formattedError;
    },
  });
  return handler(req, res, next);
});
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(
  helmet.referrerPolicy({
    policy: 'no-referrer',
  })
);
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  })
);
app.get('/graphiql', (req, res) => {
  res.send(renderGraphiQL({ endpoint: '/graphql' }));
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log('mongo connected correctly');
    app.listen(PORT || 8080);
  })
  .catch((err) => {
    console.log(err);
  });
