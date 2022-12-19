import Paper from '@material-ui/core/Paper';
import styles from 'components/pages/admin/Products/AdminProducts.module.scss';
import { Result } from 'components/Result';
import React from 'react';

export const TableLayout: React.FC<{ isEmpty: boolean }> = ({ children, isEmpty }): React.ReactElement => {
  if (isEmpty) {
    return <Result title="No data for display" status="empty" />;
  }

  return (
    <div className={styles.tableRoot}>
      <Paper className={styles.tablePaper} elevation={0}>
        {children}
      </Paper>
    </div>
  );
};
