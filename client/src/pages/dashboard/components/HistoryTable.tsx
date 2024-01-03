import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { CustomNoRowsOverlay } from '../../../components';
import { fixtures } from '../fixtures';
import { styles } from '../styles';

const historyColumns: GridColDef[] = [
  {
    field: 'currency',
    headerName: 'Currency',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'profitLoss',
    headerName: 'Profit/Loss',
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    cellClassName: (params) => {
      const { profitLoss } = params.row;
      const regex = /[-+]?[0-9]+/g;

      return profitLoss.match(regex) > 0 ? 'positive' : 'negative';
    },
  },
];

const HistoryTable = () => {
  const { t } = useTranslation();
  // todo
  // @ts-ignore
  const [history, setHistory] = useState<any[]>(fixtures.history);
  const [historyPaginationModel, setHistoryPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const isDataLoading = false;

  return (
    <>
      <Typography variant="h4" component="h3" sx={styles.tableHeading}>
        {t('dashboard.history')}
      </Typography>
      <DataGrid
        loading={isDataLoading}
        rows={history}
        columns={historyColumns}
        paginationModel={historyPaginationModel}
        onPaginationModelChange={setHistoryPaginationModel}
        pageSizeOptions={[5, 10]}
        showCellVerticalBorder={false}
        // todo: remove
        getRowId={() =>
          [...Array(12)]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('')
        }
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          noResultsOverlay: CustomNoRowsOverlay,
        }}
        classes={{ root: 'dashboardColumn' }}
        autoHeight
        disableRowSelectionOnClick
      />
    </>
  );
};

export { HistoryTable };
