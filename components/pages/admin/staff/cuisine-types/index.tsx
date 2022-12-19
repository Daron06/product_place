import { useRouter } from 'next/router';
import React from 'react';
import { Cuisine } from 'redux/ducks/products/types/contracts';
import { CuisinesApi } from 'services/api/admin/CuisinesApi';
import { AdminEndpoints } from 'services/api/endpoints';

import { AdminTable } from '../../AdminTable';
import { TextCell } from '../../Table/cells/TextCell';
import { TextWidthImageСell } from '../../Table/cells/TextWidthImageСolumn';

export const CuisineTypes: React.FC = (): React.ReactElement => {
  const router = useRouter();

  return (
    <AdminTable
      role={AdminEndpoints.CUISINES}
      columnsWidth={['70%', '10%', '10%', '10%']}
      columns={[
        { id: 'name', label: 'Name' },
        { id: 'recipes', label: 'Recipes' },
        { id: 'menus', label: 'Menu' },
        { id: 'status', label: 'Status' },
      ]}
      api={CuisinesApi}
      take={10}
      sectionTitle="Cuisine types"
    >
      {(row): React.ReactElement => {
        const item = row as Cuisine;
        return (
          <>
            <TextWidthImageСell
              href={`${router.asPath}/edit`}
              id={item?.id}
              name={item?.name}
              imageStyle={{ height: 25, width: 25 }}
              image={null}
            />
            <TextCell color="secondary">{item?.mealKits}</TextCell>
            <TextCell color="secondary">{item?.menus}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
