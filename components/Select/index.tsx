import { MenuItem, Select as SelectMui, SelectProps as SelectMuiProps } from '@material-ui/core';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import clsx from 'clsx';
import { Icon, IconName } from 'components/Icon';
import React from 'react';

import styles from './Select.module.scss';

export interface SelectOption {
  id?: string;
  value: string | boolean | number;
  name: string;
  icon?: React.ReactElement<any, any>;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  items: SelectOption[];
  name?: string;
  defaultValue?: string;
  value?: string;
  error?: string;
  onChange?: SelectInputProps['onChange'];
  disabled?: boolean;
  hasPrefix?: boolean;
}

export const Select: React.FC<SelectProps & Omit<SelectMuiProps, 'error'>> = ({
  className,
  classes,
  label,
  name,
  placeholder,
  items,
  onChange,
  defaultValue = 'empty',
  value,
  fullWidth,
  error,
  MenuProps,
  disabled,
  hasPrefix,
}) => {
  return (
    <div className={styles.selectWrapper}>
      {label && <b className={styles.selectLabel}>{label}</b>}
      <SelectMui
        classes={classes}
        defaultValue={defaultValue}
        value={value}
        name={name}
        onChange={onChange}
        className={clsx(styles.select, className)}
        placeholder={placeholder}
        fullWidth={fullWidth}
        MenuProps={MenuProps}
        disabled={disabled}
        renderValue={
          hasPrefix
            ? (val): React.ReactElement | undefined => {
                const [icon, code] = (val as string).split('_');
                return (
                  <div className={styles.countryCode}>
                    <Icon type={icon as IconName} width={18} height={12} />
                    <span style={{ minWidth: 0 }}>{code}</span>
                  </div>
                );
              }
            : undefined
        }
      >
        {!hasPrefix && (
          <MenuItem value="empty" disabled>
            {placeholder || 'Select value...'}
          </MenuItem>
        )}
        {items.map((item, index) => {
          const [icon, code] = hasPrefix ? (item.value as string).split('_') : [];
          return (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={index} value={item.value.toString()} disabled={item.disabled}>
              {hasPrefix && (
                <div style={{ marginRight: 20 }} className={styles.countryCode}>
                  <Icon type={icon as IconName} width={18} height={12} />
                  <span className="opacity-6">{code}</span>
                </div>
              )}
              {item.name}
            </MenuItem>
          );
        })}
      </SelectMui>
      {error && <p className="error-label">{error}</p>}
    </div>
  );
};
