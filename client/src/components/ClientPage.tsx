import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { USER_ROLES, ROUTES, keycloak } from '../consts';
import { extractRoleFromRealmAccess } from '../utils/keycloakRoles';

export const ClientPage = ({ children }: { children: JSX.Element }) => {
  const userRole = extractRoleFromRealmAccess(keycloak?.tokenParsed?.realm_access?.roles);
  return userRole === USER_ROLES.CLIENT ? children : <Navigate to={ROUTES.DASHBOARD} />;
};
