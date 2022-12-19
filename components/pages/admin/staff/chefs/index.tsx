import { AdminTable } from 'components/pages/admin/AdminTable';
import { TextCell } from 'components/pages/admin/Table/cells/TextCell';
import { TextWidthImageСell } from 'components/pages/admin/Table/cells/TextWidthImageСolumn';
import React from 'react';
import { Chef } from 'redux/ducks/products/types/contracts';
import { ChefsApi } from 'services/api/admin/ChefsApi';
import { StaffApi } from 'services/api/admin/StaffApi';
import { DashboardRole } from 'services/types';

export const StaffChefs: React.FC = () => {
  return (
    <AdminTable
      role={DashboardRole.STAFF}
      columnsWidth={['10%', '20%', '20%', '20%', '15%', '15%']}
      columns={[
        { id: 'id', label: 'Id' },
        { id: 'chef', label: 'Chef' },
        { id: 'jobRole', label: 'Current role' },
        { id: 'phone', label: 'Phone' },
        { id: 'orders', label: 'Orders' },
        { id: 'status', label: 'Status' },
      ]}
      take={10}
      api={{
        getAll: ChefsApi.getAll,
        activate: StaffApi.activateChefItems,
        deactivate: StaffApi.deactivateChefItems,
      }}
      sectionTitle="Chefs"
    >
      {(row): React.ReactElement => {
        const item = row as Chef;
        return (
          <>
            <TextCell>{item.id}</TextCell>
            <TextWidthImageСell
              href="/admin/staff/chefs/edit"
              id={item.id}
              imageStyle={{ borderRadius: '50%', height: 25, width: 25 }}
              image={item?.image ?? ''}
              name={item?.name}
            />
            <TextCell>{item.jobRole || '---'}</TextCell>
            <TextCell>{item.phone}</TextCell>
            <TextCell color="secondary">
              <b>{item.orders}</b>
            </TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
