import { MenuItem, Select } from '@material-ui/core';
import { useTranslate } from 'hooks/useTranslate';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { getCountryCallingCode } from 'react-phone-number-input/input';

import stylesFormField from '../FormField/FormField.module.scss';
import styles from './CustomPhoneInput.module.scss';

const CustomSelectPhone: ForwardRefRenderFunction<unknown, unknown> = (props: any, ref: any) => {
  const { options, iconComponent: Icon, onChange, ...rest } = props;
  const { currentLanguage } = useTranslate();

  return (
    <div style={{ borderRight: '1px solid #f0f0ed' }} className={stylesFormField.selectField}>
      <div className={styles.selectWrapper}>
        <Select
          {...rest}
          inputRef={ref}
          label="Phone Number"
          variant="outlined"
          className={styles.select}
          onChange={(event): void => onChange(event.target.value || undefined)}
          defaultValue="AE"
          displayEmpty
          renderValue={(value): React.ReactElement | undefined => {
            return (
              <div className="d-flex align-items-center">
                <Icon country={value} />
                {currentLanguage !== 'ar' && <span className="ml-10">{(value as string) || ''}</span>}
              </div>
            );
          }}
        >
          {options.map(({ value, label }) => {
            return (
              <MenuItem key={value} value={value}>
                <div className="d-flex align-items-center" style={{ marginRight: 20 }}>
                  <Icon country={value} />
                  <span className="opacity-6 ml-10">{value ? `+${getCountryCallingCode(value)}` : ''}</span>
                  <span className="opacity-6 ml-10">{label}</span>
                </div>
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

export default forwardRef(CustomSelectPhone);
