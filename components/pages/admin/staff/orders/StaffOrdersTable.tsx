import TableCell from '@material-ui/core/TableCell';
import Skeleton from '@material-ui/lab/Skeleton';
import { OrderTypeIcons } from 'components/OrderTypeIcons';
import { AdminTableProps } from 'components/pages/admin/SupplierChefs/SupplierChefsTable';
import { TextCell } from 'components/pages/admin/Table/cells/TextCell';
import { TextWidthImageСell } from 'components/pages/admin/Table/cells/TextWidthImageСolumn';
import format from 'date-fns/format';
import Link from 'next/link';
import React from 'react';
import { OrdersApi } from 'services/api/admin/OrdersApi';
import { IOrder } from 'services/api/OrderApi';
import { DashboardRole } from 'services/types';

import { AdminTable } from '../../AdminTable';
import { staffOrderStatus } from './StaffOrderDetails';

interface StaffOrdersTableProps extends Omit<AdminTableProps, 'onActivateItem' | 'onDeactivateItem' | 'selectedItems'> {
  selectedItems?: AdminTableProps['selectedItems'];
  title: string;
  // TODO typing the items
  items: any;
}

export const StaffOrdersTable: React.FC<StaffOrdersTableProps> = ({
  isLoading = false,
  title,
}): React.ReactElement | null => {
  return (
    <AdminTable
      role={DashboardRole.STAFF}
      columnsWidth={['10%', '15%', '20%', '25%', '15%', '10%', '10%']}
      columns={[
        { id: 'invoice', label: 'Invoice' },
        { id: 'type', label: 'Type' },
        { id: 'supplier', label: 'Supplier' },
        { id: 'chef', label: 'Chef' },
        { id: 'date', label: 'Date' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
      ]}
      take={100}
      api={OrdersApi}
      possibleStatuses={staffOrderStatus}
      sectionTitle={title}
    >
      {(row): React.ReactElement => {
        const item = (row as unknown) as IOrder;
        return (
          <>
            <TableCell component="td" scope="row">
              {item?.id ? (
                <Link href={`/admin/staff/orders/${item?.id}`}>
                  <a href={`/admin/staff/orders/${item?.id}`}>
                    <div className="d-flex fw-bold">#{item.id}</div>
                  </a>
                </Link>
              ) : (
                <Skeleton width={20} />
              )}
            </TableCell>
            <TextCell isLoading={isLoading}>
              <OrderTypeIcons OrderTypes={item?.types} />
            </TextCell>
            <TextWidthImageСell
              href="/admin/staff/suppliers/edit"
              id={item?.supplier?.id}
              image={item?.supplier?.image ?? null}
              imageStyle={{ borderRadius: '50%', height: 25, width: 25 }}
              name={item?.supplier?.name ?? '-----'}
              isLoading={isLoading}
            />
            <TextWidthImageСell
              href="/admin/staff/chefs/edit"
              id={item?.chefs?.[0]?.id}
              image={item?.chefs?.[0]?.image ?? null}
              imageStyle={{ borderRadius: '50%', height: 25, width: 25 }}
              name={item?.chefs?.[0]?.name ?? '-----'}
              isLoading={isLoading}
            />
            <TextCell isLoading={isLoading}>
              {(item?.date && format(new Date(item.date), ' dd MMM yyyy')) || ''}
            </TextCell>
            <TextCell isLoading={isLoading}>AED {item?.total ?? ''}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
