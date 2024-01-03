import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../consts';
import { HasPermissionsArgs, useHasPermissions } from '../hooks';

export const RequirePermission: FC<HasPermissionsArgs> = (permissionArgs) => {
  const hasAccess = useHasPermissions(permissionArgs);

  return hasAccess ? <Outlet /> : <Navigate to={ROUTES.DASHBOARD} />;
};
