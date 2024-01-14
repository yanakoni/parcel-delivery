import { Box, Grid, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form/dist/types/form';

type PackageDimensionsFormProps = {
  errors: any;
  register: UseFormRegister<any>;
};

const PackageDimensionsForm = ({ errors, register }: PackageDimensionsFormProps) => {
  return (
    <Box>
      <Grid container spacing={6}>
        <Grid xs={12} md={6} item>
          <TextField
            id="length"
            {...register('length')}
            label="Length"
            type="number"
            helperText={errors.length || ''}
            error={!!errors.length}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            id="width"
            {...register('width')}
            label="Width"
            type="number"
            helperText={errors.width || ''}
            error={!!errors.width}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            id="height"
            {...register('height')}
            label="Height"
            type="number"
            helperText={errors.height || ''}
            error={!!errors.height}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            id="weight"
            {...register('weight')}
            label="Weight"
            type="number"
            helperText={errors.weight || ''}
            error={!!errors.weight}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export { PackageDimensionsForm };
export type { PackageDimensionsFormProps };
