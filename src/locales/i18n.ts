import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English
import enAuth from './en/auth.json';
import enCommon from './en/common.json';
import enPages from './en/pages.json';

// Spanish
import esAuth from './es/auth.json';
import esCommon from './es/common.json';
import esPages from './es/pages.json';

export const defaultNS = 'common';

i18n.use(initReactI18next).init({
    fallbackLng: 'es',
    debug:  false, // set false to avoid logs for this time. process.env.NODE_ENV === 'development',
    interpolation: {
        escapeValue: false,
    },
    defaultNS,
    resources: {
        es: {
            pages: esPages,
            common: esCommon,
            auth: esAuth,
        },
        en: {
            pages: enPages,
            common: enCommon,
            auth: enAuth,
        },
    },
    ns: ['common', 'pages', 'auth'],
    react: {
        useSuspense: false,
    },
});



export default i18n;
