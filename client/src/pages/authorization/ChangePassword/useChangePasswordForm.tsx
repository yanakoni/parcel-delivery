import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordSchema } from './schema';
import { useChangePasswordMutation } from '../../../api';
import { showNotification } from '../../../utils';
import { ROUTES } from '../../../consts';
import {
  isValidationErrorObject,
  isFetchBaseQueryErrorType,
  isZodError,
  isApiError,
  hasErrorMessage,
} from '../../../guards';

type ChangePasswordForm = {
  password: string;
  passwordRepeat: string;
};

const initialErrors = {
  password: '',
  passwordRepeat: '',
};

const useChangePasswordForm = (token: string | null) => {
  const navigate = useNavigate();
  const [changePassword, { isError, error, isLoading }] =
    useChangePasswordMutation();
  const [errors, setErrors] = useState(initialErrors);

  const handleChangePasswordError = useCallback(() => {
    if (isError && !!error && isFetchBaseQueryErrorType(error)) {
      const { data } = error;

      if (!isValidationErrorObject(data)) return;

      const {
        errors: { token: tokenError, ...otherErrors },
      } = data;

      if (!!tokenError) {
        showNotification(`Update token: ${tokenError}`, 'error');
        return;
      }

      setErrors(
        Object.entries(otherErrors).reduce((acc, [field, message]) => {
          return { ...acc, [field]: message };
        }, {} as ChangePasswordForm),
      );
    }
  }, [isError, error]);

  useEffect(handleChangePasswordError, [isError, error]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        setErrors(initialErrors);
        const formData = new FormData(event.currentTarget);

        const data = {
          password: formData.get('password') as string,
          passwordRepeat: formData.get('passwordRepeat') as string,
        };

        const validatedData = ChangePasswordSchema.parse(data);

        const [response] = await changePassword({
          password: validatedData.password,
          token,
        }).unwrap();

        if (typeof response !== 'string') {
          return showNotification('Unexpected error', 'error');
        }
        showNotification(response, 'success');

        navigate(ROUTES.LOGIN);
      } catch (err) {
        if (isZodError(err)) {
          setErrors(
            err.issues.reduce((acc, error) => {
              return { ...acc, [error.path[0]]: error.message };
            }, {} as ChangePasswordForm),
          );
        } else if (isApiError(err)) {
          const {
            data: { code, message },
          } = err;
          showNotification(`${code.toUpperCase()}: ${message}`, 'error');
        } else if (hasErrorMessage(err)) {
          console.error(err);
          showNotification(err.message, 'error');
        } else {
          console.error(err);
          showNotification('Unexpected error', 'error');
        }
      }
    },
    [changePassword],
  );

  return { handleSubmit, errors, isLoading };
};

export { useChangePasswordForm };
