import { Result } from 'components/Result';
import { useRouter } from 'next/router';
import React from 'react';
import { SupplierChef } from 'redux/ducks/admin/supplier/chefs/types/contracts';
import { ChefsApi } from 'services/api/admin/ChefsApi';
import { SupplierApi } from 'services/api/admin/SupplierApi';
import { DashboardRole, StatusEnum } from 'services/types';

import styles from './SupplierChefDetails.module.scss';
import { SupplierChefDetailsView } from './View';

export const SupplierChefDetails: React.FC<{ role: DashboardRole.SUPPLIER | DashboardRole.CLOUD_KITCHEN }> = ({
  role,
}) => {
  const [supplierChef, setSupplierChef] = React.useState<SupplierChef | null>(null);
  const { query } = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [chefStatus, setChefStatus] = React.useState<StatusEnum | undefined>(undefined);

  React.useEffect(() => {
    const getChef = async (): Promise<void> => {
      try {
        // TODO: Поправить типизацию
        const chef = (await ChefsApi.details(String(query.id))) as any;
        setSupplierChef(chef);
        setChefStatus(chef?.status);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getChef();
  }, []);

  const handleChefActivate = (): void => {
    SupplierApi.activateChefItems(String(query.id));
    setChefStatus(StatusEnum.ACTIVE);
  };

  const handleChefBlock = (): void => {
    SupplierApi.deactivateChefItems(String(query.id));
    setChefStatus(StatusEnum.DISABLED);
  };

  if (!loading && !supplierChef) {
    return (
      <div className={styles.notFoundResult}>
        <Result title="Chef not found" status="empty" />
      </div>
    );
  }

  return (
    <SupplierChefDetailsView
      role={role}
      chef={supplierChef}
      loading={loading}
      onChefActivate={handleChefActivate}
      onChefBlock={handleChefBlock}
      status={chefStatus}
    />
  );
};
