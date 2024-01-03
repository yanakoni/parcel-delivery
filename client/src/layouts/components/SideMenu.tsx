import { useCallback } from 'react';
import { Box, Button, Divider, Grid, List, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Logout } from '@mui/icons-material';
import { IMenuItem, MenuItem } from './MenuItem';
import { useLogoutMutation } from '../../api';
import { useAppDispatch } from '../../hooks';
import { apiSlice } from '../../store';
import { AppIcon } from './AppIcon';
import { styles } from './styles';

export const SideMenu = ({ menuConfig }: { menuConfig: IMenuItem[] }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const logOut = useCallback(async () => {
    await logout();

    dispatch(apiSlice.util.resetApiState());
  }, [dispatch, logout]);

  return (
    <>
      <Box sx={styles.menuContainer}>
        <Grid container mb={3}>
          <Grid item xs={4}>
            <AppIcon />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4" component="h1">
              EquatorExpress
            </Typography>
            <Typography variant="body1" component="p" color="text.secondary">
              {t('general.brokerPlatform')}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <List component="nav" sx={styles.menuList}>
          {menuConfig.map((menuEl) => (
            <MenuItem key={menuEl.id} {...menuEl} sx={styles.menuItem} />
          ))}
        </List>
      </Box>
      <Divider />
      <Button color="secondary" endIcon={<Logout sx={styles.logOutIcon} />} onClick={logOut} sx={styles.logOutButton}>
        {t('general.logOut')}
      </Button>
    </>
  );
};
