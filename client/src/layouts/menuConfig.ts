import { FormatListBulleted, GridView, PersonOutline } from '@mui/icons-material';
import { IMenuItem } from './components';
import {
  ENTITIES,
  ENTITY_LIST_ROUTE,
  PERMISSION_ACTIONS,
  PERMISSION_MODULES,
  PERMISSION_RESOURCES,
  ROUTES,
} from '../consts';

export const menuConfig: IMenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: GridView,
    to: ROUTES.DASHBOARD,
  },
  {
    id: 'roles',
    label: 'Roles',
    icon: FormatListBulleted,
    to: `${ENTITY_LIST_ROUTE}${ENTITIES.ROLES}`,
    menuGroup: ENTITIES.ROLES,
    permission: {
      module: PERMISSION_MODULES.USER,
      resource: PERMISSION_RESOURCES.USER_ROLE,
      action: PERMISSION_ACTIONS.READ,
    },
  },
  {
    id: 'users',
    label: 'Users',
    icon: PersonOutline,
    to: `${ENTITY_LIST_ROUTE}${ENTITIES.USERS}`,
    menuGroup: ENTITIES.USERS,
    permission: {
      module: PERMISSION_MODULES.USER,
      resource: PERMISSION_RESOURCES.USER,
      action: PERMISSION_ACTIONS.READ,
    },
  },
];
