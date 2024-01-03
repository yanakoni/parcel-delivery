import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';

export const styles: {
  [key: string]: CSSProperties | SxProps;
} = {
  notificationsToggle: {
    background: '#F3F7FF',
    padding: '10px',
  },
  sideMenuLogo: {
    width: '55px',
    borderRadius: '50%',
    height: '55px',
    objectFit: 'fill',
  },
  toolbarDivider: { marginLeft: '20px', marginRight: '8px' },
  toolbarDividerPlaceholder: {
    marginLeft: '20px',
    marginRight: '20px',
  },
  toolbarAvatar: {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
  },
  toolbarAvatarPlaceholder: {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
  },
  logOutButton: {
    fontSize: '20px',
    fontWeight: 400,
    marginTop: 4,
  },
  logOutIcon: {
    marginLeft: '12px',
  },
  menuContainer: {
    height: '100%',
    overflowY: 'auto',
  },
  menuList: {
    marginTop: 3,
  },
  menuItem: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  drawerContainer: {
    '& .MuiDrawer-paper': {
      borderRadius: '20px var(--none, 0px) var(--none, 0px) 20px',
      background: '#FFF',
      boxShadow:
        '-13px 13px 39px 0px rgba(199, 199, 199, 0.07), -50px 51px 72px 0px rgba(199, 199, 199, 0.06), -114px 115px 97px 0px rgba(199, 199, 199, 0.04), -202px 204px 115px 0px rgba(199, 199, 199, 0.01), -315px 318px 125px 0px rgba(199, 199, 199, 0.00)',
      position: 'absolute',
      top: 0,
      right: 0,
      maxWidth: '80vw',
      minWidth: '400px',
      width: '600px',
      padding: '35px 53px 35px 35px',
      overflow: 'hidden',
    },
    markAsReadButton: {
      textDecorationLine: 'underline',
      background: 'none',
    },
    tabListContainer: { borderBottom: 1, borderColor: 'divider' },
  },
  notification: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: 0,
    alignItems: 'flex-start',
    gap: '12px',
    marginTop: 2,
    marginBottom: 3,
  },
  notificationBody: {
    color: '#757575',
    maxWidth: '100%',
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  },
};
