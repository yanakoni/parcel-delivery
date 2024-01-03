import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryErrorType = (
  error: any,
): error is FetchBaseQueryError => error && 'status' in error;
