import { TypeOf, intersection, object, string } from 'zod';
import {
  hasNumber,
  hasLowercasedLetter,
  hasUppercasedLetter,
} from '../../../utils';

const signUpBaseSchema = object({
  first_name: string().nonempty('First name is required.'),
  last_name: string().nonempty('Last name is required.'),
  password: string()
    .min(8, 'Minimum 8 characters.')
    .nonempty('Password is required.')
    .refine(hasNumber, {
      message: 'Use at least one number.',
    })
    .refine(hasLowercasedLetter, {
      message: 'Use at least one letter in lower case.',
    })
    .refine(hasUppercasedLetter, {
      message: 'Use at least one letter in upper case.',
    }),
  passwordRepeat: string().nonempty('Repeat the password.'),
}).refine((data) => data.password === data.passwordRepeat, {
  message: 'Passwords must match',
  path: ['passwordRepeat'],
});

export const signUpWithoutTokenSchema = intersection(
  signUpBaseSchema,
  object({
    email: string().nonempty('Email is required.'),
  }),
);

export const signUpWithTokenSchema = intersection(signUpBaseSchema, object({}));

export type SignUpWithoutTokenSchemaInput = TypeOf<
  typeof signUpWithoutTokenSchema
>;
export type SignUpWithTokenSchemaInput = TypeOf<typeof signUpWithTokenSchema>;
