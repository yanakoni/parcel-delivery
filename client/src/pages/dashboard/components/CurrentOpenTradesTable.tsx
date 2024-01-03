import { useMemo, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { PaginatedTable } from '../../../components';
import { styles } from '../styles';
import { objectToQueryString } from '../../../utils';
import { useGetEntityListQueryTyped } from '../../../hooks';
import { ENDPOINTS, ENTITIES } from '../../../consts';
import { Position } from '../../../interfaces';

const currentOpenTradesColumns: GridColDef[] = [
  {
    field: 'symbol',
    headerName: 'Currency',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
  },
  {
    field: 'openPrice',
    headerName: 'Start Price',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const { openPrice } = params.row;

      return Number(openPrice).toFixed(2);
    },
    sortable: false,
  },
  {
    field: 'closePrice',
    headerName: 'Close Price',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const { closePrice } = params.row;

      return Number(closePrice).toFixed(2);
    },
    sortable: false,
  },
  {
    field: 'volume',
    headerName: 'Volume',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const { volume } = params.row;

      return Number(volume).toFixed(2);
    },
    sortable: false,
  },
  {
    field: 'takeProfit',
    headerName: 'Profit',
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    renderCell: (params) => {
      const { takeProfit } = params.row;

      return Number(takeProfit).toFixed(2);
    },
    cellClassName: (params) => {
      const { takeProfit } = params.row;

      if (takeProfit > 0) {
        return 'positive';
      } else {
        return 'negative';
      }
    },
    sortable: false,
  },
  {
    field: 'stopLoss',
    headerName: 'Loss',
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    renderCell: (params) => {
      const { stopLoss } = params.row;

      return Number(stopLoss).toFixed(2);
    },
    cellClassName: (params) => {
      const { stopLoss } = params.row;

      if (stopLoss > 0) {
        return 'negative';
      } else {
        return 'positive';
      }
    },
    sortable: false,
  },
];

const CurrentOpenTradesTable = () => {
  const { t } = useTranslation();

  const [dynamicQueryObj, setDynamicQueryObj] =
    useState<Record<string, string>>();

  const trandingQueryParams = useMemo(() => {
    if (!dynamicQueryObj) return null;

    let url = objectToQueryString(dynamicQueryObj);

    return `?${url}`;
  }, [dynamicQueryObj]);

  const positionListRes = useGetEntityListQueryTyped<Position>(
    {
      entityName: ENTITIES.POSITION,
      entityUrl: ENDPOINTS.POSITIONS + trandingQueryParams,
    },
    {
      skip: !trandingQueryParams,
    },
  );

  const pageSizeSelectorOptions = useMemo(() => [5, 10], []);

  return (
    <>
      <Typography variant="h4" sx={styles.tableHeading}>
        {t('dashboard.currentOpenTrades')}
      </Typography>
      <PaginatedTable
        data={positionListRes.data}
        columns={currentOpenTradesColumns}
        loading={positionListRes.isFetching}
        setDynamicQueryObj={setDynamicQueryObj}
        pageSizeSelectorOptions={pageSizeSelectorOptions}
        defaultPageSize={5}
        classes={{ root: 'dashboardColumn' }}
      />
    </>
  );
};

export { CurrentOpenTradesTable };
