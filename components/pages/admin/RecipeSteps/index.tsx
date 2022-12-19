import { LanguageContext } from 'layouts/AdminLayout';
import React from 'react';
import { ArrayField, useFieldArray, UseFormMethods } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { Control } from 'react-hook-form/dist/types/form';
import { LangSelectType } from 'services/types';

import { RecipeCreateFieldsProps } from '../RecipeCreate/types';
import { RecipeStep } from './types';
import { RecipeStepsView } from './View';

export interface RecipeStepsViewProps {
  errors: FieldErrors<RecipeCreateFieldsProps>;
  register: UseFormMethods<RecipeCreateFieldsProps>['register'];
  unregister: UseFormMethods<RecipeCreateFieldsProps>['unregister'];
  control: UseFormMethods<RecipeCreateFieldsProps>['control'] | Control;
  setValue: UseFormMethods<RecipeCreateFieldsProps>['setValue'];
  steps?: Partial<ArrayField<RecipeStep>>[];
  formState?: UseFormMethods['formState'];
}

export const RecipeSteps: React.FC<RecipeStepsViewProps> = ({
  errors,
  register,
  control,
  setValue,
  formState,
}): React.ReactElement => {
  const { fields, append, remove } = useFieldArray<RecipeStep>({
    control,
    name: 'steps',
  });

  React.useEffect(() => {
    fields.forEach((_, index) => {
      register(`steps[${index}].name`);
      register(`steps[${index}].description`);
      register(`steps[${index}].preparationTime`);
      register(`steps[${index}].image`);
    });
  }, [fields]);

  const { acceptLanguage } = React.useContext(LanguageContext);

  const translatedFieldsSets = (
    translatedFields: Array<string>,
    allFieldsObj: Record<string, any>,
    lang: LangSelectType,
  ): void => {
    translatedFields.forEach((fieldName) => {
      const key = lang === 'en' ? fieldName : `${fieldName}__${lang}`;
      allFieldsObj.forEach((_, index) => {
        const value = allFieldsObj[index][key];
        if (typeof allFieldsObj[index].id === 'number') {
          setValue(`steps[${index}].${fieldName}`, value, { shouldValidate: true });
        }
      });
    });
  };

  React.useEffect(() => {
    translatedFieldsSets(['name', 'description'], fields, acceptLanguage);
  }, [acceptLanguage]);

  const onAddMoreStep = (): void => {
    append({
      name: '',
      description: '',
      image: '',
      preparationTime: '',
    });
  };

  const onUploadImage = (index: number, url: string): void => {
    setValue(`steps[${index}].image`, url, { shouldValidate: true });
  };

  const onRemoveStep = (index: number): void => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure remove step?')) {
      remove(index);
    }
  };

  return (
    <RecipeStepsView
      errors={errors}
      register={register}
      control={control}
      onAddMoreStep={onAddMoreStep}
      onRemoveStep={onRemoveStep}
      steps={fields}
      onUploadImage={onUploadImage}
      formState={formState}
    />
  );
};
