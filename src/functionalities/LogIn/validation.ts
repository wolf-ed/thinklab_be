import validator from 'validator';

interface Validate_LogIn_Interface {
  email: string;
}

export const validateLogInParams = async ({
  email,
}: Validate_LogIn_Interface) => {
  const errors = [];
  if (!email) {
    errors.push({ message: 'E-mail is required' });
  }
  if (!validator.isEmail(email)) {
    errors.push({ message: 'E-mail is invalid' });
  }

  if (errors.length > 0) {
    const error: any = new Error('Invalid input.');
    error.data = errors;
    error.extensions = errors;
    error.code = 422;
    throw error;
  }
};
