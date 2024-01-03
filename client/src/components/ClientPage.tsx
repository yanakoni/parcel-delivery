import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { USER_ROLES, ROUTES } from '../consts';
import { useCheckUserRole } from '../hooks';

export const ClientPage = ({ children }: { children: JSX.Element }) => {
  const isClient = useCheckUserRole(USER_ROLES.CLIENT);

  return isClient ? children : <Navigate to={ROUTES.DASHBOARD} />;
};
