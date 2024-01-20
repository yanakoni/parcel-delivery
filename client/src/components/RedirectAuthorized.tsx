import { Navigate, Outlet } from 'react-router-dom';
import { keycloak, ROUTES, USER_ROLES } from '../consts';

export const RedirectAuthorized = () => {
  if (keycloak.authenticated && keycloak?.tokenParsed?.realm_access?.roles.includes(USER_ROLES.ADMIN)) {
    return <Navigate to={ROUTES.USERS} />;
  } else {
    return <Outlet />;
  }
};
