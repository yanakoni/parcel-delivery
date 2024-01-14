import { Card, CardContent, Grid, Theme } from '@mui/material';
import { styles } from './styles';
import { OrderTable } from './components';
import { SxProps } from '@mui/system';

const ClientDashboard = () => {
  return (
    <Grid container sx={styles.main} spacing={2}>
      <Grid container item xs={12}>
        <Card sx={styles.bottomRowCardContainer}>
          <CardContent sx={{ ...styles.cardContent, ...styles.table } as SxProps<Theme>}>
            <OrderTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export { ClientDashboard };
