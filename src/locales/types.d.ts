import 'i18next';

import esAuth from './es/auth.json';
import esCommon from './es/common.json';
import esPages from './es/pages.json';

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        defaultNS: 'common';
        // custom resources type
        resources: {
            pages: typeof esPages;
            common: typeof esCommon;
            auth: typeof esAuth;
        };
        // other
    }
}
