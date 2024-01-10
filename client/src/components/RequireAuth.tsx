import { FC } from 'react';
import { Outlet } from 'react-router-dom';

// import { keycloak } from '../consts';

interface RequireAuthProps {}

export const RequireAuth: FC<RequireAuthProps> = () => {
  // if (keycloak.authenticated && keycloak.userInfo) {
  //   return <Outlet />;
  // } else {
  //   (async () => keycloak.login())();
  // }

  return <Outlet />;
};
