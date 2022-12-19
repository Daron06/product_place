import { Skeleton } from '@material-ui/lab';
import { Checkbox } from 'components/Checkbox';
import InfoBlock from 'components/InfoBlock';
import { Select } from 'components/Select';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Product } from 'redux/ducks/products/types/contracts';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { AdminEndpoints, Endpoints } from 'services/api/endpoints';
import { ProductsApi } from 'services/api/ProductsApi';
import { DashboardRole, StatusEnum } from 'services/types';

import styles from './AddMasterclassBlock.module.scss';

interface ProductPriceBlockProps {
  onMasterClassChecked: (value?: boolean) => void;
  masterClassChecked: boolean;
  chefId?: string;
  masterClassId?: string;
  role: DashboardRole;
  chefStatus?: StatusEnum;
}

export const AddMasterclassBlock: React.FC<ProductPriceBlockProps> = ({
  masterClassChecked,
  onMasterClassChecked,
  chefId,
  masterClassId,
  role,
  chefStatus,
}): React.ReactElement => {
  const { setValue } = useFormContext();
  const [product, setProduct] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async (): Promise<void> => {
      setLoading(false);

      if (chefId && role === DashboardRole.STAFF) {
        const data = await ProductsApi.getAll(Endpoints.PRODUCT_MASTER_CLASSES, {
          chef_ids: [Number(chefId)],
          take: 0,
        });
        setProduct(data.items.filter((i) => i.status !== StatusEnum.PENDING && i.status !== StatusEnum.DISABLED) || []);
      } else if (role === DashboardRole.CHEF) {
        const data = await AdminProductsApi.getAll(AdminEndpoints.MASTER_CLASS, { take: 0 });
        setProduct(data.items.filter((i) => i.status !== StatusEnum.PENDING && i.status !== StatusEnum.DISABLED) || []);
      } else {
        setProduct([]);
        setValue('product', undefined, { shouldValidate: true });
      }

      setLoading(true);
    })();
  }, [chefId]);

  React.useEffect(() => {
    if (!product.find((i) => i.id === masterClassId)) {
      onMasterClassChecked(false);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ): void => {
    setValue('product', e.target.value, { shouldValidate: true });
  };

  if (!loading) {
    return (
      <WhiteBlock
        title="Master class"
        description="If the Recipe is associated with a Masterclass, please tick the box"
        marginZero
      >
        <Skeleton width="100%" height="50px" />
      </WhiteBlock>
    );
  }

  if (!chefId) {
    return (
      <WhiteBlock
        title="Master class"
        description="If the Recipe is associated with a Masterclass, please tick the box"
        marginZero
      >
        <InfoBlock text="Before choosing a master class, please choose a chef" type="warning" />
      </WhiteBlock>
    );
  }

  return (
    <WhiteBlock
      title="Master class"
      description="If the Recipe is associated with a Masterclass, please tick the box"
      marginZero
    >
      {product?.length ? (
        <>
          <div className={styles.checkbox} style={{ marginLeft: '-10px' }}>
            <Checkbox checked={masterClassChecked} onClick={(): void => onMasterClassChecked()} />
            <span>Connect with master class</span>
          </div>
          {masterClassChecked && (
            <Select
              disabled={!masterClassChecked}
              value={product.find((i) => i.id === masterClassId) ? masterClassId : 'empty'}
              items={product.length ? product.map((item: Product) => ({ value: item.id, name: item.name })) : []}
              onChange={handleChange}
              placeholder="Select Masterclass"
              displayEmpty
              fullWidth
            />
          )}
        </>
      ) : (
        <InfoBlock
          text={
            role === DashboardRole.STAFF && (chefStatus === StatusEnum.PENDING || chefStatus === StatusEnum.DISABLED)
              ? 'Chef no active'
              : 'No have active Masterclass'
          }
          type="warning"
        />
      )}
    </WhiteBlock>
  );
};
