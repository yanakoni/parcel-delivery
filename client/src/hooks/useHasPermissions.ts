import { PermissionAction, PermissionModule, PermissionResource } from '../consts';
import { useUserData } from './useUserData';

export interface HasPermissionsArgs {
  module: PermissionModule;
  resource: PermissionResource;
  action: PermissionAction;
}

export const useHasPermissions = (permissions: HasPermissionsArgs | undefined): boolean => {
  const user = useUserData();

  if (!permissions) return true;

  const { module, resource, action } = permissions;

  const accessScope = user.userRole.accessScope || null;
  const permissionKey = `${module}.${resource}:${action}`;

  return accessScope
    ? Object.prototype.hasOwnProperty.call(accessScope, permissionKey) && accessScope[permissionKey]
    : false;
};
