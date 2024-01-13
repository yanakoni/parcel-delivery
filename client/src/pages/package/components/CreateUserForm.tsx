import { Box, Grid, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { resolveKey } from '../../../utils';

type CreateUserFormProps = {
  errors: any;
  register: UseFormRegister<any>;
  field: string;
};

const CreateUserForm = ({ errors, register, field }: CreateUserFormProps) => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid xs={12} md={6} item>
          <TextField
            id={`${[field]}.username`}
            {...register(`${[field]}.username`)}
            label="Username"
            type="text"
            helperText={resolveKey(`${field}.username`, errors) || ''}
            error={!!resolveKey(`${field}.username`, errors)}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            id={`${[field]}.email`}
            {...register(`${[field]}.email`)}
            label="Email"
            type="email"
            autoComplete="email"
            helperText={resolveKey(`${field}.email`, errors) || ''}
            error={!!resolveKey(`${field}.email`, errors)}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export { CreateUserForm };
export type { CreateUserFormProps };
