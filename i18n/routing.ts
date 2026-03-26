import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh', 'ja', 'pt', 'es', 'ru', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always'
});
