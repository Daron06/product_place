import clsx from 'clsx';
import { FormField } from 'components/FormField';
import React from 'react';
import { useFieldArray, UseFormMethods } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

import RemoveSvg from '../../../../assets/icons/close.svg';
import styles from './DynamicLinks.module.scss';

interface DynamicLinksProps<T> {
  control: UseFormMethods<Record<string, any>>['control'];
  register: UseFormMethods<Record<string, T[keyof T]>>['register'];
  errors: UseFormMethods<T>['errors'] | FieldErrors;
  name?: string;
  text?: string;
}

export function DynamicLinks<T>({
  control,
  errors,
  name = 'links',
  register,
  text = 'Social profile link',
}: DynamicLinksProps<T extends { links: Array<{ value: string }> } ? T : never>): React.ReactElement {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.filter(Boolean).map((field, index) => (
        <div key={field.id} className={clsx(styles.formField, { [styles.formFieldWithLabel]: !index })}>
          <FormField
            formFieldsRef
            defaultValue={field?.value}
            label={!index ? text : ''}
            name={`${name}[${index}].value`}
            placeholder="mysite.com"
            register={register}
            error={errors[name]?.[index]?.value?.message}
            prefix="https://"
          />
          {index > 0 && fields.length > 1 && (
            <div role="presentation" onClick={(): void => remove(index)}>
              <RemoveSvg />
            </div>
          )}
        </div>
      ))}
      <p role="presentation" onClick={(): void => append({ name: '', role: '', value: '' })} className={styles.addMore}>
        + Add more
      </p>
    </>
  );
}
