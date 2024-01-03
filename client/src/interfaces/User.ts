import { Locale } from '../enums';
import { Role } from './Role';

export interface User {
  id: string;
  status: string;
  email: string;
  firstName: string;
  lastName: string;
  settings: {
    preferences: {
      locale: Locale;
      tableItemsCount: number;
    };
    profile: {
      avatar: string | null;
      phone: string | null;
    };
  };
}

export interface UserWithRole extends User {
  userRole: Role;
}
