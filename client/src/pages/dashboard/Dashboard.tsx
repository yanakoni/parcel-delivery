import { ClientDashboard } from './ClientDashboard';
import { AdminDashboard } from './AdminDashboard';
import { keycloak, USER_ROLES } from '../../consts';

export const Dashboard = () => {
  const isClient = !keycloak.authenticated || keycloak.realmAccess?.roles.includes(USER_ROLES.CLIENT);

  return isClient ? <ClientDashboard /> : <AdminDashboard />;
};
