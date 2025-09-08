'use client';

import type {TFunction} from 'i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import {useEffect} from 'react';
import {initReactI18next, useTranslation as useTranslationOriginal} from 'react-i18next';

import {getOptions, i18nSupportedLanguages} from './settings';

const runsOnServerSide = typeof window === 'undefined';

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(async (language: string, namespace: string) => {
      const isServer = typeof window === 'undefined';
      try {
        if (isServer) {
          // SSR/build: use static files
          const fs = require('fs');
          const path = require('path');
          const filePath = path.resolve(process.cwd(), 'public', 'locales', language, `${namespace}.json`);
          if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          }
          return {};
        } else {
          // Client: use API
          const response = await fetch(`/api/translations/?locale=${language}&submodule=${namespace}`);
          if (!response.ok) throw new Error('Translation fetch failed');
          return await response.json();
        }
      } catch (e) {
        console.error('Translation load error:', e);
        return {};
      }
    }),
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? i18nSupportedLanguages : [],
  });

export function useTranslation(lng: string, ns: string, options?: Record<string, any>) {
  const ret = useTranslationOriginal(ns, options);
  const {i18n} = ret;
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  }
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng]);
  return ret;
}

export function parseValue(input: string, data: Record<string, string> = {}) {
  const output: string[] = [];
  input.split('${').forEach((val) => {
    const valArr = val.split('}');
    if (valArr.length == 2 && data[valArr[0].trim()]) {
      output.push(data[valArr[0]]);
      output.push(valArr[1]);
    } else {
      output.push(val);
    }
  });
  return output.join('');
}

export function getTranslationValue(t: TFunction<string, undefined>, key: string, defaultValue: string, data: Record<string, string> = {}) {
  let value = t(key);
  if (key === value) {
    value = defaultValue;
  }
  return parseValue(value, data);
}
