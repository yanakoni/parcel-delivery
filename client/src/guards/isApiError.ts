export const isApiError = (
  error: any,
): error is { data: { code: string; message: string } } =>
  typeof error === 'object' &&
  error !== null &&
  'data' in error &&
  'code' in error.data &&
  'message' in error.data;
