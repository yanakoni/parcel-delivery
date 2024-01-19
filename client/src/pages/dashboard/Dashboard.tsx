import { ClientDashboard } from './ClientDashboard';
import { AdminDashboard } from './AdminDashboard';
import { keycloak, USER_ROLES } from '../../consts';
import { extractRoleFromRealmAccess } from '../../utils/keycloakRoles';

export const Dashboard = () => {
  const userRole = extractRoleFromRealmAccess(keycloak?.tokenParsed?.realm_access?.roles);
  return userRole === USER_ROLES.CLIENT ? <ClientDashboard /> : <AdminDashboard />;
};
