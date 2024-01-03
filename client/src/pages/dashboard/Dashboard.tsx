import { ClientDashboard } from './ClientDashboard';
import { AdminDashboard } from './AdminDashboard';
import { useCheckUserRole } from '../../hooks';
import { USER_ROLES } from '../../consts';

export const Dashboard = () => {
  const isClient = useCheckUserRole(USER_ROLES.CLIENT);

  return isClient ? <ClientDashboard /> : <AdminDashboard />;
};
