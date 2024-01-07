import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateProfileSettingsInput, UpdateProfileSettingsSchema } from './schema';
import { useUpdateProfileMutation } from '../../../../api';
import { SERIALIZER_NAMES } from '../../../../consts';
import { showNotification } from '../../../../utils';
import {
  hasErrorMessage,
  isApiError,
  isFetchBaseQueryErrorType,
  isValidationErrorObject,
  isZodError,
} from '../../../../guards';

type UpdateProfileSettingsForm = {
  settingsLocale: string;
  settings_time_zone: string;
  settingsTableItemsCount: string;
  settings_number_format: string;
  settings_date_format: string;
  settings_time_format: string;
};

const initialErrors = {
  settingsLocale: '',
  settings_time_zone: '',
  settingsTableItemsCount: '',
  settings_number_format: '',
  settings_date_format: '',
  settings_time_format: '',
};

const useProfileSettingsForm = () => {
  const [updateProfile, { isError, error, isLoading }] = useUpdateProfileMutation();
  const [errors, setErrors] = useState(initialErrors);
  const methods = useForm<UpdateProfileSettingsInput>({
    resolver: zodResolver(UpdateProfileSettingsSchema),
  });

  const handleUpdateProfileError = useCallback(() => {
    if (isError && !!error && isFetchBaseQueryErrorType(error)) {
      const { data } = error;

      if (!isValidationErrorObject(data)) return;

      const { errors } = data;

      setErrors(
        Object.entries(errors).reduce((acc, [field, message]) => {
          return { ...acc, [field]: message };
        }, {} as UpdateProfileSettingsForm),
      );
    }
  }, [isError, error]);

  useEffect(handleUpdateProfileError, [isError, error]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        setErrors(initialErrors);
        const formData = new FormData(event.currentTarget);

        const data = {
          settingsLocale: formData.get('settingsLocale') as string,
          settingsTableItemsCount: formData.get('settingsTableItemsCount') as string,
        };

        const validatedData = UpdateProfileSettingsSchema.parse(data);

        const requestData: any = {
          settings: {
            preferences: {
              locale: validatedData.settingsLocale,
              table_items_count: +validatedData.settingsTableItemsCount,
            },
          },
        };

        const response = await updateProfile({
          ...requestData,
          _type: SERIALIZER_NAMES.USERS,
        }).unwrap();

        if (!Object.keys(response).length) {
          return showNotification('Unexpected error', 'error');
        }

        showNotification('Settings successfully updated', 'success');
      } catch (err) {
        if (isZodError(err)) {
          setErrors(
            err.issues.reduce((acc, error) => {
              return { ...acc, [error.path[0]]: error.message };
            }, {} as UpdateProfileSettingsForm),
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
    [updateProfile],
  );

  return { handleSubmit, errors, isLoading, methods };
};

export { useProfileSettingsForm };
