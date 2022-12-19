import React from 'react';

import styles from './RightSidebarLayout.module.scss';

export const RightSidebarLayout: React.FC = ({ children }): React.ReactElement => {
  return <div className={styles.grid}>{children}</div>;
};
