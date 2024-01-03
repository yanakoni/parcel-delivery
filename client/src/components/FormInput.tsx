import { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type IFormInputProps = {
  name: string;
  defaultValue?: string;
} & TextFieldProps;

export const FormInput: FC<IFormInputProps> = ({
  name,
  defaultValue,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <TextField
          {...otherProps}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : ''}
          fullWidth
        />
      )}
    />
  );
};
