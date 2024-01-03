import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useChangePasswordForm } from './useChangePasswordForm';
import { LanguageSelect } from '../../../components';
import { generalStyles } from '../styles';

export const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { handleSubmit, errors, isLoading } = useChangePasswordForm(searchParams.get('token'));
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordRepeatVisibility, setPasswordRepeatVisibility] = useState(false);

  const handlePasswordInputType = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handlePasswordRepeatInputType = () => {
    setPasswordRepeatVisibility(!passwordRepeatVisibility);
  };

  return (
    <Grid container alignItems="center" component="main" sx={generalStyles.main}>
      <Grid item xs={1} />
      <Grid item xs={4} display="flex" flexDirection="column" justifyContent="center">
        <Box>
          <Grid container>
            <Grid xs={8} item>
              <Typography component="h1" variant="h2">
                {t('resetPassword.title')}
              </Typography>
            </Grid>
            <Grid xs={4} display="flex" alignItems="center" justifyContent="flex-end" item>
              <LanguageSelect />
            </Grid>
          </Grid>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }} noValidate>
            <Grid container spacing={4}>
              <Grid xs={12} item>
                <TextField
                  id="password"
                  name="password"
                  label={t('labels.newPassword')}
                  type={passwordVisibility ? 'text' : 'password'}
                  autoComplete="new-password"
                  helperText={errors.password}
                  error={!!errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button color="secondary" onClick={handlePasswordInputType} className="noHover" disableRipple>
                          {!passwordVisibility && <VisibilityOffIcon width={24} />}
                          {passwordVisibility && <VisibilityIcon width={24} />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="passwordRepeat"
                  name="passwordRepeat"
                  label={t('labels.passwordRepeat')}
                  type={passwordRepeatVisibility ? 'text' : 'password'}
                  autoComplete="current-password"
                  helperText={errors.passwordRepeat}
                  error={!!errors.passwordRepeat}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={handlePasswordRepeatInputType}
                          color="secondary"
                          className="noHover"
                          disableRipple
                        >
                          {!passwordRepeatVisibility && <VisibilityOffIcon width={24} />}
                          {passwordRepeatVisibility && <VisibilityIcon width={24} />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <LoadingButton type="submit" loading={isLoading} variant="contained" sx={generalStyles.button} fullWidth>
              {t('changePassword.button')}
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
