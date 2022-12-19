import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import clsx from 'clsx';
import React from 'react';
import { Controller, UseFormMethods } from 'react-hook-form';

import { useTranslate } from '../../hooks/useTranslate';
import styles from './GenderRadioGroup.module.scss';

interface GenderRadioGroupProps {
  control: UseFormMethods['control'];
  gender?: 0 | 1 | null;
}

export const GenderRadioGroup: React.FC<GenderRadioGroupProps> = ({ control, gender }): React.ReactElement => {
  const { t } = useTranslate('profile');
  return (
    <Controller
      as={
        <FormControl component="fieldset">
          <FormLabel component="legend" focused={false}>
            {t('settings.gender')}
          </FormLabel>
          <RadioGroup aria-label="gender" defaultValue={gender || undefined}>
            <div className={clsx(styles.labelWrapper, styles.maleLabel)}>
              <FormControlLabel
                className={styles.radioLabel}
                value="male"
                control={<Radio />}
                label={t('settings.male')}
              />
            </div>
            <div className={styles.labelWrapper}>
              <FormControlLabel
                className={styles.radioLabel}
                value="female"
                control={<Radio />}
                label={t('settings.female')}
              />
            </div>
          </RadioGroup>
        </FormControl>
      }
      name="gender"
      control={control}
      defaultValue={gender}
    />
  );
};
