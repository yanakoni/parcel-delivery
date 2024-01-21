import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export const RequireAuth: FC<any> = () => {
  const { keycloak } = useKeycloak();
  if (keycloak && keycloak.authenticated) {
    return <Outlet />;
  }
  keycloak?.login();
  return null;
};
