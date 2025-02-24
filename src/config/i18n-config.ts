import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// @ts-expect-error
import IdContentLanguage from '../constants/messages/id.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      id: {
        translation: IdContentLanguage,
      },
    },
    lng: localStorage.getItem('language') ?? 'id',
    fallbackLng: localStorage.getItem('language') ?? 'id',

    interpolation: {
      escapeValue: false,
    },
  })
  .then();

export default i18next;
