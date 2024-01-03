import { ChangeEventHandler, FC, useCallback, useId } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FiltersState, FiltersChangePayload } from '../../../hooks';
import { Filter } from '../../config';

interface FiltersProps {
  filterList: Filter[];
  filtersState: FiltersState;
  changeFiltersValue: (payload: FiltersChangePayload) => void;
}

interface IndividualFilterProps {
  fieldName: string;
  label: string;
  filtersState: FiltersState;
  changeFiltersValue: (payload: FiltersChangePayload) => void;
}

const TextFilter: FC<IndividualFilterProps> = ({
  fieldName,
  label,
  filtersState,
  changeFiltersValue,
}) => {
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      changeFiltersValue({
        field: fieldName,
        value,
      });
    },
    [fieldName, changeFiltersValue],
  );

  return (
    <TextField
      value={filtersState[fieldName]}
      onChange={onChange}
      sx={{ mr: 1 }}
      label={label}
      variant="outlined"
    />
  );
};

const SelectFilter = () => {
  const id = useId();

  return (
    <FormControl>
      <InputLabel id={id}>Age</InputLabel>
      <Select labelId={id} id="demo-simple-select" value={10} label="Age">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

const filterTypeMap: Record<Filter['type'], FC<IndividualFilterProps>> = {
  select: SelectFilter,
  text: TextFilter,
};

export const Filters: FC<FiltersProps> = ({
  filterList,
  filtersState,
  changeFiltersValue,
}) => {
  return (
    <Box display="flex" alignItems="center">
      {filterList.map(({ type, id, field, label }) => {
        const FilterComponent = filterTypeMap[type];

        return (
          <FilterComponent
            fieldName={field}
            key={id}
            changeFiltersValue={changeFiltersValue}
            filtersState={filtersState}
            label={label}
          />
        );
      })}
      <FilterAltIcon sx={{ color: grey[500] }} />
    </Box>
  );
};
