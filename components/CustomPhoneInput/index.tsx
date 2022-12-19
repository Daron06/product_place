import 'react-phone-number-input/style.css';

import get from 'lodash/get';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';

import styles from '../FormField/FormField.module.scss';
import CustomSelectPhone from './CustomSelectPhone';

interface CustomPhoneInputProps {
  label: string;
  name: string;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({ label, name }) => {
  const { control, errors } = useFormContext();

  const error = get(errors, `${name}.message`);

  return (
    <div className={styles.formField}>
      {label && <b>{label}</b>}
      <div className={`${styles.field} ${styles.formPhoneField}`}>
        <Controller
          name={name}
          control={control}
          render={({ onChange, value }): React.ReactElement => {
            return (
              <PhoneInput
                smartCaret
                value={value}
                onChange={onChange}
                defaultCountry="AE"
                countries={['AE', 'SA', 'BH', 'KW', 'QA', 'OM', 'EG', 'FR', 'IT', 'AU', 'ES', 'GB']}
                id="phone"
                international
                countrySelectComponent={CustomSelectPhone}
              />
            );
          }}
        />
      </div>
      {error && (
        <p className={styles.formFieldError} data-test-id={`${name}-error-message`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomPhoneInput;
