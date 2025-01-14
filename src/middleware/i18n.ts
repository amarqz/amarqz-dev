import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';

export const locales = ['es', 'en'];
export const defaultLocale = 'en';

export function getLocale(request: NextRequest) {
    const acceptLang = request.headers.get("Accept-Language");
    if (!acceptLang) return defaultLocale;
    const headers = { "accept-language": acceptLang };
    const languages = new Negotiator({ headers }).languages(locales);

    return match(languages, locales, defaultLocale);
};
