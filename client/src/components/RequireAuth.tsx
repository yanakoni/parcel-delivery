import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { keycloak } from '../consts';

export const RequireAuth: FC<any> = () => {
  if (keycloak.authenticated && keycloak.tokenParsed) {
    return <Outlet />;
  } else {
    (async () => keycloak.login())();
  }
};
