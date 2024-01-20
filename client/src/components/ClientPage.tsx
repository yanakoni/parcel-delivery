import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { keycloak, ROUTES, USER_ROLES } from '../consts';
import { extractRoleFromRealmAccess } from '../utils/keycloakRoles';

export const ClientPage = ({ children }: { children: JSX.Element }) => {
  const userRole = extractRoleFromRealmAccess(keycloak?.realmAccess?.roles);
  return userRole === USER_ROLES.CLIENT ? children : <Navigate to={ROUTES.DASHBOARD} />;
};
