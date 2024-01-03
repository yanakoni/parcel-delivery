import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().nonempty('Email is required.'),
  password: z.string().nonempty('Password is required.'),
});

export { LoginSchema };
