import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts';
import { keycloak, ROUTES } from './consts';
import { CreatePackage, Dashboard, ErrorPage, PaymentsTable, PostOfficeList, UsersList, VehiclesList } from './pages';
import { RequireAuth } from './components';

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    errorElement: <ErrorPage />,
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
            element: <RequireAuth />,
            children: [
              {
                path: ROUTES.USERS,
                element: <UsersList />,
              },
            ],
          },
          {
            element: <RequireAuth />,
            children: [
              {
                path: ROUTES.VEHICLES,
                element: <VehiclesList />,
              },
            ],
          },
          {
            element: <RequireAuth />,
            children: [
              {
                path: ROUTES.POST_OFFICES,
                element: <PostOfficeList />,
              },
            ],
          },
          {
            children: [
              {
                path: ROUTES.CREATE_PACKAGE,
                element: keycloak.authenticated ? <CreatePackage isAdmin /> : <CreatePackage isAdmin={false} />,
              },
            ],
          },
          {
            children: [
              {
                path: ROUTES.PAYMENTS,
                element: keycloak.authenticated ? <PaymentsTable isAdmin /> : <PaymentsTable isAdmin={false} />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
