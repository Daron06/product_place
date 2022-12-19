import { useFormContext } from 'react-hook-form';
import { LangSelectType } from 'services/types';

interface UseTranslatedFieldsReturnProps {
  translatedData: (translatedFields: Array<string>, allFieldsObj: Record<string, any>, lang: LangSelectType) => void;
}

export const useTranslatedFields = (): UseTranslatedFieldsReturnProps => {
  const { setValue } = useFormContext();
  const translatedFieldsSets = (
    translatedFields: Array<string>,
    allFieldsObj: { [key: string]: string },
    lang: LangSelectType,
  ): void => {
    translatedFields.forEach((fieldName) => {
      const key = lang === 'en' ? fieldName : `${fieldName}__${lang}`;
      const value = allFieldsObj[key];
      setValue(fieldName, value);
    });
  };
  return { translatedData: translatedFieldsSets };
};
