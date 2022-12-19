import { AdminTable } from 'components/pages/admin/AdminTable';
import { TextCell } from 'components/pages/admin/Table/cells/TextCell';
import { TextWidthImageСell } from 'components/pages/admin/Table/cells/TextWidthImageСolumn';
import React from 'react';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { ChefStoreItem } from 'services/api/admin/WarehouseApi';
import { DashboardRole } from 'services/types';

export const WarehouseTable: React.FC<{ role: DashboardRole.SUPPLIER | DashboardRole.STAFF }> = ({ role }) => {
  return (
    <AdminTable
      sectionTitle="All items"
      role={role}
      columnsWidth={
        role === 'supplier'
          ? ['50%', '10%', '10%', '10%', '10%', '10%', '10%']
          : ['30%', '20%', '15%', '15%', '15%', '5%']
      }
      columns={[
        role === 'supplier' ? { id: 'name', label: 'Name/Code' } : { id: 'product', label: 'Product' },
        role === 'staff' ? { id: 'supplier', label: 'Supplier' } : undefined,
        { id: 'category', label: 'Category' },
        { id: 'supplierPrice', label: 'Price' },
        role === 'supplier' ? { id: 'chefCommission', label: 'Chef commission' } : undefined,
        role === 'supplier' ? { id: 'inventory', label: 'Inventory' } : undefined,
        { id: 'status', label: 'Status' },
      ]}
      take={10}
      api={{
        getAll: AdminProductsApi.getAllStore,
        activate: AdminProductsApi.activate,
        deactivate: AdminProductsApi.deactivate,
        delete: AdminProductsApi.delete,
      }}
    >
      {(row): React.ReactElement => {
        const item = row as ChefStoreItem;

        return (
          <>
            <TextWidthImageСell
              href={`/admin/staff/warehouse/edit`}
              id={item?.id}
              name={item?.name}
              image={item?.media[0]?.url}
              imageStyle={{ height: 45, width: 45 }}
            />
            {role === 'staff' && (
              <TextWidthImageСell
                href={`/admin/staff/warehouse/edit`}
                id={item.supplier.id}
                name={item.supplier.name}
                image={item.supplier.image}
                imageStyle={{ height: 25, width: 25, borderRadius: '50%' }}
              />
            )}
            <TextCell>{item.category?.name}</TextCell>
            <TextCell>{item.supplierPrice ?? '---'}</TextCell>
            {role === 'supplier' && (
              <>
                <TextCell>{item.chefPrice}</TextCell>
                <TextCell>{item.inventory}</TextCell>
              </>
            )}
          </>
        );
      }}
    </AdminTable>
  );
};
