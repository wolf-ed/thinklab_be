"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignUpUserParams = void 0;
const validator_1 = __importDefault(require("validator"));
// LOCAL
const User_1 = require("../../models/User");
const validateSignUpUserParams = async ({ email, name, password, }) => {
    const errors = [];
    if (!validator_1.default.isEmail(email)) {
        errors.push({ message: 'E-mail is invalid' });
    }
    const isPasswordEmpty = validator_1.default.isEmpty(password);
    const isPasswordTooShort = !validator_1.default.isLength(password, {
        min: 5,
    });
    if (isPasswordEmpty || isPasswordTooShort) {
        errors.push({
            message: 'Password too short, it has to be longer than 5 characters',
        });
    }
    const isPasswordTooLong = !validator_1.default.isLength(password, {
        min: 5,
        max: 100,
    });
    if (isPasswordTooLong) {
        errors.push({ message: 'Password too long, max 100 characters' });
    }
    const isNameEmpty = validator_1.default.isEmpty(name);
    if (isNameEmpty) {
        errors.push({
            message: 'Name is empty',
        });
    }
    const isNameTooLong = validator_1.default.isLength(name);
    if (isNameEmpty) {
        errors.push({
            message: 'Name is too long',
        });
    }
    const userEmailExsist = await User_1.User.findOne({
        email: email,
    });
    if (userEmailExsist) {
        errors.push({
            message: 'Email is already in use',
        });
    }
    if (errors.length > 0) {
        const error = new Error('Invalid input.');
        error.data = errors;
        error.extensions = errors;
        error.code = 422;
        throw error;
    }
};
exports.validateSignUpUserParams = validateSignUpUserParams;
