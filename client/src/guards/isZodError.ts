import { ZodError } from 'zod';

export const isZodError = (error: any): error is ZodError =>
  error instanceof ZodError;
