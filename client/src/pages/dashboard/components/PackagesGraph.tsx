import { useMemo, useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BarChart } from '@mui/x-charts';
import { graphAxisDateFormatter } from '../../../utils';
import { DateRangeSelect } from './DateRangeSelect';
import { fixtures } from '../fixtures';
import { styles } from './styles';
import { CitySelect } from './CitySelect';

const PackagesGraph = ({ isAdmin }: { isAdmin?: boolean }) => {
  const { t } = useTranslation();
  const [datesRange, setDatesRange] = useState<'week' | 'month'>('week');
  const [city, setCity] = useState<
    'All' | 'Kyiv' | 'Lviv' | 'Odessa' | 'Dnipro' | 'Chernivtsi' | 'Zhytomyr' | 'Vinnytsia'
  >('All');
  const dataPoints = useMemo(() => fixtures.packages[datesRange].dataPoints[city], [city, datesRange]);

  return (
    <Box>
      <Box sx={styles.container}>
        <Typography variant="h4" component="h3">
          {t('dashboard.orders')}
        </Typography>
        <Grid container display="flex" justifyContent="flex-end">
          <Grid item xs={3}>
            <Typography variant="h6" component="h6" fontWeight={400} color="text.secondary">
              {t('dashboard.selectDateRange')}:&nbsp;
            </Typography>
            <DateRangeSelect onRangeChange={setDatesRange} currentRange={datesRange} />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="h6" fontWeight={400} color="text.secondary">
              {t('dashboard.selectCity')}:&nbsp;
            </Typography>
            <CitySelect onChange={setCity} currentCity={city} />
          </Grid>
        </Grid>
      </Box>
      <BarChart
        dataset={dataPoints}
        xAxis={[
          {
            scaleType: 'band',
            data: dataPoints.map(({ date }) => new Date(date)),
            valueFormatter: graphAxisDateFormatter,
          },
        ]}
        yAxis={[{ tickMaxStep: 200 }]}
        series={[
          {
            id: 'packages',
            data: dataPoints.map(({ value }) => value),
          },
        ]}
        sx={styles.balanceHistoryGraph}
        width={1200}
        height={isAdmin ? 585 : 500}
      />
      {isAdmin && (
        <Box
          sx={{
            ...styles.profitLossBadgeContainer,
            ...styles.balanceHistoryBadgeContainer,
          }}
        >
          <Grid container gap={4}>
            <Grid item>
              <Box sx={styles.incomeIcon}>
                <ArrowOutwardIcon sx={styles.icon} />
              </Box>
            </Grid>
            <Grid item xs={7} sx={styles.detailsContainer}>
              <Typography variant="h6" component="h6" fontWeight={400} color="text.secondary">
                {t('dashboard.incomes')}
              </Typography>
              <Typography variant="h5" component="p" fontWeight={500}>
                + ${fixtures.packages.incomes}
              </Typography>
            </Grid>
          </Grid>
          <Grid container gap={4}>
            <Grid item>
              <Box sx={styles.expensesIcon}>
                <ArrowOutwardIcon sx={styles.icon} />
              </Box>
            </Grid>
            <Grid item xs={7} sx={styles.detailsContainer}>
              <Typography variant="h6" component="h6" fontWeight={400} color="text.secondary">
                {t('dashboard.expenses')}
              </Typography>
              <Typography variant="h5" component="p" fontWeight={500}>
                - ${fixtures.packages.expenses}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export { PackagesGraph };
