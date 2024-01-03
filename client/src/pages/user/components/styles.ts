import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: {
  [key: string]: SxProps<Theme>;
} = {
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column nowrap',
    padding: '50px 92px',
    textAlign: 'center',
    borderRadius: '20px',
  },
  formTitle: {
    textTransform: 'uppercase',
  },
  formButton: {
    mt: 4,
    padding: '8px 22px',
  },
};
