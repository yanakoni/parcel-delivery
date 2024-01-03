import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import muiTheme from './mui-theme';
import { router } from './router';

export const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};
