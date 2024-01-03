import { Card, CardContent, Grid } from '@mui/material';
import { styles } from './styles';
import { CurrentOpenTradesTable, HistoryTable } from './components';

const ClientDashboard = () => {
  return (
    <Grid container sx={styles.main} spacing={2}>
      <Grid container item xs={12}>
        <Card sx={styles.bottomRowCardContainer}>
          <CardContent sx={{ ...styles.cardContent, ...styles.table }}>
            <CurrentOpenTradesTable />
          </CardContent>
        </Card>
      </Grid>
      <Grid container item xs={12}>
        <Card sx={styles.bottomRowCardContainer}>
          <CardContent sx={{ ...styles.cardContent, ...styles.table }}>
            <HistoryTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export { ClientDashboard };
