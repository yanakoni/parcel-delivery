import { FC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { UseFormRegister } from 'react-hook-form/dist/types/form';

type IFormSelectProps = {
  name: string;
  defaultValue?: string;
  register: UseFormRegister<any>;
  errors: any;
  enumObject: any;
} & SelectProps;

const FormSelect: FC<IFormSelectProps> = ({
  errors,
  register,
  enumObject,
  name,
  label,
  defaultValue,
  ...otherProps
}) => (
  <FormControl fullWidth>
    <InputLabel
      id={`select-label-${name}`}
      sx={{
        background: (theme) => theme.palette.common.white,
        padding: '0 6px',
      }}
    >
      {label}
    </InputLabel>
    <Select
      labelId="locale-label"
      defaultValue={defaultValue}
      error={!!errors[name]}
      {...register(name)}
      {...otherProps}
    >
      {Object.values<string>(enumObject).map((val) => (
        <MenuItem key={val} value={val}>
          {val}
        </MenuItem>
      ))}
    </Select>
    {errors && errors[name] && (
      <FormHelperText error>{errors[name] || ''}</FormHelperText>
    )}
  </FormControl>
);

export { FormSelect };
