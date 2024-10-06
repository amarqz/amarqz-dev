import "server-only";
import { locales } from '@/middleware/i18n';

const dictionaries: Record<string, () => Promise<any>> = {
    'es': () => import('@/dictionaries/es.json').then((module) => module.default),
    'en': () => import('@/dictionaries/en.json').then((module) => module.default),
};

export const availableLocales = locales;
export const getDictionary = async (locale: string): Promise<any> => dictionaries[locale]?.() ?? dictionaries.en();