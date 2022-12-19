import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import InfoBlock, { InfoBlockPops } from 'components/InfoBlock';
import React from 'react';

import adminLayoutStyles from '../../layouts/AdminLayout/AdminLayout.module.scss';
import styles from './WhiteBlock.module.scss';

interface WhiteBlockProps {
  disabled?: boolean;
  className?: string;
  title?: string;
  description?: string;
  marginZero?: boolean;
  status?: InfoBlockPops['type'];
}

export const WhiteBlock: React.FC<WhiteBlockProps> = ({
  children,
  className,
  title,
  description,
  disabled = false,
  marginZero = false,
  status,
}) => {
  return (
    <div
      className={clsx(adminLayoutStyles.whiteBlock, className, {
        [adminLayoutStyles.whiteBlockDisabled]: disabled,
        [adminLayoutStyles.whiteBlockMarginZero]: marginZero,
      })}
    >
      {title && <Typography variant="h6">{title}</Typography>}
      {description &&
        (status ? <InfoBlock type={status} text={description} /> : <p className={styles.description}>{description}</p>)}
      {children}
    </div>
  );
};
