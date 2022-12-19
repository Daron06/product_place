import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import clsx from 'clsx';
import React from 'react';

import styles from './InfoBlock.module.scss';

export interface InfoBlockPops {
  type: 'warning' | 'success' | 'error';
  text: string;
}

export default function InfoBlock({ type, text }: InfoBlockPops): React.ReactElement {
  return (
    <div className={clsx(styles.root, styles[type])}>
      <ErrorOutlineIcon />
      <p>{text}</p>
    </div>
  );
}
