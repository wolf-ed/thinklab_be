"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_2 = require("graphql-http/lib/use/express");
const graphql_helix_1 = require("graphql-helix");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const cors_1 = __importDefault(require("cors"));
// LOCAL
const schema_1 = require("./graphql/schema");
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("./middleware/auth");
const db_1 = require("./consts/db");
const env_1 = require("./consts/env");
const cors_2 = require("./utils/cors");
const requestsLimit_1 = require("./utils/requestsLimit");
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_2.corsOptions));
app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(auth_1.authMiddleware);
app.use('/graphql', requestsLimit_1.requestsLimit);
app.use('/graphql', (req, res, next) => {
    const handler = (0, express_2.createHandler)({
        schema: schema_1.graphQL_base_Schema,
        context: () => ({ req, res }),
        formatError: (e) => {
            const formattedError = { ...e };
            return formattedError;
        },
    });
    return handler(req, res, next);
});
app.use((0, helmet_1.default)());
app.use(helmet_1.default.hidePoweredBy());
app.use(helmet_1.default.referrerPolicy({
    policy: 'no-referrer',
}));
app.use(helmet_1.default.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
}));
app.get('/graphiql', (req, res) => {
    res.send((0, graphql_helix_1.renderGraphiQL)({ endpoint: '/graphql' }));
});
mongoose_1.default
    .connect(db_1.MONGODB_URI)
    .then((result) => {
    console.log('mongo connected correctly');
    app.listen(env_1.PORT || 8080);
})
    .catch((err) => {
    console.log(err);
});
