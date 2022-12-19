import get from 'lodash/get';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import styles from './FormField/FormField.module.scss';
import { Select } from './Select';

interface PhoneFieldProps {
  label?: string;
  prefix?: string;
  placeholder?: string;
  mask?: string;
  name: string;
  format: string;
  phonePrefix?: string;
  phoneCode?: string;
}

const countryCodes = [
  { name: 'United Arab Emirates', value: 'uae_+971', format: '##-###-####', placeholder: '__-___-____' },
  { name: 'KSA', value: 'ksa_+966', format: '##-###-####', placeholder: '__-___-____' },
  { name: 'Bahrain', value: 'bahrain_+973', format: '####-####', placeholder: '____-____' },
  { name: 'Kuwait', value: 'kuwait_+965', format: '####-####', placeholder: '____-____' },
  { name: 'Qatar', value: 'qatar_+974', format: '####-####', placeholder: '____-____' },
  { name: 'Oman', value: 'oman_+968', format: '####-####', placeholder: '____-____' },
  { name: 'Egypt', value: 'egypt_+20', format: '###-###-####', placeholder: '___-___-____' },
  { name: 'France', value: 'france_+33', format: '#-##-##-##-##', placeholder: '_-__-__-__-__' },
  { name: 'Spain', value: 'spain_+34', format: '###-###-###', placeholder: '___-___-___' },
  { name: 'Italy', value: 'italy_+39', format: '###-###-####', placeholder: '___-___-____' },
  { name: 'Britain', value: 'britain_+44', format: '####-###-###', placeholder: '____-___-___' },
  { name: 'Australia ', value: 'australia_+61', format: '###-###-###', placeholder: '___-___-___' },
  { name: 'India', value: 'india_+91', format: '##########', placeholder: '__________' },
  { name: 'US', value: 'us_+1', format: '###-###-####', placeholder: '___-___-____' },
  { name: 'Canada', value: 'canada_+1', format: '###-###-####', placeholder: '___-___-____' },
  { name: 'Brazil', value: 'brazil_+55', format: '##-####-####', placeholder: '__-____-____' },
  { name: 'Mexico', value: 'mexico_+52', format: '##-####-####', placeholder: '__-____-____' },
  { name: 'Belgium ', value: 'belgium_+32', format: '###-###-###', placeholder: '___-___-___' },
  { name: 'Switzerland ', value: 'switzerland_+41', format: '##-###-####', placeholder: '__-___-____' },
  { name: 'Germany', value: 'germany_+49', format: '##-####-####', placeholder: '__-____-____' },
  { name: 'Russia', value: 'russia_+7', format: '###-###-####', placeholder: '___-___-____' },
  { name: 'Singapore', value: 'singapore_+65', format: '####-####', placeholder: '____-____' },
  { name: 'China', value: 'china_+86', format: '##-####-####', placeholder: '__-____-____' },
  { name: 'Korea', value: 'korea_+82', format: '##-####-####', placeholder: '__-____-____' },
  { name: 'Japan', value: 'japan_+81', format: '##-####-####', placeholder: '__-____-____' },
];

export const FieldMask: React.FC<PhoneFieldProps> = ({
  label,
  prefix,
  name,
  format,
  placeholder,
  phonePrefix,
  phoneCode,
  mask = '_',
}) => {
  const { control, errors, setValue } = useFormContext();
  const currentCountryCode = countryCodes.find((i) => i.value.split('+')[1] === phoneCode);
  const [selectValue, setSelectValue] = React.useState(currentCountryCode?.value || 'uae_+971');
  const [countryPhoneFormat, setCountryPhoneFormat] = React.useState(currentCountryCode?.format || '##-###-####');
  const [countryPhonePlaceholder, setCountryPhonePlaceholder] = React.useState(
    currentCountryCode?.placeholder || '__-___-____',
  );

  const error = get(errors, `${name}.message`);
  const onPrefixChange = (e): void => {
    setSelectValue(e.target.value);
    if (phonePrefix) {
      setValue(phonePrefix, e.target.value.split('+')[1], { shouldValidate: true });
      setCountryPhoneFormat(countryCodes.find((i) => i.value === e.target.value)?.format || '##-###-####');
      setCountryPhonePlaceholder(countryCodes.find((i) => i.value === e.target.value)?.placeholder || '__-___-____');
    }
  };

  return (
    <div className={styles.formField}>
      {label && <b>{label}</b>}
      <div className={styles.field}>
        {prefix && <div className={styles.prefix}>{prefix}</div>}
        {phonePrefix && (
          <div className={styles.selectField}>
            <Select
              defaultValue={countryCodes[0].name}
              value={selectValue}
              items={countryCodes}
              onChange={onPrefixChange}
              hasPrefix
            />
          </div>
        )}
        <Controller
          as={NumberFormat}
          format={phonePrefix ? countryPhoneFormat : format}
          placeholder={phonePrefix ? countryPhonePlaceholder : placeholder}
          mask={mask}
          name={name}
          control={control}
          thousandSeparator
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
