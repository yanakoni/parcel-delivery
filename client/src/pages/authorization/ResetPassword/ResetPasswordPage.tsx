import { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/West';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { grey } from '@mui/material/colors';
import { useResetPasswordForm } from './useResetPasswordForm';
import { LanguageSelect } from '../../../components';
import { generalStyles } from '../styles';
import { styles } from './styles';

export const ResetPasswordPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleSubmit, errors, isLoading, requestSuccess } = useResetPasswordForm();

  useEffect(() => {
    setOpen(requestSuccess);
  }, [requestSuccess]);

  const onGoBack = () => navigate(-1);
  const handleModal = () => setOpen(!open);

  return (
    <Grid container alignItems="center" component="main" sx={generalStyles.main}>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modalBox}>
          <Typography id="modal-modal-title" variant="h4" mb={3}>
            {t('resetPassword.modalTitle')}
          </Typography>
          <Typography id="modal-modal-description" mb={4} color={grey[600]}>
            {t('resetPassword.modalDescription')}
          </Typography>
          <Button color="primary" onClick={handleModal} variant="contained">
            {t('resetPassword.modalButton')}
          </Button>
        </Box>
      </Modal>
      <Grid item xs={1} />
      <Grid item sm={4} xs={12} display="flex" flexDirection="column" justifyContent="center">
        <Box>
          <Grid container>
            <Grid xs={12} item mb={5}>
              <Button color="secondary" onClick={onGoBack} className="noHover" sx={generalStyles.link} disableRipple>
                <ArrowLeftIcon width={24} />
                <Typography component="p" variant="h4" ml={2}>
                  {t('resetPassword.back')}
                </Typography>
              </Button>
            </Grid>
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
            <LoadingButton type="submit" loading={isLoading} variant="contained" sx={generalStyles.button} fullWidth>
              {t('resetPassword.reset')}
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
