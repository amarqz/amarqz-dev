import "server-only";

const docs: Record<string, () => Promise<any>> = {
    'education-es': () => import('@/docs/education-es.json').then((module) => module.default),
    'education-en': () => import('@/docs/education-en.json').then((module) => module.default),
    'experience-es': () => import('@/docs/experience-es.json').then((module) => module.default),
    'experience-en': () => import('@/docs/experience-en.json').then((module) => module.default),
    'projects-es': () => import('@/docs/projects-es.json').then((module) => module.default),
    'projects-en': () => import('@/docs/projects-en.json').then((module) => module.default),
};

export const getDocumentation = async (type: string, locale: string): Promise<object> => docs[`${type}-${locale}`]?.();