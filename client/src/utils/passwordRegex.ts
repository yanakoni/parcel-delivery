const hasNumber = (value: string): boolean => {
  return /\d/.test(value);
};

const hasUppercasedLetter = (value: string): boolean => {
  return /[A-Z]/.test(value);
};

const hasLowercasedLetter = (value: string): boolean => {
  return /[a-z]/.test(value);
};

export { hasNumber, hasUppercasedLetter, hasLowercasedLetter };
