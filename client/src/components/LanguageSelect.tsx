import { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { showNotification } from '../utils';
import { Locale } from '../enums';

const LanguageSelect = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<Locale>(i18next.language as Locale);

  const onLanguageChange = async (event: any) => {
    try {
      const newValue = event.target.value as Locale;
      setLanguage(newValue);
      await i18next.changeLanguage(newValue);
      showNotification('Language successfully changed', 'success');
    } catch (err) {
      console.error(err);
      showNotification('Unexpected error', 'error');
    }
  };

  return (
    <FormControl>
      <Select
        id="settings_locale"
        value={language}
        onChange={onLanguageChange}
        color="primary"
        classes={{ root: 'langSelect' }}
      >
        {Object.entries(Locale).map(([locale, value]) => (
          <MenuItem key={locale} value={value}>
            {t(locale)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { LanguageSelect };
