import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateProfileDataInput, UpdateProfileDataSchema } from './schema';
import { useUpdateProfileMutation } from '../../../../api';
import { SERIALIZER_NAMES } from '../../../../consts';
import { showNotification } from '../../../../utils';
import {
  isValidationErrorObject,
  isFetchBaseQueryErrorType,
  isZodError,
  isApiError,
  hasErrorMessage,
} from '../../../../guards';

type UpdateProfileForm = {
  first_name: string;
  last_name: string;
  phone_number: string;
  settings_profile_avatar: string;
};

const initialErrors = {
  first_name: '',
  last_name: '',
  phone_number: '',
  settings_profile_avatar: '',
};

const useProfileDataForm = () => {
  const [updateProfile, { isError, error, isLoading }] =
    useUpdateProfileMutation();
  const [errors, setErrors] = useState(initialErrors);
  const methods = useForm<UpdateProfileDataInput>({
    resolver: zodResolver(UpdateProfileDataSchema),
  });

  const handleUpdateProfileError = useCallback(() => {
    if (isError && !!error && isFetchBaseQueryErrorType(error)) {
      const { data } = error;

      if (!isValidationErrorObject(data)) return;

      const { errors } = data;

      setErrors(
        Object.entries(errors).reduce((acc, [field, message]) => {
          return { ...acc, [field]: message };
        }, {} as UpdateProfileForm),
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
          first_name: formData.get('first_name') as string,
          last_name: formData.get('last_name') as string,
          settings_profile_phone: formData.get(
            'settings_profile_phone',
          ) as string,
          settings_profile_avatar: methods.getValues().settings_profile_avatar,
        };

        const validatedData = UpdateProfileDataSchema.parse(data);

        const requestData: any = {
          first_name: validatedData.first_name,
          last_name: validatedData.last_name,
          settings: {
            profile: {
              avatar: validatedData.settings_profile_avatar,
              phone: validatedData.settings_profile_phone,
            },
          },
        };

        if (
          requestData.settings.profile.avatar &&
          !requestData.settings.profile.avatar.includes('base64')
        ) {
          delete requestData.settings.profile.avatar;
        }

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
            }, {} as UpdateProfileForm),
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

export { useProfileDataForm };
