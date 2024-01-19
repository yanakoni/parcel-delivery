import KcAdminClient from '@keycloak/keycloak-admin-client';
const kcAdminClient = new KcAdminClient({
  baseUrl: 'http://localhost:8080',
  realmName: 'dev',
});
export const getKcAdminClient = async () => {
  await kcAdminClient.auth({
    grantType: 'client_credentials',
    clientId: 'service-app',
    clientSecret: 'PRZI91QxB42o8JmdRBcyKuO6yMQXSAJ5',
  });
  return kcAdminClient;
};
