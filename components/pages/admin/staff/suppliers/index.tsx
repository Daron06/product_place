import { AdminTable } from 'components/pages/admin/AdminTable';
import { TextCell } from 'components/pages/admin/Table/cells/TextCell';
import { TextWidthImageСell } from 'components/pages/admin/Table/cells/TextWidthImageСolumn';
import { UseTableProps } from 'hooks/useTable';
import Link from 'next/link';
import React from 'react';
import { StaffSupplier } from 'redux/ducks/products/types/contracts';
import { DashboardRole } from 'services/types';

interface StaffSuppliersProps {
  apiMethods: UseTableProps<StaffSupplier>['api'];
  href: string;
  title: string;
}

export const StaffSuppliers: React.FC<StaffSuppliersProps> = ({ apiMethods, href, title }) => {
  return (
    <AdminTable
      role={DashboardRole.STAFF}
      columnsWidth={['5%', '25%', '30%', '15%', '10%', '15%']}
      columns={[
        { id: 'id', label: 'Id' },
        { id: 'companyName', label: 'Company name' },
        { id: 'city', label: 'City' },
        { id: 'phone', label: 'Phone' },
        { id: 'orders', label: 'Orders' },
        { id: 'status', label: 'Status' },
      ]}
      take={10}
      /* TODO: Fix apiMethods type */
      api={apiMethods as never}
      sectionTitle={title}
    >
      {(row): React.ReactElement => {
        const item = row as StaffSupplier;
        return (
          <>
            <TextCell>
              <Link href={`/admin/staff/${href}/edit/${item.id}`}>
                <a href={`/admin/staff/${href}/edit/${item.id}`}>{item.id}</a>
              </Link>
            </TextCell>
            <TextWidthImageСell
              href={`/admin/staff/${href}/edit`}
              id={item.id}
              image={item?.image ?? null}
              imageStyle={{ borderRadius: '50%', height: 25, width: 25 }}
              name={item?.name ?? '---'}
            />
            <TextCell>{item.locationInfo?.city?.name || '---'}</TextCell>
            <TextCell>{item.contactInfo?.phone || '---'}</TextCell>
            <TextCell>{item?.orders || '----'}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
