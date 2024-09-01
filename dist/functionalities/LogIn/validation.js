"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogInParams = void 0;
const validator_1 = __importDefault(require("validator"));
const validateLogInParams = async ({ email, }) => {
    const errors = [];
    if (!email) {
        errors.push({ message: 'E-mail is required' });
    }
    if (!validator_1.default.isEmail(email)) {
        errors.push({ message: 'E-mail is invalid' });
    }
    if (errors.length > 0) {
        const error = new Error('Invalid input.');
        error.data = errors;
        error.extensions = errors;
        error.code = 422;
        throw error;
    }
};
exports.validateLogInParams = validateLogInParams;
