import { useMemo, useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Typography, Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BarChart } from '@mui/x-charts';
import { graphAxisDateFormatter } from '../../../utils';
import { DateRangeSelect } from './DateRangeSelect';
import { fixtures } from '../fixtures';
import { styles } from './styles';

const BalanceHistoryGraph = ({ isAdmin }: { isAdmin?: boolean }) => {
  const { t } = useTranslation();
  const [datesRange, setDatesRange] = useState<'week' | 'month'>('week');
  const dataPoints = useMemo(
    () => fixtures.balanceHistory[datesRange].dataPoints,
    [datesRange],
  );

  return (
    <Box>
      <Box sx={styles.container}>
        <Typography variant="h4" component="h3">
          {t('dashboard.balanceHistory')}
        </Typography>
        <DateRangeSelect
          onRangeChange={setDatesRange}
          currentRange={datesRange}
        />
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
            id: 'balanceHistory',
            data: dataPoints.map(({ balance }) => balance),
          },
        ]}
        sx={styles.balanceHistoryGraph}
        width={560}
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
              <Typography
                variant="h6"
                component="h6"
                fontWeight={400}
                color="text.secondary"
              >
                {t('dashboard.incomes')}
              </Typography>
              <Typography variant="h5" component="p" fontWeight={500}>
                + $1000
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
              <Typography
                variant="h6"
                component="h6"
                fontWeight={400}
                color="text.secondary"
              >
                {t('dashboard.expenses')}
              </Typography>
              <Typography variant="h5" component="p" fontWeight={500}>
                - $500
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export { BalanceHistoryGraph };
