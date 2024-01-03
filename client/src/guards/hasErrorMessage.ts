export const hasErrorMessage = (error: any): error is { message: string } =>
  typeof error === 'object' && error !== null && 'message' in error;
