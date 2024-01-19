import { USER_ROLES, UserRole } from "../consts";

export function extractRoleFromRealmAccess(roles?: string[]): UserRole {
  if (roles == undefined) {
    return USER_ROLES.CLIENT;
  }

  if (roles.includes(USER_ROLES.ADMIN)) {
    return USER_ROLES.ADMIN;
  }

  if (roles.includes(USER_ROLES.DRIVER)) {
    return USER_ROLES.DRIVER;
  }

  return USER_ROLES.CLIENT;
}
