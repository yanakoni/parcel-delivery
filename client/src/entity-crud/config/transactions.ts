import { EntityConfig } from './config.interface';
import { Transaction } from '../../interfaces';
import { ENDPOINTS, PERMISSION_MODULES, PERMISSION_RESOURCES, SERIALIZER_NAMES } from '../../consts';

export const transactionsConfig: EntityConfig<Transaction> = {
  apiUrl: ENDPOINTS.GET_TRANSACTIONS,
  listColumns: [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'description', headerName: 'Descriptions', flex: 1 },
  ],
  createPage: () => null,
  editPage: () => null,
  serializerName: SERIALIZER_NAMES.TRANSACTIONS,
  permission: {
    module: PERMISSION_MODULES.USER,
    resource: PERMISSION_RESOURCES.TRANSACTION,
  },
  includes: {
    list: '',
  },
};
