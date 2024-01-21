import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios, { AxiosRequestConfig } from 'axios';
import { CustomNoRowsOverlay } from '../../components';
import { hasErrorMessage } from '../../guards';
import { showNotification } from '../../utils';
import { styles } from '../dashboard/styles';
import { useKeycloak } from '@react-keycloak/web';

const paymentsColumns: GridColDef[] = [
  {
    field: 'userId',
    headerName: 'Payer',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => `${params.value / 100} ₴`,
  },
  {
    field: 'cardNumber',
    headerName: 'Last 4',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'createdAt',
    headerName: 'Purchase date',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
];
interface PaymentsTableProps {
  isAdmin: boolean;
}

const PaymentsTable = ({ isAdmin }: PaymentsTableProps) => {
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();
  // todo
  const [payments, setPayments] = useState<any[]>([]);
  const [paymentsPaginationModel, setPaymentsPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const isDataLoading = false;

  useEffect(() => {
    (async () => {
      try {
        const abortController = new AbortController();
        const config: AxiosRequestConfig<any> = { signal: abortController.signal };

        if (isAdmin) {
          config.params = {
            userId: keycloak.tokenParsed?.id || 'test',
          };
        }

        const { data: responseData } = await axios.get('http://localhost:3001/payment', config);
        const { message, data } = responseData;

        if (message) {
          if (Array.isArray(message)) {
            message.forEach((msg) => showNotification(msg, 'error'));
          } else {
            showNotification(message, 'error');
          }
          abortController.abort();
        }

        setPayments(data);
      } catch (err) {
        console.error(err);
        if (hasErrorMessage(err)) {
          showNotification(err.message, 'error');
        }
      }
    })();
  }, [isAdmin]);

  return (
    <>
      <Typography variant="h4" component="h3" sx={styles.tableHeading}>
        {t('dashboard.payments')}
      </Typography>
      <DataGrid
        loading={isDataLoading}
        rows={payments}
        columns={paymentsColumns}
        paginationModel={paymentsPaginationModel}
        onPaginationModelChange={setPaymentsPaginationModel}
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

export { PaymentsTable };
