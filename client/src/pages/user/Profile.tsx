import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { useTranslation } from 'react-i18next';
import { PasswordChangeForm, ProfileDataForm, ProfileSettingsForm } from './components';
import { useCheckUserRole } from '../../hooks';
import { USER_ROLES } from '../../consts';
import { styles } from './styles';

const ProfilePage = () => {
  const { t } = useTranslation();
  const isClient = useCheckUserRole(USER_ROLES.CLIENT);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6} lg={6} xl={4}>
        <ProfileDataForm />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={4}>
        <Box mb={4}>
          <ProfileSettingsForm />
        </Box>
        {isClient && (
          <Box>
            <Paper elevation={3} sx={styles.verificationContainer}>
              <Typography component="h3" variant="h5" color="text.secondary" mb={4}></Typography>
              <Button variant="contained" sx={styles.verificationButton}>
                <Typography component="p" variant="h5">
                  {t('profile.kycButton')}
                </Typography>
                <BadgeOutlinedIcon width={24} height={24} />
              </Button>
            </Paper>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={4}>
        <PasswordChangeForm />
      </Grid>
    </Grid>
  );
};

export { ProfilePage };
