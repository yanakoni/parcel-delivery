import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordSchema } from './schema';
import { useUpdatePasswordMutation } from '../../../../api';
import { showNotification } from '../../../../utils';
import { ROUTES } from '../../../../consts';
import {
  isValidationErrorObject,
  isFetchBaseQueryErrorType,
  isZodError,
  isApiError,
  hasErrorMessage,
} from '../../../../guards';

type ChangePasswordForm = {
  current_password: string;
  password: string;
  passwordRepeat: string;
};

const initialErrors = {
  current_password: '',
  password: '',
  passwordRepeat: '',
};

const usePasswordChangeForm = () => {
  const navigate = useNavigate();
  const [updatePassword, { isError, error, isLoading }] =
    useUpdatePasswordMutation();
  const [errors, setErrors] = useState(initialErrors);

  const handleChangePasswordError = useCallback(() => {
    if (isError && !!error && isFetchBaseQueryErrorType(error)) {
      const { data } = error;

      if (!isValidationErrorObject(data)) return;

      const { errors } = data;

      setErrors(
        Object.entries(errors).reduce((acc, [field, message]) => {
          return { ...acc, [field]: message };
        }, {} as ChangePasswordForm),
      );
    }
  }, [isError, error]);

  useEffect(handleChangePasswordError, [handleChangePasswordError]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        setErrors(initialErrors);
        const formData = new FormData(event.currentTarget);

        const data = {
          current_password: formData.get('current_password') as string,
          password: formData.get('password') as string,
          passwordRepeat: formData.get('passwordRepeat') as string,
        };

        const validatedData = ChangePasswordSchema.parse(data);

        const requestData = {
          current_password: validatedData.current_password,
          password: validatedData.password,
        };

        const response = await updatePassword({
          ...requestData,
        }).unwrap();

        if (!response.success) {
          return showNotification('Unexpected error', 'error');
        }
        showNotification('Password successfully updated', 'success');

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
    [navigate, updatePassword],
  );

  return { handleSubmit, errors, isLoading };
};

export { usePasswordChangeForm };
