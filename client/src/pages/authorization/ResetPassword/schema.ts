import { z } from 'zod';

const ResetPasswordSchema = z.object({
  email: z.string().nonempty('Email is required.'),
});

export { ResetPasswordSchema };
