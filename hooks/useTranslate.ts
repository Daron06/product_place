import _get from 'lodash/get';
import React from 'react';

export type LanguageVariant = 'ar' | 'en';

type TranslateContextProps = {
  data: Record<string, any>;
  currentLanguage: LanguageVariant;
  changeLanguage: (key: LanguageVariant) => void;
};
type UseTranslateReturnProps = {
  getTranslatedText: <T extends Record<string, any>>(item: T, key: string) => string | any;
  t: (key: string, options?: Options) => any;
} & Omit<TranslateContextProps, 'data'>;

export const TranslateContext = React.createContext({} as TranslateContextProps);

type Options = {
  defaultValue?: string;
  params?: Record<string, string | number>;
};

type Namespaces = TranslateKeys | Array<TranslateKeys>;

export const useTranslate = (namespace?: Namespaces): UseTranslateReturnProps => {
  const { data, currentLanguage, changeLanguage } = React.useContext(TranslateContext);
  const text = data[currentLanguage];

  function getTranslatedText<T = Record<string, any>>(item: T, key: string): string | any {
    return currentLanguage === 'en' ? item[key] : item[`${key}__${currentLanguage}`] || item[key];
  }

  const mergedTexts = namespace
    ? Array.isArray(namespace)
      ? namespace.reduce((prev, nKey) => {
          return {
            ...prev,
            ...text[nKey],
          };
        }, {} as Record<string, any>)
      : text[namespace]
    : {};

  return {
    t: (key: string, options?: Options): string => {
      if (!namespace) {
        return key;
      }

      let result = _get(mergedTexts, key, options?.defaultValue || key) as string;

      if (options?.params) {
        Object.keys(options?.params).forEach((paramKey) => {
          const value = options?.params?.[paramKey];
          if (typeof value !== 'undefined' && typeof value !== 'object') {
            result = result.replace(`{${paramKey}}`, String(value));
          }
        });
      }

      return result;
    },
    currentLanguage,
    changeLanguage,
    getTranslatedText,
  };
};
