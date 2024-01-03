import { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { FormSelect, Loader } from '../../../../components';
import { useProfileSettingsForm } from './useProfileSettingsForm';
import { UpdateProfileSettingsInput } from './schema';
import { useUserData } from '../../../../hooks';
import { styles } from '../styles';
import { Locale, TableItemsCount } from '../../../../enums';

const initialValues = {
  settings_locale: '',
  settings_table_items_count: '',
};

const ProfileSettingsForm = () => {
  const { t } = useTranslation();
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [values, setValues] = useState<UpdateProfileSettingsInput>(initialValues);
  const user = useUserData();
  const { handleSubmit, methods, errors, isLoading } = useProfileSettingsForm();
  const { register, setValue, getValues } = methods;

  useEffect(() => {
    (async () => {
      const { preferences } = user.settings;

      setValue('settings_locale', preferences.locale);
      setValue('settings_table_items_count', preferences.tableItemsCount.toString());

      setValues(getValues());
      setIsLoadingUserData(false);
    })();
  }, [getValues, setValue, user]);

  if (isLoadingUserData) return <Loader type="page" />;

  return (
    <Paper elevation={3} sx={styles.formContainer}>
      <Box width="100%">
        <Typography component="h1" variant="h6" color="text.secondary" sx={styles.formTitle}>
          {t('profile.settingsDataForm.title')}
        </Typography>
      </Box>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit} mt={4} noValidate>
          <Grid container spacing={4}>
            <Grid xs={12} md={6} item>
              <FormSelect
                id="settings_locale"
                name="settings_locale"
                label={t('labels.locale')}
                register={register}
                enumObject={Locale}
                errors={errors}
                defaultValue={values.settings_locale}
              />
            </Grid>
          </Grid>
          <Grid xs={12} md={6} item>
            <FormSelect
              id="settings_table_items_count"
              name="settings_table_items_count"
              label={t('labels.tableItemsCount')}
              register={register}
              enumObject={TableItemsCount}
              errors={errors}
              defaultValue={values.settings_table_items_count}
            />
          </Grid>
          <LoadingButton type="submit" loading={isLoading} variant="contained" sx={styles.formButton}>
            {t('profile.settingsDataForm.submit')}
          </LoadingButton>
        </Box>
      </FormProvider>
    </Paper>
  );
};

export { ProfileSettingsForm };
