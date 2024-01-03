import { z } from 'zod';
import {
  hasNumber,
  hasLowercasedLetter,
  hasUppercasedLetter,
} from '../../../utils';

const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Minimum 8 characters.')
      .nonempty('Password is required.')
      .refine(hasLowercasedLetter, {
        message: 'Use at least one letter in lower case.',
      })
      .refine(hasUppercasedLetter, {
        message: 'Use at least one letter in upper case.',
      })
      .refine(hasNumber, {
        message: 'Use at least one number.',
      }),
    passwordRepeat: z.string().nonempty('Repeat the password.'),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Passwords must match',
    path: ['passwordRepeat'],
  });

export { ChangePasswordSchema };
