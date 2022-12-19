import { AdminTable } from 'components/pages/admin/AdminTable';
import { TextCell } from 'components/pages/admin/Table/cells/TextCell';
import { TextWidthImageСell } from 'components/pages/admin/Table/cells/TextWidthImageСolumn';
import Link from 'next/link';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { AdminEndpoints } from 'services/api/endpoints';
import { DashboardRole } from 'services/types';

export const ChefStore: React.FC<{ role: DashboardRole.CHEF | DashboardRole.STAFF }> = ({
  role,
}): React.ReactElement => {
  return (
    <AdminTable
      role={role}
      columnsWidth={['5%', '25%', '25%', '20%', '20%']}
      columns={[
        { id: 'id', label: 'Id' },
        { id: 'product', label: 'Product' },
        {
          id: role === DashboardRole.CHEF ? 'supplier' : 'chef',
          label: role === DashboardRole.CHEF ? 'Supplier' : 'Chef',
        },
        { id: 'category', label: 'Category' },
        { id: 'price ', label: 'Price ' },
        { id: 'status', label: 'Status' },
      ]}
      take={10}
      api={{
        getAll: AdminProductsApi.getProductsByEndpoint(AdminEndpoints.CHEF_STORE),
        activate: AdminProductsApi.activate,
        deactivate: AdminProductsApi.deactivate,
        delete: AdminProductsApi.delete,
      }}
      sectionTitle="All items"
    >
      {(row): React.ReactElement => {
        const item = row as Product;
        return (
          <>
            <TextCell>
              <Link href={`/admin/${role}/store/${item.id}`}>
                <a href={`/admin/${role}/store/${item.id}`}>{item.id}</a>
              </Link>
            </TextCell>
            <TextWidthImageСell
              href={`/admin/${role}/store`}
              id={item.id}
              image={item?.media[0]?.url ?? null}
              imageStyle={{ borderRadius: '4px', height: 45, width: 45 }}
              name={item?.name ?? '---'}
            />
            <TextWidthImageСell
              link={role === DashboardRole.STAFF}
              href={`/admin/${role}/chefs/edit`}
              id={item?.chef?.id}
              image={role === DashboardRole.CHEF ? item?.supplier.image ?? null : item?.chef.image ?? null}
              imageStyle={{ borderRadius: '50%', height: 25, width: 25 }}
              name={role === DashboardRole.CHEF ? item?.supplier.name ?? '---' : item?.chef.name ?? '---'}
            />
            <TextCell>{item?.category?.name ?? '----'}</TextCell>
            <TextCell>AED {item?.price ?? '----'}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
