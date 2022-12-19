import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import _get from 'lodash/get';
import React from 'react';
import { ArrayField, Controller, UseFormMethods } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { Control } from 'react-hook-form/dist/types/form';

import { ErrorText } from '../../../ErrorText';
import { FormField } from '../../../FormField';
import { Icon } from '../../../Icon';
import { RecipeCreateFieldsProps } from '../RecipeCreate/types';
import { UploadFile } from '../UploadFile';
import styles from './RecipeSteps.module.scss';
import { RecipeStep } from './types';

export interface RecipeStepsViewProps {
  errors: FieldErrors<RecipeCreateFieldsProps>;
  register?: UseFormMethods<RecipeCreateFieldsProps>['register'];
  control?: UseFormMethods<RecipeCreateFieldsProps>['control'] | Control;
  onAddMoreStep: () => void;
  onRemoveStep: (index: number) => void;
  onUploadImage: (index: number, url: string) => void;
  steps?: Partial<ArrayField<RecipeStep>>[];
  formState?: UseFormMethods<RecipeCreateFieldsProps>['formState'];
}

export const RecipeStepsView: React.FC<RecipeStepsViewProps> = ({
  errors,
  onAddMoreStep,
  onRemoveStep,
  steps,
  register,
  control,
  onUploadImage,
  formState,
}): React.ReactElement => {
  return (
    <div>
      {steps?.map((field, index) => (
        <div key={field.id} className={styles.recipeStep}>
          <div className={styles.recipeStepHead}>
            <Typography className={styles.recipeStepTitle} variant="h3">
              Step {index + 1}
            </Typography>
            {steps?.length > 1 && (
              <span
                data-test-id={`recipe-steps-remove-${index}`}
                onClick={(): void => onRemoveStep(index)}
                className="link"
              >
                <Icon type="close" width={12} height={12} viewBox={{ width: 18, height: 18 }} />
                Remove
              </span>
            )}
          </div>
          <div className={styles.recipeStepInfo}>
            <div>
              <Controller
                control={control}
                defaultValue={field.image}
                name={`steps[${index}].image`}
                render={({ name, value }): React.ReactElement => (
                  <>
                    <UploadFile
                      testId={`recipe-steps-upload-${index}`}
                      onSuccessUpload={(url: string): void => onUploadImage(index, url)}
                      title="Upload image"
                      value={value}
                    />
                    <input style={{ display: 'none' }} name={name} ref={register} defaultValue={value} />
                  </>
                )}
              />
              <span data-test-id={`recipe-steps-upload-error-${index}`}>
                <ErrorText focus>{_get(errors, `steps.${index}.image.message`)}</ErrorText>
              </span>
            </div>
            <div className={styles.recipeStepFields}>
              <Controller
                control={control}
                defaultValue={field.name}
                name={`steps[${index}].name`}
                render={({ name, onBlur, onChange, value }): React.ReactElement => (
                  <FormField
                    onBlur={onBlur}
                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
                      onChange(event.target.value)
                    }
                    label="Name"
                    name={name}
                    placeholder="Enter dish name"
                    error={_get(errors, `${name}.message`)}
                    register={register}
                    defaultValue={value}
                    testId={`recipe-steps-name-field-${index}`}
                  />
                )}
              />
              <Controller
                control={control}
                defaultValue={field.description}
                name={`steps[${index}].description`}
                render={({ name, onBlur, onChange, value }): React.ReactElement => (
                  <FormField
                    onBlur={onBlur}
                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
                      onChange(event.target.value)
                    }
                    label="Description"
                    name={name}
                    placeholder="Enter description"
                    error={_get(errors, `${name}.description`)}
                    register={register}
                    defaultValue={value}
                    testId={`recipe-steps-description-field-${index}`}
                    textarea
                  />
                )}
              />
              <Controller
                control={control}
                defaultValue={field.preparationTime}
                name={`steps[${index}].preparationTime`}
                render={({ name, onBlur, onChange, value }): React.ReactElement => (
                  <FormField
                    onBlur={onBlur}
                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
                      onChange(event.target.value)
                    }
                    label="Preparation time"
                    name={name}
                    placeholder="Enter time (in minutes 1-1000)"
                    error={_get(errors, `${name}.message`)}
                    register={register}
                    defaultValue={value}
                    testId={`recipe-steps-time-field-${index}`}
                    type="number"
                    max={1000}
                    min={0}
                  />
                )}
              />
            </div>
          </div>
        </div>
      ))}
      <span onClick={onAddMoreStep} className={clsx('link', styles.addMoreStep)}>
        + Add more step
      </span>
      {formState?.isSubmitted && errors.steps && steps?.length === 0 && (
        <ErrorText focus>{errors.steps.message}</ErrorText>
      )}
    </div>
  );
};
