import { JSX } from 'react';
import { Grid } from '@mui/material';

export const CreateFormWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <Grid container item xs={12} justifyContent="center">
      <Grid
        container
        item
        xs={12}
        md={9}
        lg={6}
        p={3}
        sx={{ background: 'white', borderRadius: '10px' }}
      >
        {children}
      </Grid>
    </Grid>
  );
};
