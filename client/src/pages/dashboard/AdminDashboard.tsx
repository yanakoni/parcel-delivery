import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { PackagesGraph } from './components';
import { fixtures } from './fixtures';

const AdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <Grid container sx={styles.main} spacing={4}>
      <Grid item xs={12} sm={12} md={4}>
        <Card sx={styles.cardContainer}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.adminInnerCard}>
              <Box sx={styles.blueCardIcon}>
                <TrendingUpIcon sx={styles.icon} />
              </Box>
              <Box sx={styles.smallCardTextColumn}>
                <Typography variant="body1" color="text.secondary">
                  {t('dashboard.currentPeriodIncomes')}
                </Typography>
                <Typography variant="h6">{fixtures.incomes}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Card sx={styles.cardContainer}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.adminInnerCard}>
              <Box sx={styles.redCardIcon}>
                <TrendingDownIcon sx={styles.icon} />
              </Box>
              <Box sx={styles.smallCardTextColumn}>
                <Typography variant="body1" color="text.secondary">
                  {t('dashboard.currentPeriodExpenses')}
                </Typography>
                <Typography variant="h6">{fixtures.expenses}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Card sx={styles.cardContainer}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.adminInnerCard}>
              <Box sx={styles.greenCardIcon}>
                <GroupIcon sx={styles.icon} />
              </Box>
              <Box sx={styles.smallCardTextColumn}>
                <Typography variant="body1" color="text.secondary">
                  {t('dashboard.totalUsers')}
                </Typography>
                <Typography variant="h6">{fixtures.allUsers}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <PackagesGraph />
      </Grid>
    </Grid>
  );
};

export { AdminDashboard };
