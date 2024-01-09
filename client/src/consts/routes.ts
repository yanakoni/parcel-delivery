export const ENTITY_LIST_ROUTE = '/list/';
export const ENTITY_EDIT_ROUTE = '/edit/';
export const ENTITY_CREATE_ROUTE = '/create/';
export const ENTITY_READ_ROUTE = '/read/';

export const ROUTES = {
  MAIN: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  LOGIN: '/login',
  RESET_PASSWORD: '/reset-password',
  CHANGE_PASSWORD: '/password',
  USERS: '/users',
  ENTITY_LIST: `${ENTITY_LIST_ROUTE}:entityName`,
  ENTITY_EDIT: `${ENTITY_EDIT_ROUTE}:entityName/:entityId`,
  ENTITY_CREATE: `${ENTITY_CREATE_ROUTE}:entityName`,
  ENTITY_READ: `${ENTITY_READ_ROUTE}:entityName/:entityId`,
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
