import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: {
  [key: string]: SxProps<Theme>;
} = {
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadAvatarButton: {
    borderRadius: '50%',
    height: '200px',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 2,
    background: (theme) => theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
