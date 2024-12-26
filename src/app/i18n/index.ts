"use client";

const translations = {
  en: { releaseToClose: "Release to Close" },
  // more locales...
};

export function t(key: string, locale: string = "en") {
  return translations[locale]?.[key] || key;
}
