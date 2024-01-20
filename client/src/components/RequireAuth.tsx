import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { keycloak } from '../consts';

export const RequireAuth: FC<any> = () => {
  if (keycloak && keycloak.authenticated) {
    return <Outlet />;
  }
  keycloak?.login();
  return null;
};
