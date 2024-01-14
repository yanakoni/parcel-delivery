import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { CustomNoRowsOverlay } from '../../../components';
import { fixtures } from '../fixtures';
import { styles } from '../styles';

const orderColumns: GridColDef[] = [
  {
    field: 'receiver',
    headerName: 'Receiver',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'destinationPostOffice',
    headerName: 'Destination',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => {
      const { destinationPostOffice, destinationAddress } = params.row;
      if (destinationPostOffice) {
        return destinationPostOffice;
      }

      console.log(destinationAddress);

      if (!Object.keys(destinationAddress).length) {
        return '';
      }

      return `${destinationAddress.city}, ${destinationAddress.street}, ${destinationAddress.tel}`;
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'price',
    headerName: 'Price',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
];

const OrderTable = () => {
  const { t } = useTranslation();
  // todo
  const [order] = useState<any[]>(fixtures.orders);
  const [orderPaginationModel, setOrderPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const isDataLoading = false;

  return (
    <>
      <Typography variant="h4" component="h3" sx={styles.tableHeading}>
        {t('dashboard.order')}
      </Typography>
      <DataGrid
        loading={isDataLoading}
        rows={order}
        columns={orderColumns}
        paginationModel={orderPaginationModel}
        onPaginationModelChange={setOrderPaginationModel}
        pageSizeOptions={[5, 10]}
        showCellVerticalBorder={false}
        // todo: remove
        getRowId={() => [...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}
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

export { OrderTable };
