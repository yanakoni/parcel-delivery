export const SERIALIZER_NAMES = {
  ROLE: 'user-roles',
  USERS: 'users',
  TRANSACTIONS: 'transactions',
  PERMISSIONS: 'permissions',
  PARCELS: 'parcels',
  DRIVERS: 'drivers',
  POST_OFFICES: 'post-offices',
  CUSTOMERS: 'customers',
  VEHICLES: 'vehicles',
} as const;

export type SerializerName = (typeof SERIALIZER_NAMES)[keyof typeof SERIALIZER_NAMES];
