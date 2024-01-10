import Keycloak, { KeycloakConfig } from 'keycloak-js';

const API_PATH = '/api/v1';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = import.meta.env.MODE === 'development' ? `${VITE_BASE_URL}${API_PATH}` : API_PATH;
const BASE_ASSETS_URL = VITE_BASE_URL;

const ENDPOINTS: { [key: string]: { url: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' } } = {
  SIGN_UP: { url: 'registration', method: 'POST' },
  LOGIN: { url: 'login', method: 'POST' },
  LOGOUT: { url: 'logout', method: 'POST' },
  RESET_PASSWORD: { url: 'reset', method: 'POST' },
  CHANGE_PASSWORD: { url: 'reset/password', method: 'PATCH' },
  UPDATE_PASSWORD: { url: 'user/password', method: 'PATCH' },
  GET_USER_DATA: { url: 'user', method: 'GET' },
  PATCH_USER_DATA: { url: 'user', method: 'PATCH' },
  POST_CREATE_USER: { url: 'users', method: 'GET' },
  GET_USERS: { url: 'users', method: 'GET' },
  GET_DRIVERS: { url: 'driver', method: 'GET' },
  POST_CREATE_DRIVER: { url: 'driver', method: 'POST' },
  PATCH_DRIVER: { url: 'driver', method: 'PATCH' },
  GET_VEHICLES: { url: 'vehicle', method: 'GET' },
  POST_CREATE_VEHICLE: { url: 'vehicle', method: 'POST' },
  PATCH_VEHICLE: { url: 'vehicle', method: 'PATCH' },
  GET_PARCELS: { url: 'parcel', method: 'GET' },
  POST_CREATE_PARCEL: { url: 'parcel', method: 'POST' },
  PATCH_UPDATE_PARCEL_DATA: { url: 'parcel', method: 'PATCH' },
  GET_POST_OFFICES: { url: 'post-office', method: 'GET' },
  POST_CREATE_POST_OFFICES: { url: 'post-office', method: 'POST' },
  PATCH_POST_OFFICES: { url: 'post-office', method: 'PATCH' },
  GET_USER_ROLES: { url: 'user-role', method: 'GET' },
  POST_CREATE_USER_ROLES: { url: 'user-role', method: 'POST' },
  PATCH_USER_ROLES: { url: 'user-role', method: 'PATCH' },
  GET_CUSTOMERS: { url: 'payment/customer', method: 'GET' },
  POST_CREATE_CUSTOMER: { url: 'payment/customer', method: 'POST' },
  PATCH_ADD_CUSTOMER_TOKEN: { url: 'payment/token', method: 'PATCH' },
  PATCH_ADD_CUSTOMER_CARD: { url: 'payment/card', method: 'PATCH' },
  POST_CHARGE_CUSTOMER: { url: 'payment/charge', method: 'POST' },
  GET_TRANSACTIONS: { url: 'transactions', method: 'GET' },
  GET_PERMISSIONS: { url: 'permissions', method: 'GET' },
} as const;

const ENTITIES = {
  USERS: 'users',
  ROLES: 'roles',
  PARCELS: 'parcels',
  DRIVERS: 'drivers',
  POST_OFFICES: 'post-offices',
  VEHICLES: 'vehicles',
  CUSTOMERS: 'customers',
  TRANSACTIONS: 'transactions',
  PERMISSIONS: 'permissions',
} as const;

const initOptions: KeycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_BASE_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

const keycloak = new Keycloak(initOptions);

export type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];
export type EntityName = (typeof ENTITIES)[keyof typeof ENTITIES];

export { keycloak, ENTITIES, ENDPOINTS, BASE_URL, BASE_ASSETS_URL };
