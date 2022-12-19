import { Icon } from 'components/Icon';
import { AdminTable } from 'components/pages/admin/AdminTable';
import { TextCell } from 'components/pages/admin/Table/cells/TextCell';
import { TextWidthImageСell } from 'components/pages/admin/Table/cells/TextWidthImageСolumn';
import format from 'date-fns/format';
import React from 'react';
import { AdminStaffAccounting } from 'redux/ducks/products/types/contracts';
import { StaffApi } from 'services/api/admin/StaffApi';
import { DashboardRole } from 'services/types';

export const WithdrawalsTable: React.FC = () => {
  return (
    <AdminTable
      role={DashboardRole.STAFF}
      columnsWidth={['15%', '15%', '15%', '25%', '15%', '15%']}
      columns={[
        { id: 'date', label: 'Date' },
        { id: 'type', label: 'Type' },
        { id: 'vendorType', label: 'Vendor Type' },
        { id: 'vendor', label: 'Vendor' },
        { id: 'valueBalance', label: 'Value' },
        { id: 'status', label: 'Status' },
      ]}
      take={10}
      api={{
        getAll: StaffApi.accountingWithdrawals,
      }}
      sectionTitle="Accounting"
    >
      {(row): React.ReactElement => {
        const item = row as AdminStaffAccounting;

        return (
          <>
            <TextCell>{format(new Date(item.createdAt), 'dd MMM Y, H:m')}</TextCell>
            <TextCell>{item.info}</TextCell>
            <TextCell classes={{ text: 'text-capitalize' }}>
              <span>
                <Icon type="arrow-bottom" />
              </span>
              Withdrawals
            </TextCell>
            <TextWidthImageСell
              href={`/admin/staff/${item.vendor.type}s/edit`}
              id={item.vendor.id}
              image={item.vendor.image ?? null}
              imageStyle={{ borderRadius: '4px', height: 45, width: 45 }}
              name={item.vendor.name ?? '---'}
            />
            <TextCell>AED {item.amount}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
