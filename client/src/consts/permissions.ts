export const PERMISSION_ACTIONS = {
  READ: 'read',
  WRITE: 'write',
} as const;

export const PERMISSION_MODULES = {
  USER: 'user',
} as const;

export const PERMISSION_RESOURCES = {
  USER_ROLE: 'userRole',
  USER: 'user',
  TRANSACTION: 'transaction',
  PERMISSIONS: 'permissions',
  PARCELS: 'parcels',
  DRIVERS: 'drivers',
  POST_OFFICES: 'post-offices',
  CUSTOMERS: 'customers',
  VEHICLES: 'vehicles',
} as const;

export type PermissionResource = (typeof PERMISSION_RESOURCES)[keyof typeof PERMISSION_RESOURCES];
export type PermissionModule = (typeof PERMISSION_MODULES)[keyof typeof PERMISSION_MODULES];
export type PermissionAction = (typeof PERMISSION_ACTIONS)[keyof typeof PERMISSION_ACTIONS];
