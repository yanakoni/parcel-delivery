import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';

const mainPadding = 35;

export const generalStyles: { [key: string]: CSSProperties | SxProps } = {
  main: {
    height: {
      sm: '100vh',
    },
    padding: {
      sm: `${mainPadding}px ${mainPadding}px ${mainPadding}px 0`,
      xs: 2,
    },
  },
  image: {
    width: '100%',
  },
  button: {
    padding: '12px 22px',
    marginTop: '36px',
    marginBottom: '50px',
  },
  link: {
    padding: 0,
  },
};
