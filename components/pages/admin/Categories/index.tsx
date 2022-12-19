import { useRouter } from 'next/router';
import React from 'react';

import { CategoriesApi } from '../../../../services/api/admin/CategoriesApi';
import { Category, DashboardRole } from '../../../../services/types';
import { AdminTable } from '../AdminTable';
import { TextCell } from '../Table/cells/TextCell';
import { TextWidthImageСell } from '../Table/cells/TextWidthImageСolumn';

interface IngredientsAdminTableProps {
  role?: DashboardRole;
}

export const CategoriesAdminTable: React.FC<IngredientsAdminTableProps> = (): React.ReactElement => {
  const router = useRouter();
  return (
    <AdminTable
      role={DashboardRole.STAFF}
      columnsWidth={['80%', '10%', '10%']}
      columns={[
        { id: 'name', label: 'Name' },
        { id: 'items', label: 'Items' },
        { id: 'status', label: 'Status' },
      ]}
      api={CategoriesApi}
      take={10}
      sectionTitle="All Categories"
    >
      {(row): React.ReactElement => {
        const item = row as Category;
        return (
          <>
            <TextWidthImageСell
              href={`${router.asPath}/edit`}
              id={item?.id}
              name={item?.name}
              imageStyle={{ height: 25, width: 25 }}
              image={item?.image}
            />
            <TextCell>{item.items}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
