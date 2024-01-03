import { TextField, Box, Typography, Grid, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { usePasswordChangeForm } from './usePasswordChangeForm';
import { styles } from '../styles';

const PasswordChangeForm = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, isLoading } = usePasswordChangeForm();

  return (
    <Paper elevation={3} sx={styles.formContainer}>
      <Box width="100%">
        <Typography
          component="h1"
          variant="h6"
          color="text.secondary"
          sx={styles.formTitle}
        >
          {t('profile.passwordUpdateForm.title')}
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} mt={4} noValidate>
        <Grid container spacing={4}>
          <Grid xs={12} item>
            <TextField
              id="current_password"
              name="current_password"
              label={t('labels.currentPassword')}
              type="password"
              autoComplete="current-password"
              helperText={errors.current_password}
              error={!!errors.current_password}
              required
              fullWidth
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="password"
              name="password"
              label={t('labels.newPassword')}
              type="password"
              autoComplete="new-password"
              helperText={errors.password}
              error={!!errors.password}
              required
              fullWidth
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="passwordRepeat"
              name="passwordRepeat"
              label={t('labels.passwordRepeat')}
              type="password"
              helperText={errors.passwordRepeat}
              error={!!errors.passwordRepeat}
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
          {t('profile.passwordUpdateForm.submit')}
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export { PasswordChangeForm };
