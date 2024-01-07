import { ENDPOINTS, PERMISSION_MODULES, PERMISSION_RESOURCES, SERIALIZER_NAMES } from '../../consts';
import { CreateUserPage, EditUserPage } from '../../pages';
import { EntityConfig } from './config.interface';

export const usersConfig: EntityConfig = {
  apiUrl: ENDPOINTS.GET_USERS,
  listColumns: [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
  ],
  createPage: CreateUserPage,
  editPage: EditUserPage,
  serializerName: SERIALIZER_NAMES.USERS,
  deleteNotAllowed: false,
  createNotAllowed: false,
  permission: {
    module: PERMISSION_MODULES.USER,
    resource: PERMISSION_RESOURCES.USER,
  },
  includes: {},
};
