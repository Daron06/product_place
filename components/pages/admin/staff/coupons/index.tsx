import Link from 'next/link';
import React from 'react';
import { Coupon, CouponsApi } from 'services/api/admin/CouponsApi';
import { AdminEndpoints } from 'services/api/endpoints';

import { AdminTable } from '../../AdminTable';
import { TextCell } from '../../Table/cells/TextCell';

export const StaffCoupons: React.FC = (): React.ReactElement => {
  return (
    <AdminTable
      role={AdminEndpoints.COUPONS}
      columnsWidth={['20%', '35%', '10%', '10%', '10%', '15%']}
      columns={[
        { id: 'code', label: 'Code' },
        { id: 'type', label: 'Coupon type' },
        { id: 'amount', label: 'Coupon amount' },
        { id: 'limit', label: 'Usage / Limit' },
        { id: 'date', label: 'Expiry date' },
        { id: 'status', label: 'Status' },
      ]}
      api={CouponsApi}
      take={10}
      sectionTitle="Coupons"
    >
      {(row): React.ReactElement => {
        const item = row as Coupon;
        return (
          <>
            <TextCell>
              <Link href={`/admin/staff/coupons/edit/${item.id}`}>
                <a>{item?.code} </a>
              </Link>
            </TextCell>
            <TextCell>
              <span style={{ textTransform: 'capitalize' }}>{item?.type}</span>
            </TextCell>
            <TextCell> {item?.type === 'amount' ? `AED ${item?.value}` : `${item.value}%`}</TextCell>
            <TextCell>{item?.maxUsesCount}</TextCell>
            <TextCell>{item?.expirationDate}</TextCell>
          </>
        );
      }}
    </AdminTable>
  );
};
