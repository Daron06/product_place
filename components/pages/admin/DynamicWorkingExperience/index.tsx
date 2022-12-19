/* eslint-disable no-param-reassign */
import { WorkingExperience } from 'components/WorkinExperience';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { WorkingExperienceItem } from '../Register';
import styles from './DynamicWorkingExperience.module.scss';

export const DynamicWorkingExperience: React.FC<{ uploadUrl?: string }> = ({ uploadUrl }): React.ReactElement => {
  const { errors, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workingExperience',
  });

  return (
    <>
      {fields.map((field, index) => (
        <WorkingExperience
          uploadUrl={uploadUrl}
          key={field.id}
          index={index}
          isRemovable={fields.length > 1}
          error={errors.workingExperience?.[index]}
          onRemove={(): void => remove(index)}
          value={field as WorkingExperienceItem}
        />
      ))}
      <p
        role="presentation"
        onClick={(): void =>
          append({
            name: '',
            description: '',
            photo: '',
          })
        }
        className={styles.addMore}
        data-test-id="add-more-working-experience"
      >
        + Add more
      </p>
    </>
  );
};
