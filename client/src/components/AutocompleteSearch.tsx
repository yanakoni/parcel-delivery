import React, { useCallback } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

interface AutocompleteSearchProps<T> {
  options: T[];
  selected: T[];
  onInputChange: (value: string) => void;
  onSelect: (value: T[]) => void;
  isLoading: boolean;
  displayValue: keyof T;
  label: string;
  getOptionDisabled?: ((option: T) => boolean) | undefined;
}

export function AutocompleteSearch<T extends { id: string }>({
  options,
  onInputChange,
  onSelect,
  selected,
  isLoading,
  displayValue,
  label,
  getOptionDisabled,
}: AutocompleteSearchProps<T>) {
  const onChangeHandler = useCallback(
    (_event: React.SyntheticEvent<Element, Event>, value: T[]) => {
      onSelect(value);
    },
    [onSelect],
  );

  const onInputChangeHandler = useCallback(
    (_event: React.SyntheticEvent<Element, Event>, value: string) => {
      onInputChange(value);
    },
    [onInputChange],
  );

  return (
    <Autocomplete
      disablePortal
      sx={{ mr: 2, width: 300 }}
      options={options}
      onInputChange={onInputChangeHandler}
      onChange={onChangeHandler}
      value={selected}
      getOptionDisabled={getOptionDisabled}
      getOptionLabel={(option) => option[displayValue] as string}
      multiple
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
