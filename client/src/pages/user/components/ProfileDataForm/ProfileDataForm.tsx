import { useEffect, useMemo, useState } from 'react';
import { ImageType } from 'react-images-uploading';
import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';
import { TextField, Box, Typography, Grid, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useProfileDataForm } from './useProfileDataForm';
import { AvatarUploader, Loader } from '../../../../components';
import { BASE_ASSETS_URL } from '../../../../consts';
import { UpdateProfileDataInput } from './schema';
import { useUserData } from '../../../../hooks';
import { styles } from '../styles';

const initialValues = {
  first_name: '',
  last_name: '',
  settings_profile_phone: '',
  settings_profile_avatar: '',
};

const ProfileDataForm = () => {
  const { t } = useTranslation();
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [values, setValues] = useState<UpdateProfileDataInput>(initialValues);
  const user = useUserData();
  const { handleSubmit, methods, errors, isLoading } = useProfileDataForm();
  const { register, setValue, getValues } = methods;
  const avatar = values && values.settings_profile_avatar;
  const avatarErrors = errors && errors.settings_profile_avatar;

  useEffect(() => {
    (async () => {
      const { profile } = user.settings;

      setValue('first_name', user.firstName);
      setValue('last_name', user.lastName);
      setValue('settings_profile_phone', profile.phone || null);
      setValue('settings_profile_avatar', profile.avatar || null);

      setValues(getValues());
      setIsLoadingUserData(false);
    })();
  }, [getValues, setValue, user]);

  const avatarLink = useMemo(() => {
    if (!avatar) return '';

    switch (true) {
      case avatar.includes('/uploads'):
        return `${BASE_ASSETS_URL}${avatar}`;
      case avatar.includes('base64'):
        return avatar;
      default:
        return '';
    }
  }, [avatar]);

  const onImageChange = async (image: ImageType) => {
    if (!image || !image.dataURL) return;

    setValue('settings_profile_avatar', image.dataURL);
    setValues(getValues());
  };

  if (isLoadingUserData) return <Loader type="page" />;

  return (
    <Paper elevation={3} sx={styles.formContainer}>
      <Box width="100%">
        <Typography
          component="h1"
          variant="h6"
          color="text.secondary"
          sx={styles.formTitle}
        >
          {t('profile.profileDataForm.title')}
        </Typography>
      </Box>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit} mt={4} noValidate>
          <Box mb={4}>
            <AvatarUploader
              name="userAvatar"
              initialImage={avatarLink}
              onChange={onImageChange}
              error={avatarErrors}
            />
          </Box>
          <Grid container spacing={4}>
            <Grid xs={12} item>
              <TextField
                id="first_name"
                label={t('labels.name')}
                type="text"
                autoComplete="given-name"
                helperText={errors.first_name}
                error={!!errors.first_name}
                {...register('first_name')}
                required
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                id="last_name"
                label={t('labels.surname')}
                type="text"
                autoComplete="family-name"
                helperText={errors.last_name}
                error={!!errors.last_name}
                {...register('last_name')}
                required
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                disabled
                id="email"
                label={t('labels.email')}
                type="email"
                autoComplete="email"
                defaultValue={user.email}
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                id="settings_profile_phone"
                label={t('labels.phoneNumber')}
                type="tel"
                autoComplete="tel"
                helperText={errors.phone_number}
                error={!!errors.phone_number}
                {...register('settings_profile_phone')}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            loading={isLoading}
            variant="contained"
            sx={styles.formButton}
          >
            {t('profile.profileDataForm.submit')}
          </LoadingButton>
        </Box>
      </FormProvider>
    </Paper>
  );
};

export { ProfileDataForm };
