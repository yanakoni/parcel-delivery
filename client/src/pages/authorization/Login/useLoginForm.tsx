import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from './schema';
import { useLoginMutation } from '../../../api';
import { showNotification } from '../../../utils';
import { ROUTES } from '../../../consts';
import {
  isFetchBaseQueryErrorType,
  isValidationErrorObject,
  isApiError,
  isZodError,
} from '../../../guards';

type LoginForm = {
  email: string;
  password: string;
};

const initialErrors = {
  email: '',
  password: '',
};

const useLoginForm = () => {
  const navigate = useNavigate();
  const [login, { isError, error, isLoading }] = useLoginMutation();
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    if (isError && !!error && isFetchBaseQueryErrorType(error)) {
      const { data } = error;

      if (!isValidationErrorObject(data)) return;

      const { errors } = data;

      setErrors(
        Object.entries(errors).reduce((acc, [field, message]) => {
          return { ...acc, [field]: message };
        }, {} as LoginForm),
      );
    }
  }, [error, isError]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        setErrors(initialErrors);
        const formData = new FormData(event.currentTarget);

        const data = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        };

        const validatedData = LoginSchema.parse(data);

        const response = await login(validatedData).unwrap();

        if (response.success) {
          navigate(ROUTES.MAIN);
        }
      } catch (err) {
        if (isZodError(err)) {
          setErrors(
            err.issues.reduce((acc, error) => {
              return { ...acc, [error.path[0]]: error.message };
            }, {} as LoginForm),
          );
        } else if (isApiError(err)) {
          const {
            data: { code, message },
          } = err;
          showNotification(`${code.toUpperCase()}: ${message}`, 'error');
        }
      }
    },
    [login, navigate],
  );

  return { handleSubmit, errors, isLoading };
};

export { useLoginForm };
