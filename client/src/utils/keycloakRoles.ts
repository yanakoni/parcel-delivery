import { USER_ROLES, UserRole } from '../consts';

export function extractRoleFromRealmAccess(roles: string[] = []): UserRole {
  switch (true) {
    case roles.includes(USER_ROLES.ADMIN):
      return USER_ROLES.ADMIN;
    case roles.includes(USER_ROLES.DRIVER):
      return USER_ROLES.DRIVER;
    case !roles.length:
    default:
      return USER_ROLES.CLIENT;
  }
}
