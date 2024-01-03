import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WalletIcon from '@mui/icons-material/Wallet';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

const AdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <Grid container sx={styles.main} spacing={4}>
      <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
        <Card sx={styles.cardContainer}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.adminInnerCard}>
              <Box sx={styles.blueCardIcon}>
                <WalletIcon sx={styles.icon} />
              </Box>
              <Box sx={styles.smallCardTextColumn}>
                <Typography variant="body1" color="text.secondary">
                  {t('dashboard.allClients')}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={5} xl={4}>
        <Card sx={styles.cardContainer}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.adminInnerCard}>
              <Box sx={styles.greenCardIcon}>
                <CreditCardIcon sx={styles.icon} />
              </Box>
              <Box sx={styles.smallCardTextColumn}>
                <Typography variant="body1" color="text.secondary">
                  {t('dashboard.totalClientFunds')}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export { AdminDashboard };
