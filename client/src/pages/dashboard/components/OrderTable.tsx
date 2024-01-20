import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { CustomNoRowsOverlay } from '../../../components';
import { hasErrorMessage } from '../../../guards';
import { showNotification } from '../../../utils';
import { fixtures } from '../fixtures';
import { styles } from '../styles';
import { keycloak } from '../../../consts';

const orderColumns = (isAdmin: boolean, onStatusChange: (_id: string) => void): GridColDef[] => {
  const cols = [
    {
      field: 'receiver',
      headerName: 'Receiver',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'destinationPostOffice',
      headerName: 'Destination',
      flex: 2,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params: any) => {
        const { destinationPostOffice, destinationAddress } = params.row;
        if (destinationPostOffice) {
          return destinationPostOffice;
        }

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
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'createdAt',
      headerName: 'Created at',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
  ];

  if (isAdmin) {
    cols.push({
      field: 'sender',
      headerName: 'In Work',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => {
        return (
          <Button variant="contained" color="primary" onClick={() => onStatusChange(params.row._id)}>
            In Work
          </Button>
        );
      },
    });
  }

  return cols as GridColDef[];
};

interface OrderTableProps {
  isAdmin: boolean;
}

const OrderTable = ({ isAdmin }: OrderTableProps) => {
  const { t } = useTranslation();
  // todo
  const [orders, setOrders] = useState<any[]>(fixtures.orders);
  const [orderPaginationModel, setOrderPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const isDataLoading = false;

  useEffect(() => {
    (async () => {
      try {
        const abortController = new AbortController();
        const { data: responseData } = await axios.get('http://localhost:3001/package', {
          params: {
            filter: {
              name: 'sender',
              type: 'string',
              value: keycloak.tokenParsed?.id || 'test',
            },
          },
          signal: abortController.signal,
        });
        const { message, items } = responseData;

        if (message) {
          if (Array.isArray(message)) {
            message.forEach((msg) => showNotification(msg, 'error'));
          } else {
            showNotification(message, 'error');
          }
          abortController.abort();
        }

        console.log(items);

        setOrders(items);
      } catch (err) {
        console.error(err);
        if (hasErrorMessage(err)) {
          showNotification(err.message, 'error');
        }
      }
    })();
  }, []);

  const handleStatusChange = async (_id: string) => {
    try {
      const abortController = new AbortController();
      const { data: responseData } = await axios.put('http://localhost:3001/package/status', {
        params: {
          _id,
        },
        signal: abortController.signal,
      });
      const { message } = responseData;

      if (message) {
        if (Array.isArray(message)) {
          message.forEach((msg) => showNotification(msg, 'error'));
        } else {
          showNotification(message, 'error');
        }
        abortController.abort();
      }
      showNotification('Successfully changed status', 'success');
    } catch (err) {
      console.error(err);
      if (hasErrorMessage(err)) {
        showNotification(err.message, 'error');
      }
    }
  };

  return (
    <>
      <Typography variant="h4" component="h3" sx={styles.tableHeading}>
        {t('dashboard.order')}
      </Typography>
      <DataGrid
        loading={isDataLoading}
        rows={orders}
        columns={orderColumns(isAdmin, handleStatusChange)}
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
