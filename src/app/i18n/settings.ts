export const fallbackLng = "de";
export const i18nSupportedLanguages = [fallbackLng, "en"];
export const defaultNS = "translation";
export const languageCookie = "i18next";

export function getOptions(locale = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: i18nSupportedLanguages,
    fallbackLng,
    locale,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    cookieName: languageCookie,
  };
}
