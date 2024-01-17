import { Navigate, Outlet } from 'react-router-dom';
import { keycloak, ROUTES, USER_ROLES } from '../consts';

export const RedirectAuthorized = () => {
  if (keycloak.authenticated && keycloak.realmAccess?.roles.includes(USER_ROLES.ADMIN)) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  } else {
    return <Outlet />;
  }
};
