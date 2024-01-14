import { useCallback } from 'react';
import { Box, Button, Divider, Grid, List, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Logout } from '@mui/icons-material';
import { IMenuItem, MenuItem } from './MenuItem';
import { styles } from './styles';
import { keycloak } from '../../consts';

export const SideMenu = ({ menuConfig }: { menuConfig: IMenuItem[] }) => {
  const { t } = useTranslation();

  const logOut = useCallback(async () => {
    await keycloak.logout();
  }, []);

  return (
    <>
      <Box sx={styles.menuContainer}>
        <Grid container mb={3} spacing={2}>
          <Grid item>
            <img src="/android-chrome-192x192.png" alt="" width="45px" height="45px" />
          </Grid>
          <Grid display="flex" alignItems="center" item>
            <Typography variant="h5" component="h1">
              EquatorExpress
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
