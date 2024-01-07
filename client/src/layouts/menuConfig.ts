import { GridView, PersonOutline } from '@mui/icons-material';
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
];
