import { Badge } from '@material-ui/core';
import { IconType } from 'services/types';

import TableCellRole from '../pages/admin/StatisticDashboard/components/OrdersTable/TableCellRole';
import styles from './OrderTypeIcons.module.scss';

export interface OrderTypeIconsProps {
  OrderTypes: { id: string; type: IconType }[] | undefined;
}

export const OrderTypeIcons: React.FC<OrderTypeIconsProps> = ({ OrderTypes }) => {
  const types = OrderTypes?.slice(0, 3) || [];
  const moreTypes = OrderTypes?.slice(3) || [];

  return (
    <>
      {types.map((type) => (
        <TableCellRole key={type.id} type={type.type} />
      ))}
      {moreTypes.length > 0 && (
        <Badge className={styles.orderBadge} badgeContent={`+${moreTypes.length}`} color="primary" />
      )}
    </>
  );
};
