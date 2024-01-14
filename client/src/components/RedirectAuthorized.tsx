import { Navigate, Outlet } from 'react-router-dom';
import { keycloak, ROUTES } from '../consts';

export const RedirectAuthorized = () => {
  if (keycloak.authenticated && keycloak.userInfo) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  } else {
    return <Outlet />;
  }
};
