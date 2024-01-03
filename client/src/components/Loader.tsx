import { FC } from 'react';
import { SxProps, CircularProgress, Box } from '@mui/material';

type LoaderType = 'fullscreen' | 'page';
interface LoaderProps {
  type: LoaderType;
}

const loaderStyles: Record<LoaderType, SxProps> = {
  fullscreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
  },
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 112px)',
    width: '100%',
  },
};

export const Loader: FC<LoaderProps> = ({ type }) => {
  return (
    <Box sx={loaderStyles[type]}>
      <CircularProgress />
    </Box>
  );
};
