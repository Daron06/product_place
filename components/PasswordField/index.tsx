import EyeIcon from '@material-ui/icons/RemoveRedEye';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import EyeHideSvg from '../../assets/icons/eye-hide.svg';
import { FormField, FormFieldProps } from '../FormField';
import styles from './PasswordField.module.scss';

type PasswordFieldProps = { value?: string } & FormFieldProps;

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  register,
  name,
  placeholder,
  autocomplete,
  error,
  value,
}) => {
  const [visiblePassword, setVisible] = React.useState(false);
  const { currentLanguage } = useTranslate();

  const toggleVisiblePassword = (): void => {
    setVisible(!visiblePassword);
  };

  return (
    <div className={styles.passwordField}>
      <FormField
        register={register}
        name={name}
        placeholder={placeholder}
        label={label}
        error={error}
        type={!visiblePassword ? 'password' : ''}
        autocomplete={autocomplete}
      />
      {value && (
        <div
          role="presentation"
          style={currentLanguage === 'ar' ? { left: '15px' } : { right: '15px' }}
          onClick={toggleVisiblePassword}
          className={styles.passwordFieldIcon}
        >
          {visiblePassword ? (
            <EyeIcon style={{ color: '#A0A0A0' }} />
          ) : (
            <EyeHideSvg className={styles.passwordFieldHideIcon} />
          )}
        </div>
      )}
    </div>
  );
};
