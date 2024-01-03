import { useMemo, useState } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LineChart } from '@mui/x-charts';
import { graphAxisDateFormatter } from '../../../utils';
import { DateRangeSelect } from './DateRangeSelect';
import { styles } from './styles';

const ProfitLossGraph = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const [datesRange, setDatesRange] = useState<'week' | 'month'>('week');
  const dataPoints = useMemo<any[]>(
    () => data[datesRange].dataPoints,
    [datesRange],
  );

  return (
    <Box>
      <Box sx={styles.container}>
        <Typography variant="h4" component="h3">
          {t('dashboard.totalProfitLoss')}
        </Typography>
        <DateRangeSelect
          onRangeChange={setDatesRange}
          currentRange={datesRange}
        />
      </Box>
      <LineChart
        dataset={dataPoints}
        xAxis={[
          {
            scaleType: 'time',
            data: dataPoints.map(({ date }) => new Date(date)),
            tickMinStep: 3600 * 1000 * 24,
            valueFormatter: graphAxisDateFormatter,
          },
        ]}
        yAxis={[{ tickMinStep: 200 }]}
        series={[
          {
            id: 'totalProfitLoss',
            data: dataPoints.map(({ value }) => value),
            area: true,
            showMark: false,
          },
        ]}
        sx={styles.profitLossGraph}
        width={800}
        height={400}
      >
        <linearGradient
          id="gradient"
          x1="370"
          y1="-641.5"
          x2="364.065"
          y2="342.501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#205EEE" />
          <stop offset="1" stopColor="#205EEE" stopOpacity="0" />
        </linearGradient>
      </LineChart>
      <Box sx={styles.profitLossBadgeContainer}>
        <Grid container spacing={4}>
          <Grid item>
            <Box sx={styles.incomeIcon}>
              <ArrowOutwardIcon sx={styles.icon} />
            </Box>
          </Grid>
          <Grid item xs={8} sx={styles.detailsContainer}>
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
        <Grid container spacing={4}>
          <Grid item>
            <Box sx={styles.expensesIcon}>
              <ArrowOutwardIcon sx={styles.icon} />
            </Box>
          </Grid>
          <Grid item xs={8} sx={styles.detailsContainer}>
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
    </Box>
  );
};

export { ProfitLossGraph };
