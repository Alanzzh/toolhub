import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messages = await import(`../messages/${locale}.json`).then(m => m.default);

  return {
    locale,
    messages,
    timeZone: 'UTC',
    now: new Date()
  };
});
