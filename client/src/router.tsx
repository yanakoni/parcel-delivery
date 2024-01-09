import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Authenticate, RequireAuth } from './components';
import { MainLayout } from './layouts';
import { ROUTES } from './consts';
import { EntityCreate, EntityEdit, EntityList, EntityRead } from './entity-crud';
import {
  ChangePasswordPage,
  Dashboard,
  ErrorPage,
  LoginPage,
  ProfilePage,
  ResetPasswordPage,
  UsersList,
} from './pages';
import { VehiclesList } from './pages/vehicles';

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    errorElement: <ErrorPage />,
    element: (
      <Authenticate>
        <RequireAuth />
      </Authenticate>
    ),
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.MAIN,
            element: <Navigate to={ROUTES.DASHBOARD} />,
          },
          {
            children: [
              {
                path: ROUTES.DASHBOARD,
                element: <Dashboard />,
              },
            ],
          },
          {
            children: [
              {
                path: ROUTES.PROFILE,
                element: <ProfilePage />,
              },
            ],
          },
          {
            children: [
              {
                path: ROUTES.USERS,
                element: <UsersList />,
              },
            ],
          },
          {
            children: [
              {
                path: ROUTES.VEHICLES,
                element: <VehiclesList />,
              },
            ],
          },
          {
            path: ROUTES.ENTITY_LIST,
            element: <EntityList />,
          },
          {
            path: ROUTES.ENTITY_EDIT,
            element: <EntityEdit />,
          },
          {
            path: ROUTES.ENTITY_CREATE,
            element: <EntityCreate />,
          },
          {
            path: ROUTES.ENTITY_READ,
            element: <EntityRead />,
          },
          {
            path: ROUTES.LOGIN,
            element: <LoginPage />,
          },
          {
            path: ROUTES.RESET_PASSWORD,
            element: <ResetPasswordPage />,
          },
          {
            path: ROUTES.CHANGE_PASSWORD,
            element: <ChangePasswordPage />,
          },
        ],
      },
    ],
  },
  // {
  //   element: (
  //     <Authenticate>
  //       <RedirectAuthorized />
  //     </Authenticate>
  //   ),
  //   children: [
  //     {
  //       path: ROUTES.LOGIN,
  //       element: <LoginPage />,
  //     },
  //     {
  //       path: ROUTES.RESET_PASSWORD,
  //       element: <ResetPasswordPage />,
  //     },
  //     {
  //       path: ROUTES.CHANGE_PASSWORD,
  //       element: <ChangePasswordPage />,
  //     },
  //   ],
  // },
]);
