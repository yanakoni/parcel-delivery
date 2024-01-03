import { FormEvent, useCallback, useEffect, useState } from 'react';
import { ResetPasswordSchema } from './schema';
import { useResetPasswordMutation } from '../../../api';
import { showNotification } from '../../../utils';
import {
  isValidationErrorObject,
  isFetchBaseQueryErrorType,
  isZodError,
  isApiError,
} from '../../../guards';

type ResetPasswordForm = {
  email: string;
};

const initialErrors = {
  email: '',
};

const isSuccessResponse = (
  response: any,
): response is { data: 'success' | 'error'; message: string } =>
  typeof response === 'object' &&
  response !== null &&
  'data' in response &&
  'message' in response;

const useResetPasswordForm = () => {
  const [resetPassword, { isError, error, isLoading }] =
    useResetPasswordMutation();
  const [errors, setErrors] = useState(initialErrors);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const handleResetPasswordError = useCallback(() => {
    if (isError && !!error && isFetchBaseQueryErrorType(error)) {
      const { data } = error;

      if (!isValidationErrorObject(data)) return;

      const { errors } = data;

      setErrors(
        Object.entries(errors).reduce((acc, [field, message]) => {
          return { ...acc, [field]: message };
        }, {} as ResetPasswordForm),
      );
    }
  }, [isError, error]);

  useEffect(handleResetPasswordError, [isError, error]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        setErrors(initialErrors);
        const formData = new FormData(event.currentTarget);

        const data = {
          email: formData.get('email') as string,
        };

        const validatedData = ResetPasswordSchema.parse(data);

        const response = await resetPassword(validatedData).unwrap();

        if (!isSuccessResponse(response)) {
          return showNotification('Unexpected error', 'error');
        }

        setRequestSuccess(true);
      } catch (err) {
        if (isZodError(err)) {
          setErrors(
            err.issues.reduce((acc, error) => {
              return { ...acc, [error.path[0]]: error.message };
            }, {} as ResetPasswordForm),
          );
        } else if (isApiError(err)) {
          const {
            data: { code, message },
          } = err;
          showNotification(`${code.toUpperCase()}: ${message}`, 'error');
        }
      }
    },
    [resetPassword],
  );

  return { handleSubmit, errors, isLoading, requestSuccess };
};

export { useResetPasswordForm };
