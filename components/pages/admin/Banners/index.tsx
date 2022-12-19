import Link from 'next/link';
import React from 'react';

import { BannersApi } from '../../../../services/api/admin/BannersApi';
import { Banner, DashboardRole } from '../../../../services/types';
import { AdminTable } from '../AdminTable';
import { TextCell } from '../Table/cells/TextCell';

export const BannersAdminTable: React.FC = (): React.ReactElement => {
  return (
    <AdminTable
      role={DashboardRole.STAFF}
      columnsWidth={['60%', '30%', '10%']}
      columns={[
        { id: 'title', label: 'Title' },
        { id: 'expirationDate', label: 'Expiration Date' },
        { id: 'status', label: 'Status' },
      ]}
      api={BannersApi}
      take={10}
      sectionTitle="All Banners"
    >
      {(row): React.ReactElement => {
        const item = row as Banner;
        return (
          <>
            <TextCell>
              <Link href={`/admin/staff/banners/edit/${item.id}`}>
                <a>{item.title}</a>
              </Link>
            </TextCell>
            <TextCell>{item.expirationDate || 'Indefinitely'}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
