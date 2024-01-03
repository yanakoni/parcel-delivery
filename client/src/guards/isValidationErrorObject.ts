export const isValidationErrorObject = (obj: any): obj is { errors: any } =>
  typeof obj === 'object' && obj !== null && 'errors' in obj;
