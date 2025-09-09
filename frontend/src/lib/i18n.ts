import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// 导入翻译资源
import en from '../../locales/en/common.json';
import zh from '../../locales/zh/common.json';
import es from '../../locales/es/common.json';

const resources = {
  en: {
    common: en,
  },
  zh: {
    common: zh,
  },
  es: {
    common: es,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React已经处理了XSS攻击
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'bookmee-language',
      caches: ['localStorage'],
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;