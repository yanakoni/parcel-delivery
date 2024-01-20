import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Box, Button, Divider, IconButton, Toolbar as MuiToolbar, Typography } from '@mui/material';
import { Menu, NotificationsNone, PersonOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { grey } from '@mui/material/colors';
import { NotificationsList } from './NotificationsList';
import { keycloak, ROUTES } from '../../consts';
import { styles } from './styles';
import { fixtures } from '../../pages';
import { extractRoleFromRealmAccess } from '../../utils/keycloakRoles';

interface ToolbarProps {
  handleDrawerToggle: () => void;
}

const Toolbar: FC<ToolbarProps> = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    if (!keycloak.authenticated) return;

    setUserData({
      name: keycloak?.tokenParsed?.name,
      email: keycloak?.tokenParsed?.email,
      role: extractRoleFromRealmAccess(keycloak?.realmAccess?.roles),
    });
  }, [keycloak.authenticated, keycloak.tokenParsed]);

  const openProfilePage = () => {
    navigate(ROUTES.PROFILE);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const signUp = () => {
    const registerUrl = keycloak.createRegisterUrl();
    window.location.replace(registerUrl);
  };

  return (
    <>
      <MuiToolbar sx={{ height: '100%' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
          size="large"
        >
          <Menu sx={{ color: grey[600] }} />
        </IconButton>
        <Box width="100%" display="flex" justifyContent="flex-end" alignItems="center">
          <Box display="flex" alignItems="center">
            <IconButton aria-label="notifications" onClick={toggleNotifications} sx={styles.notificationsToggle}>
              <Badge
                badgeContent={fixtures.notifications.length}
                color="error"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <NotificationsNone width={24} height={24} />
              </Badge>
            </IconButton>
            <Divider flexItem orientation="vertical" sx={styles.toolbarDividerPlaceholder} />
            {keycloak.authenticated && (
              <Box display="flex" alignItems="center">
                <Box mr={2}>
                  <IconButton size="large" aria-label="account of current user" onClick={openProfilePage}>
                    <PersonOutline sx={styles.toolbarAvatarPlaceholder} />
                  </IconButton>
                </Box>
                <Box>
                  <Typography component="p" variant="subtitle1" color="text.primary">
                    {userData.name}, {userData.email}
                  </Typography>
                  <Typography component="p" variant="h6" color="text.secondary">
                    {userData.role}
                  </Typography>
                </Box>
              </Box>
            )}
            {!keycloak.authenticated && (
              <Box display="flex" alignItems="center">
                <Box mr={2}>
                  <Button onClick={signUp}>{t('signUp.signUp')}</Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </MuiToolbar>
      <NotificationsList toggle={toggleNotifications} open={showNotifications} />
    </>
  );
};

export { Toolbar };
