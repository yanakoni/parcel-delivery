import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { ua } from './ua';

i18n.use(initReactI18next).init({
  resources: {
    en,
    ua,
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
