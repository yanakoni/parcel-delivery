import { ENDPOINTS, PERMISSION_MODULES, PERMISSION_RESOURCES, SERIALIZER_NAMES } from '../../consts';
import { CreateUserPage, EditUserPage } from '../../pages';
import { EntityConfig } from './config.interface';

export const usersConfig: EntityConfig = {
  apiUrl: ENDPOINTS.GET_USERS,
  listColumns: [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
  ],
  createPage: CreateUserPage,
  editPage: EditUserPage,
  serializerName: SERIALIZER_NAMES.USERS,
  deleteNotAllowed: true,
  createNotAllowed: true,
  permission: {
    module: PERMISSION_MODULES.USER,
    resource: PERMISSION_RESOURCES.USER,
  },
  includes: {
    list: 'user_role',
  },
};
