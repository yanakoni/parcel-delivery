import { EntityConfig } from './config.interface';
import { Role } from '../../interfaces';
import { ENDPOINTS, PERMISSION_MODULES, PERMISSION_RESOURCES, SERIALIZER_NAMES } from '../../consts';

export const parcelsConfig: EntityConfig<Role> = {
  apiUrl: ENDPOINTS.USER_ROLES,
  listColumns: [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'description', headerName: 'Descriptions', flex: 1 },
  ],
  createPage: () => null,
  editPage: () => null,
  serializerName: SERIALIZER_NAMES.PARCELS,
  permission: {
    module: PERMISSION_MODULES.USER,
    resource: PERMISSION_RESOURCES.PARCELS,
  },
  includes: {
    list: '',
  },
  deletableRowCondition: ({ system }) => !system,
};
