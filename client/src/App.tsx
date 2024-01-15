import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import muiTheme from './mui-theme';
import { router } from './router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51OYXecL2SeZcpegN0rWjAodIyxhc18RMqaxf4NIWllEXdhnH50Boeoqf8LhYEAeiVE5DlbyYBBUHLWegZktRL9YM00iRjE2rNv',
);

export const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <SnackbarProvider maxSnack={3}>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
