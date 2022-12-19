import { useRouter } from 'next/router';
import React from 'react';

import { IngredientsApi } from '../../../../services/api/admin/IngredientsApi';
import { DashboardRole, Ingredient } from '../../../../services/types';
import { AdminTable } from '../AdminTable';
import { TextCell } from '../Table/cells/TextCell';
import { TextWidthImageСell } from '../Table/cells/TextWidthImageСolumn';

interface IngredientsAdminTableProps {
  role?: DashboardRole;
}

export const IngredientsAdminTable: React.FC<IngredientsAdminTableProps> = ({ role }): React.ReactElement => {
  const router = useRouter();

  return (
    <AdminTable
      role={DashboardRole.SUPPLIER}
      columnsWidth={role === DashboardRole.STAFF ? ['5%', '30%', '50%', '15%'] : ['5%', '80%', '15%']}
      columns={[
        { id: 'id', label: 'Id' },
        { id: 'name', label: 'Name / Code' },
        role === DashboardRole.STAFF ? { id: 'supplier', label: 'Supplier / Cloud kitchens' } : undefined,
        { id: 'status', label: 'Status' },
      ]}
      api={IngredientsApi}
      take={10}
      sectionTitle="All Ingredients"
    >
      {(row): React.ReactElement => {
        const item = row as Ingredient;
        return (
          <>
            <TextCell>{item.id}</TextCell>
            <TextWidthImageСell
              href={`${router.asPath}/edit`}
              id={item?.id}
              name={item?.name}
              image={item?.image}
              imageStyle={{ height: 25, width: 25 }}
            />
            {role === DashboardRole.STAFF && (
              <TextWidthImageСell
                href="/admin/staff/suppliers/edit"
                id={item?.id}
                name={item?.supplier?.name}
                image={item?.supplier?.image}
                imageStyle={{ height: 25, width: 25 }}
              />
            )}
          </>
        );
      }}
    </AdminTable>
  );
};
