import { CustomError } from './customError';

export const handleError = (err) => {
  if (err instanceof CustomError) {
    return { message: err.message };
  } else if (
    err?.code === 'auth/wrong-password' ||
    err?.code === 'auth/user-not-found'
  ) {
    return {
      message: 'User/password is incorrect!',
    };
  } else if (err.code === 'auth/email-already-in-use') {
    return {
      message: 'User already exists!',
    };
  } else {
    return {
      message:
        'An unexpected error occurred. Please contact juanquintana1996@gmail.com.',
    };
  }
};
