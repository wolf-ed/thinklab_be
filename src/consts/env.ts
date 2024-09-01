require('dotenv').config();

// secret
export const TOKEN_SECRET: string = process.env.TOKEN_SECRET as string;

// port
export const PORT: string = process.env.PORT as string;

// mongo
export const MONGO_URL_FIRST = process.env.MONGO_URL_FIRST;
export const MONGO_URL_SECOND = process.env.MONGO_URL_SECOND;
export const MONGO_URL_THIRD = process.env.MONGO_URL_THIRD;
export const MONGO_DATABASE = process.env.MONGO_DATABASE;
export const MONGO_DB_PASS = process.env.MONGO_DB_PASS;
export const ALLOWED_PORTS = process.env.ALLOWED_PORTS;
