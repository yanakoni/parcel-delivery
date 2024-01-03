import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: {
  [key: string]: SxProps<Theme>;
} = {
  verificationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column nowrap',
    padding: '50px 104px',
    textAlign: 'center',
    borderRadius: '20px',
  },
  verificationButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: (theme) => theme.palette.common.white,
    gap: 1,
    padding: '8px 22px',
  },
};
