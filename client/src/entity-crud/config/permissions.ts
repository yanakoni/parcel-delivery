import { EntityConfig } from './config.interface';
import { Role } from '../../interfaces';
import { ENDPOINTS, PERMISSION_MODULES, PERMISSION_RESOURCES, SERIALIZER_NAMES } from '../../consts';

export const permissionsConfig: EntityConfig<Role> = {
  apiUrl: ENDPOINTS.GET_PERMISSIONS,
  listColumns: [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'description', headerName: 'Descriptions', flex: 1 },
  ],
  createPage: () => null,
  editPage: () => null,
  serializerName: SERIALIZER_NAMES.PERMISSIONS,
  permission: {
    module: PERMISSION_MODULES.USER,
    resource: PERMISSION_RESOURCES.PERMISSIONS,
  },
  includes: {
    list: '',
  },
  deletableRowCondition: ({ system }) => !system,
};
