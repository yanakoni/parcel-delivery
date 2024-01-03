import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { LanguageSelect } from '../../../components';
import { useLoginForm } from './useLoginForm';
import { generalStyles } from '../styles';
import { ROUTES } from '../../../consts';

export const LoginPage = () => {
  const { t } = useTranslation();
  const { handleSubmit, errors, isLoading } = useLoginForm();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordInputType = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <Grid container alignItems="center" component="main" sx={generalStyles.main}>
      <Grid item xs={1} />
      <Grid item sm={4} xs={12}>
        <Grid container gap={6}>
          <Grid xs={12} display="flex" alignItems="center" justifyContent="flex-start" item>
            <LanguageSelect />
          </Grid>
          <Grid xs={12} item>
            <Typography component="h2" variant="h2">
              {t('login.title')}
            </Typography>
            <Typography component="h5" variant="h5" color="text.secondary">
              {t('login.welcome')}
            </Typography>
          </Grid>
        </Grid>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }} noValidate>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label={t('labels.email')}
                type="email"
                autoComplete="email"
                helperText={errors.email}
                error={!!errors.email}
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label={t('labels.password')}
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
          </Grid>
          <Grid container justifyContent="flex-end" mt={4}>
            <Button
              to={ROUTES.RESET_PASSWORD}
              component={Link}
              color="primary"
              className="noHover"
              sx={generalStyles.link}
              disableRipple
            >
              <Typography component="p" variant="body1">
                {t('login.forgotPassword')}
              </Typography>
            </Button>
          </Grid>
          <LoadingButton type="submit" loading={isLoading} variant="contained" sx={generalStyles.button} fullWidth>
            {t('login.logIn')}
          </LoadingButton>
          <Grid container justifyContent="center" gap={2}>
            <Grid display="flex" alignItems="center" item>
              <Typography component="p" variant="body1" color="text.secondary">
                {t('login.newTo')}
              </Typography>
            </Grid>
            <Grid item>
              <Button color="primary" className="noHover" disableRipple>
                <Box display="flex" alignItems="center" gap={1}>
                  <LoginIcon />
                  <Typography component="p" variant="body1">
                    {t('login.getStarted')}
                  </Typography>
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
