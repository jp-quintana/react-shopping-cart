export const handleError = (err) => {
  if (err instanceof CustomError) {
    return { message: err.message };
  } else {
    return { message: 'Internal server error.' };
  }
};
