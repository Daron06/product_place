import { useRouter } from 'next/router';
import React from 'react';

import { Chef } from '../../../../redux/ducks/products/types/contracts';
import { SupplierApi } from '../../../../services/api/admin/SupplierApi';
import { DashboardRole } from '../../../../services/types';
import { AdminTable } from '../AdminTable';
import { TextCell } from '../Table/cells/TextCell';
import { TextWidthImageСell } from '../Table/cells/TextWidthImageСolumn';

type CloudKitchenChef = {
  chef: Chef;
  chefId: string;
  items: string;
  status: string;
};

export const SupplierChefs: React.FC = () => {
  const router = useRouter();

  return (
    <AdminTable
      role={DashboardRole.SUPPLIER}
      columnsWidth={['10%', '40%', '25%', '10%', '15%']}
      columns={[
        { id: 'id', label: 'Id' },
        { id: 'chef', label: 'Chef' },
        { id: 'current-role', label: 'Current role' },
        { id: 'items', label: 'Items' },
        { id: 'status', label: 'Status' },
      ]}
      api={{
        getAll: SupplierApi.getChefs,
        activate: SupplierApi.activateChefItems,
        deactivate: SupplierApi.deactivateChefItems,
      }}
      take={10}
      sectionTitle="All chefs"
    >
      {(row, isLoading): React.ReactElement => {
        const item = row as CloudKitchenChef;
        return (
          <>
            <TextCell>{item.chefId}</TextCell>
            <TextWidthImageСell
              href={router.asPath}
              id={item.chefId}
              name={item.chef.name}
              image={item.chef.image}
              imageStyle={{ height: 25, width: 25 }}
              isLoading={isLoading}
            />
            <TextCell>{item.chef.jobRole}</TextCell>
            <TextCell>{item.items}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
