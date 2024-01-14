import { ClientDashboard } from './ClientDashboard';
// import { AdminDashboard } from './AdminDashboard';
// import { keycloak, USER_ROLES } from '../../consts';

export const Dashboard = () => {
  // const isClient = keycloak.authenticated && (keycloak.userInfo as any)?.role === USER_ROLES.CLIENT;

  // return isClient ? <ClientDashboard /> : <AdminDashboard />;
  return <ClientDashboard />;
};
