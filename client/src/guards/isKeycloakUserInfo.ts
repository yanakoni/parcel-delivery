export const isKeycloakUserInfo = (userInfo: any): userInfo is { name: string; email: string } =>
  !!userInfo && typeof userInfo === 'object' && 'name' in userInfo && 'email' in userInfo;
