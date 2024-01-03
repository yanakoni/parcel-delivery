import { CreateRolePage, EditRolePage } from '../../pages';
import { EntityConfig } from './config.interface';
import { Role } from '../../interfaces';
import {
  ENDPOINTS,
  SERIALIZER_NAMES,
  PERMISSION_MODULES,
  PERMISSION_RESOURCES,
} from '../../consts';

export const rolesConfig: EntityConfig<Role> = {
  apiUrl: ENDPOINTS.USER_ROLES,
  listColumns: [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'description', headerName: 'Descriptions', flex: 1 },
  ],
  createPage: CreateRolePage,
  editPage: EditRolePage,
  serializerName: SERIALIZER_NAMES.ROLE,
  permission: {
    module: PERMISSION_MODULES.USER,
    resource: PERMISSION_RESOURCES.USER_ROLE,
  },
  includes: {
    list: '',
  },
  deletableRowCondition: ({ system }) => !system,
};
