import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { ROUTES } from '../consts';
import { selectUser } from '../store';

export const RedirectAuthorized = () => {
  const user = useAppSelector(selectUser);

  return user ? <Navigate to={ROUTES.DASHBOARD} /> : <Outlet />;
};
