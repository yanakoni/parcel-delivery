import { CSSProperties, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Toolbar as MuiToolbar,
  Typography,
  Box,
  Badge,
  Divider,
} from '@mui/material';
import { NotificationsNone, Menu, PersonOutline } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { NotificationsList } from './NotificationsList';
import { BASE_ASSETS_URL, ROUTES } from '../../consts';
import { UserWithRole } from '../../interfaces';
import { styles } from './styles';

interface ToolbarProps {
  user: UserWithRole;
  handleDrawerToggle: () => void;
}

const Toolbar: FC<ToolbarProps> = ({ user, handleDrawerToggle }) => {
  const userAvatar = user.settings.profile.avatar;
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const openProfilePage = () => {
    navigate(ROUTES.PROFILE);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box display="flex" alignItems="center">
            <IconButton
              aria-label="notifications"
              onClick={toggleNotifications}
              sx={styles.notificationsToggle}
            >
              <Badge
                badgeContent={2}
                color="error"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <NotificationsNone width={24} height={24} />
              </Badge>
            </IconButton>
            <Divider
              flexItem
              orientation="vertical"
              sx={
                userAvatar
                  ? styles.toolbarDivider
                  : styles.toolbarDividerPlaceholder
              }
            />
            <Box display="flex" alignItems="center">
              <Box mr={2}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  onClick={openProfilePage}
                >
                  {userAvatar && (
                    <img
                      src={`${BASE_ASSETS_URL}${userAvatar}`}
                      alt="User Avatar"
                      style={styles.toolbarAvatar as CSSProperties}
                    />
                  )}
                  {!userAvatar && (
                    <PersonOutline sx={styles.toolbarAvatarPlaceholder} />
                  )}
                </IconButton>
              </Box>
              <Box>
                <Typography
                  component="p"
                  variant="subtitle1"
                  color="text.primary"
                >
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography component="p" variant="h6" color="text.secondary">
                  {`${user?.userRole.roleType}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </MuiToolbar>
      <NotificationsList
        toggle={toggleNotifications}
        open={showNotifications}
      />
    </>
  );
};

export { Toolbar };
