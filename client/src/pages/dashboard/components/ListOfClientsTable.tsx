import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { CustomNoRowsOverlay } from '../../../components';
import { fixtures } from '../fixtures';
import { styles } from '../styles';

const historyColumns: GridColDef[] = [
  {
    field: 'fullName',
    headerName: 'Name and Surname',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'balance',
    headerName: 'Balance',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    align: 'right',
    headerAlign: 'right',
  },
];

const ListOfClientsTable = () => {
  const { t } = useTranslation();
  // todo
  // @ts-ignore
  const [history, setListOfClients] = useState<any[]>(fixtures.clients);
  const [historyPaginationModel, setListOfClientsPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const isDataLoading = false;

  return (
    <>
      <Typography variant="h4" component="h3" sx={styles.tableHeading}>
        {t('dashboard.listOfClients')}
      </Typography>
      <DataGrid
        loading={isDataLoading}
        rows={history}
        columns={historyColumns}
        paginationModel={historyPaginationModel}
        onPaginationModelChange={setListOfClientsPaginationModel}
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
      />
    </>
  );
};

export { ListOfClientsTable };
