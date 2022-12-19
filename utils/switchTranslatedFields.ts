import { LangSelectType } from 'services/types';

export const switchTranslatedFields = (
  setValue: (
    name: string,
    value: any,
    config?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
        }>
      | undefined,
  ) => void,
  translatedFields: Array<string>,
  allFieldsObj: { [key: string]: string | { value: string }[] | undefined },
  lang: LangSelectType,
): void => {
  translatedFields.forEach((fieldName) => {
    const key = lang === 'en' ? fieldName : `${fieldName}__${lang}`;
    const value = allFieldsObj[key];

    setValue(fieldName, value);
  });
};
