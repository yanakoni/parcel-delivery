import { Box, Grid, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { resolveKey } from '../../../utils';

type CreateAddressFormProps = {
  errors: any;
  register: UseFormRegister<any>;
  field: string;
  hasNotes?: boolean;
};

const CreateAddressForm = ({ errors, register, field, hasNotes = false }: CreateAddressFormProps) => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid xs={12} md={6} item>
          <TextField
            id={`${[field]}.country`}
            {...register(`${[field]}.country`)}
            label="Country"
            type="text"
            autoComplete="country-name"
            helperText={resolveKey(`${field}.country`, errors) || ''}
            error={!!resolveKey(`${field}.country`, errors)}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            id={`${[field]}.state`}
            {...register(`${[field]}.state`)}
            label="State"
            type="text"
            autoComplete="address-level1"
            helperText={resolveKey(`${field}.state`, errors) || ''}
            error={!!resolveKey(`${field}.state`, errors)}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            id={`${[field]}.city`}
            {...register(`${[field]}.city`)}
            label="City"
            type="text"
            autoComplete="address-level2"
            helperText={resolveKey(`${field}.city`, errors) || ''}
            error={!!resolveKey(`${field}.city`, errors)}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            id={`${[field]}.street`}
            {...register(`${[field]}.street`)}
            label="Street"
            type="text"
            autoComplete="address-line1"
            helperText={resolveKey(`${field}.street`, errors) || ''}
            error={!!resolveKey(`${field}.street`, errors)}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            id={`${[field]}.tel`}
            {...register(`${[field]}.tel`)}
            label="Phone Number"
            type="tel"
            autoComplete="tel"
            helperText={resolveKey(`${field}.tel`, errors) || ''}
            error={!!resolveKey(`${field}.tel`, errors)}
            fullWidth
          />
        </Grid>
        {hasNotes && (
          <Grid xs={12} item>
            <TextField
              id={`${[field]}.note`}
              {...register(`${[field]}.note`)}
              label="Notes (optional)"
              type="text"
              autoComplete="off"
              helperText={resolveKey(`${field}.note`, errors) || ''}
              error={!!resolveKey(`${field}.note`, errors)}
              fullWidth
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export { CreateAddressForm };
export type { CreateAddressFormProps };
