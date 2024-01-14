import { Business, GridView, Inventory, LocalShipping, PersonOutline } from '@mui/icons-material';
import { IMenuItem } from './components';
import { ENTITIES, ROUTES } from '../consts';

export const menuConfig: IMenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: GridView,
    to: ROUTES.DASHBOARD,
  },
  {
    id: 'users',
    label: 'Users',
    icon: PersonOutline,
    to: `${ENTITIES.USERS}`,
  },
  {
    id: 'vehicles',
    label: 'Vehicles',
    icon: LocalShipping,
    to: `${ENTITIES.VEHICLES}`,
  },
  {
    id: 'postOffices',
    label: 'Post Offices',
    icon: Business,
    to: `${ENTITIES.POST_OFFICES}`,
  },
  {
    id: 'createPackage',
    label: 'New Package',
    icon: Inventory,
    to: `${ENTITIES.CREATE_PACKAGE}`,
  },
  // for routes: ModeOfTravel
];
