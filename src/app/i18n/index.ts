import {createInstance} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next/initReactI18next';

import {getOptions} from './settings';
const initI18next = async (locale: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(async (language: string, namespace: string) => {
        const response = await fetch(
          `/api/translations/?locale=${language}&submodule=${namespace === 'translation' ? 'common' : namespace}`,
          {
            method: 'GET',
          },
        );
        const data = await response.json();
        return response.ok ? data : null;
      }),
    )
    .init(getOptions(locale, ns));
  return i18nInstance;
};

export async function useTranslation(locale: string, ns: string, options: Record<string, any> = {}) {
  const i18nextInstance = await initI18next(locale, ns);
  return {
    t: i18nextInstance.getFixedT(locale, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
