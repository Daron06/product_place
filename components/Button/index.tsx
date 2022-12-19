import MaterialButton, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

export const Button = ({ loading = false, children, ...rest }: ButtonProps): React.ReactElement => {
  return (
    <div className={styles.button}>
      <MaterialButton disabled={rest.disabled || loading} {...rest}>
        {loading ? <CircularProgress className={styles.circleProgressColor} color="secondary" size={20} /> : children}
      </MaterialButton>
    </div>
  );
};
