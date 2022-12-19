import { AdminTable } from 'components/pages/admin/AdminTable';
import { TextCell } from 'components/pages/admin/Table/cells/TextCell';
import { TextWidthImageСell } from 'components/pages/admin/Table/cells/TextWidthImageСolumn';
import Link from 'next/link';
import React from 'react';
import { CustomersApi } from 'services/api/admin/Customers';
import { StaffApi } from 'services/api/admin/StaffApi';
import { Customer, DashboardRole } from 'services/types';

export const StaffCustomers: React.FC = (): React.ReactElement => {
  return (
    <AdminTable
      role={DashboardRole.STAFF}
      columnsWidth={['10%', '20%', '20%', '20%', '15%', '15%']}
      columns={[
        { id: 'id', label: 'Id' },
        { id: 'customer', label: 'Customer' },
        { id: 'email', label: 'Email' },
        { id: 'phone', label: 'Phone' },
        { id: 'orders', label: 'Orders' },
        { id: 'status', label: 'Status' },
      ]}
      take={100}
      api={{
        getAll: CustomersApi.getAll,
        activate: StaffApi.activateCustomers,
        deactivate: StaffApi.deactivateCustomers,
      }}
      sectionTitle="Customers"
    >
      {(row): React.ReactElement => {
        const item = row as Customer;
        return (
          <>
            <TextCell>
              <Link href={`/admin/staff/customers/edit/${item.id}`}>
                <a href={`/admin/staff/customers/edit/${item.id}`}>{item.id}</a>
              </Link>
            </TextCell>
            <TextWidthImageСell
              href="/admin/staff/customers/edit"
              id={item.id}
              imageStyle={{ borderRadius: '50%', height: 25, width: 25 }}
              image={item?.image ?? ''}
              name={`${item?.firstName} ${item?.lastName}`}
            />
            <TextCell>{item.email}</TextCell>
            <TextCell>{item.phone}</TextCell>
            <TextCell>{item.orders}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
