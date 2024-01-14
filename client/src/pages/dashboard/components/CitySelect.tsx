import { FormControl, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

// TODO
const cities = ['All', 'Kyiv', 'Lviv', 'Odessa', 'Dnipro', 'Chernivtsi', 'Zhytomyr', 'Vinnytsia'];

const CitySelect = ({
  onChange,
  currentCity,
}: {
  onChange: (city: 'All' | 'Kyiv' | 'Lviv' | 'Odessa' | 'Dnipro' | 'Chernivtsi' | 'Zhytomyr' | 'Vinnytsia') => void;
  currentCity: 'All' | 'Kyiv' | 'Lviv' | 'Odessa' | 'Dnipro' | 'Chernivtsi' | 'Zhytomyr' | 'Vinnytsia';
}) => {
  const { t } = useTranslation();

  const onCityChange = (event: any) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <FormControl>
      <Select
        id="currentCity"
        value={currentCity}
        onChange={onCityChange}
        color="primary"
        classes={{ root: 'currentCity' }}
      >
        {cities.map((range) => (
          <MenuItem key={range} value={range}>
            {t(range)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { CitySelect };
