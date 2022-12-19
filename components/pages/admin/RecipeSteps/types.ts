import { ArrayField, UseFormMethods } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

import { RecipeCreateFieldsProps } from '../RecipeCreate/types';

export interface RecipeStepsProps {
  errors: FieldErrors<RecipeCreateFieldsProps>;
  register?: UseFormMethods<RecipeCreateFieldsProps>['register'];
  control?: UseFormMethods<RecipeCreateFieldsProps>['control'];
  onChangeSteps: (steps: RecipeStep[]) => void;
  onAddMoreStep: () => void;
  onRemoveStep: (index: number) => void;
  steps?: Partial<ArrayField<RecipeStep>>[];
  setValue?: UseFormMethods<RecipeCreateFieldsProps>['setValue'];
}

export interface RecipeStep {
  image: string;
  name: string;
  description: string;
  preparationTime: string;
  id?: string;
}
