import { useUserData } from './useUserData';
import { UserRole } from '../consts';

export const useUserRole = (): UserRole | null => {
  const user = useUserData();

  return user.userRole.roleType;
};
