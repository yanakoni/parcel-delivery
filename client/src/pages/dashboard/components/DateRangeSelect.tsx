import { FormControl, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

// TODO
const ranges = ['week', 'month'];

const DateRangeSelect = ({
  onRangeChange,
  currentRange,
}: {
  onRangeChange: (dateRange: 'week' | 'month') => void;
  currentRange: 'week' | 'month';
}) => {
  const { t } = useTranslation();

  const onDateRangeChange = (event: any) => {
    const newValue = event.target.value;
    onRangeChange(newValue);
  };

  return (
    <FormControl>
      <Select
        id="currentRange"
        value={currentRange}
        onChange={onDateRangeChange}
        color="primary"
        classes={{ root: 'currentRange' }}
      >
        {ranges.map((range) => (
          <MenuItem key={range} value={range}>
            {t(range)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { DateRangeSelect };
