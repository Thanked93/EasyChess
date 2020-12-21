export const errorHandle = (
  name: string,
  password: string,
  cPassword?: string
): Array<string> => {
  const errors: Array<string> = [];
  if (!name) {
    errors.push("Please enter a username.");
  }
  if (!password) {
    errors.push("Please enter a password.");
  }
  if (cPassword && password !== cPassword) {
    errors.push("Your password doesn't match.");
  }
  return errors;
};
