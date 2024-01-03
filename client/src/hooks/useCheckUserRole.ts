import { UserRole } from '../consts';
import { useUserData } from './useUserData';

export const useCheckUserRole = (role: UserRole): boolean => {
  const user = useUserData();

  return user.userRole.roleType === role;
};
