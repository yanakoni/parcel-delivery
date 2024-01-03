import {
  SignUpWithTokenSchemaInput,
  SignUpWithoutTokenSchemaInput,
} from '../schema';

export const isSignUpWithoutTokenSchemaInput = (
  input: SignUpWithTokenSchemaInput | SignUpWithoutTokenSchemaInput,
): input is SignUpWithoutTokenSchemaInput => {
  return input.hasOwnProperty('email');
};
