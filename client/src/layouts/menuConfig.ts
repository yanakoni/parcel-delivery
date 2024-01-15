import {
  Business,
  GridView,
  Inventory,
  LocalPostOffice,
  LocalShipping,
  Payments,
  PersonOutline,
} from '@mui/icons-material';
import { IMenuItem } from './components';
import { ENTITIES, ROUTES, USER_ROLES } from '../consts';

export const menuConfig: IMenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: GridView,
    to: ROUTES.DASHBOARD,
    roles: Object.values(USER_ROLES),
  },
  {
    id: 'users',
    label: 'Users',
    icon: PersonOutline,
    to: `${ENTITIES.USERS}`,
    roles: [USER_ROLES.ADMIN],
  },
  {
    id: 'vehicles',
    label: 'Vehicles',
    icon: LocalShipping,
    to: `${ENTITIES.VEHICLES}`,
    roles: [USER_ROLES.ADMIN, USER_ROLES.DRIVER],
  },
  {
    id: 'postOffices',
    label: 'Post Offices',
    icon: Business,
    to: `${ENTITIES.POST_OFFICES}`,
    roles: [USER_ROLES.ADMIN],
  },
  {
    id: 'createPackage',
    label: 'New Package',
    icon: Inventory,
    to: `${ENTITIES.CREATE_PACKAGE}`,
    roles: [USER_ROLES.ADMIN, USER_ROLES.CLIENT],
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: Payments,
    to: `${ENTITIES.PAYMENTS}`,
    roles: [USER_ROLES.ADMIN, USER_ROLES.CLIENT],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: LocalPostOffice,
    to: `${ENTITIES.ORDERS}`,
    roles: [USER_ROLES.ADMIN],
  },
];
