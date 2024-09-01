import validator from 'validator';

// LOCAL
import { UserInterface, User } from '../../models/User';

interface Validate_SignUpUsers_Interface {
  email: string;
  name: string;
  password: string;
}

export const validateSignUpUserParams = async ({
  email,
  name,
  password,
}: Validate_SignUpUsers_Interface) => {
  const errors = [];
  if (!validator.isEmail(email)) {
    errors.push({ message: 'E-mail is invalid' });
  }
  const isPasswordEmpty = validator.isEmpty(password);
  const isPasswordTooShort = !validator.isLength(password, {
    min: 5,
  });
  if (isPasswordEmpty || isPasswordTooShort) {
    errors.push({
      message: 'Password too short, it has to be longer than 5 characters',
    });
  }
  const isPasswordTooLong = !validator.isLength(password, {
    min: 5,
    max: 100,
  });
  if (isPasswordTooLong) {
    errors.push({ message: 'Password too long, max 100 characters' });
  }
  const isNameEmpty = validator.isEmpty(name);
  if (isNameEmpty) {
    errors.push({
      message: 'Name is empty',
    });
  }
  const isNameTooLong = validator.isLength(name);
  if (isNameEmpty) {
    errors.push({
      message: 'Name is too long',
    });
  }
  const userEmailExsist: UserInterface | null = await User.findOne({
    email: email,
  });
  if (userEmailExsist) {
    errors.push({
      message: 'Email is already in use',
    });
  }

  if (errors.length > 0) {
    const error: any = new Error('Invalid input.');
    error.data = errors;
    error.extensions = errors;
    error.code = 422;
    throw error;
  }
};
