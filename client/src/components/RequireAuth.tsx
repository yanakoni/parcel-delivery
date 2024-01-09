import { FC } from 'react';
import { Outlet } from 'react-router-dom';
// import { ROUTES } from '../consts';
// import { useAppSelector } from '../hooks';
// import { selectUser } from '../store';

interface RequireAuthProps {}

export const RequireAuth: FC<RequireAuthProps> = () => {
  // const user = useAppSelector(selectUser);

  // return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
  return <Outlet />;
};
