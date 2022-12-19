import { useRouter } from 'next/router';
import React from 'react';
import { RequiredApi } from 'services/api/admin/RequiredApi';
import { AdminEndpoints } from 'services/api/endpoints';
import { RequiredType } from 'services/types';

import { AdminTable } from '../../AdminTable';
import { TextCell } from '../../Table/cells/TextCell';
import { TextWidthImageСell } from '../../Table/cells/TextWidthImageСolumn';

export const RequiredStaff: React.FC = (): React.ReactElement => {
  const router = useRouter();

  return (
    <AdminTable
      role={AdminEndpoints.CUISINES}
      columnsWidth={['60%', '10%', '10%', '10%', '10%']}
      columns={[
        { id: 'name', label: 'Name' },
        { id: 'recipes', label: 'Recipes' },
        { id: 'menu', label: 'Menu' },
        { id: 'total', label: 'Total use' },
        { id: 'status', label: 'Status' },
      ]}
      api={RequiredApi}
      take={10}
      sectionTitle="Required"
    >
      {(row): React.ReactElement => {
        const item = row as RequiredType;
        return (
          <>
            <TextWidthImageСell
              href={`${router.asPath}/edit`}
              id={item?.id}
              name={item?.name}
              imageStyle={{ height: 25, width: 25 }}
              image={item?.image}
            />
            <TextCell color="secondary">{item?.recipes}</TextCell>
            <TextCell color="secondary">{item?.menus}</TextCell>
            <TextCell color="secondary">{item?.total}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
