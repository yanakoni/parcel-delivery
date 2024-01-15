import { useCallback, useState } from 'react';
import { Box, Button, Grid, InputAdornment, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import { FormInput, LanguageSelect } from '../../../components';
import { isSignUpWithoutTokenSchemaInput } from './guards';
import { generalStyles } from '../styles';
import { ROUTES } from '../../../consts';
import { SignUpWithoutTokenRequestQuery, SignUpWithTokenRequestQuery, useSignUpMutation } from '../../../api';
import {
  signUpWithoutTokenSchema,
  SignUpWithoutTokenSchemaInput,
  signUpWithTokenSchema,
  SignUpWithTokenSchemaInput,
} from './schema';

export const SignUpPage = () => {
  const { t } = useTranslation();
  const { joinToken } = useParams();
  const navigate = useNavigate();

  const [signUp, { isLoading }] = useSignUpMutation();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordRepeatVisibility, setPasswordRepeatVisibility] = useState(false);

  const methods = useForm<SignUpWithTokenSchemaInput | SignUpWithoutTokenSchemaInput>({
    resolver: zodResolver(joinToken ? signUpWithTokenSchema : signUpWithoutTokenSchema),
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<SignUpWithTokenSchemaInput | SignUpWithoutTokenSchemaInput> = useCallback(
    async (values) => {
      const { first_name, last_name, password } = values;

      const dataToSave = {
        first_name,
        last_name,
        password,
        ...(isSignUpWithoutTokenSchemaInput(values) && { email: values.email }),
        ...(joinToken && { invite_token: joinToken }),
      } as SignUpWithTokenRequestQuery | SignUpWithoutTokenRequestQuery;

      await signUp(dataToSave).unwrap();

      navigate(ROUTES.DASHBOARD);
    },
    [joinToken, navigate, signUp],
  );

  const handlePasswordInputType = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handlePasswordRepeatInputType = () => {
    setPasswordRepeatVisibility(!passwordRepeatVisibility);
  };

  return (
    <Grid container alignItems="center" component="main" sx={generalStyles.main}>
      <Grid item xs={1} />
      <Grid item sm={4} xs={12}>
        <Grid container>
          <Grid item sm={6} xs={12} mb={{ xs: 3 }}>
            <Typography component="h2" variant="h2">
              {t('signUp.title')}
            </Typography>
            <Typography component="h5" variant="h5" color="text.secondary">
              {t('signUp.action')}
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12} display="flex" alignItems="center" justifyContent="flex-end">
            <LanguageSelect />
          </Grid>
        </Grid>
        <FormProvider {...methods}>
          <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 4 }} noValidate>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <FormInput name="first_name" label={t('labels.name')} fullWidth autoFocus />
              </Grid>
              <Grid item xs={12}>
                <FormInput name="last_name" label={t('labels.surname')} fullWidth />
              </Grid>
              {!joinToken && (
                <Grid item xs={12}>
                  <FormInput name="email" label={t('labels.email')} type="email" fullWidth />
                </Grid>
              )}
              <Grid item xs={12}>
                <FormInput
                  name="password"
                  label={t('labels.password')}
                  type={passwordVisibility ? 'text' : 'password'}
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
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  name="passwordRepeat"
                  label={t('labels.passwordRepeat')}
                  type={passwordRepeatVisibility ? 'text' : 'password'}
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
              {t('signUp.signUp')}
            </LoadingButton>
            <Grid container justifyContent="center" gap={2}>
              <Grid display="flex" alignItems="center" item>
                <Typography component="p" variant="body1" color="text.secondary">
                  {t('signUp.haveAccount')}
                </Typography>
              </Grid>
              <Grid item>
                <Button to={ROUTES.LOGIN} component={Link} color="primary" className="noHover" disableRipple>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LoginIcon />
                    <Typography component="p" variant="body1">
                      {t('signUp.logIn')}
                    </Typography>
                  </Box>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Grid>
    </Grid>
  );
};
