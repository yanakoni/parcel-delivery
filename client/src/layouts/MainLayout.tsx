import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar as MuiAppBar, AppBarProps, Box, CssBaseline, Drawer as MuiDrawer, styled } from '@mui/material';
import { SideMenu, Toolbar } from './components';
import { UserContext } from '../contexts/userContext';
import { selectUser } from '../store';
import { useAppSelector } from '../hooks';
import { menuConfig } from './menuConfig';

const drawerWidth = 286;

const container = window !== undefined ? () => window.document.body : undefined;

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer - 1,
  marginLeft: drawerWidth,
  boxShadow: 'none',
  border: 'none',
}));

const Drawer = styled(MuiDrawer)(() => ({
  '& .MuiDrawer-paper': {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    padding: '41px 22px',
    borderRight: 'none',
    height: '100vh',
  },
}));

export const MainLayout = () => {
  const user = useAppSelector(selectUser);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <UserContext.Provider value={user!}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          {user && <Toolbar handleDrawerToggle={handleDrawerToggle} user={user} />}
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <SideMenu menuConfig={menuConfig} />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            <SideMenu menuConfig={menuConfig} />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          }}
        >
          <Box sx={{ p: { sm: 6 }, paddingTop: { xs: '160px', sm: '162px' }, minHeight: '100vh' }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </UserContext.Provider>
  );
};
