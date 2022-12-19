import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography/Typography';
import { AutocompleteBlock } from 'components/pages/admin/AutocompleteBlock';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import { StoreInfoBlock } from 'components/pages/admin/StoreInfoBlock';
import { Select } from 'components/Select';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import { useAlert } from 'hooks/useAlert';
import keyBy from 'lodash/keyBy';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Chef, Product } from 'redux/ducks/products/types/contracts';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { AdminProductSummary, DashboardRole, StatusEnum } from 'services/types';

import styles from './AdminChefStoreUpsert.module.scss';

export interface AdminStoreDetailsProps {
  chefs?: Chef[];
  data?: Product;
  role: DashboardRole.STAFF | DashboardRole.CHEF;
}

const storeStatuses = [
  {
    value: StatusEnum.ACTIVE,
    name: 'Active',
  },
  {
    value: StatusEnum.DISABLED,
    name: 'Disabled',
  },
  {
    value: StatusEnum.PENDING,
    name: 'Pending',
  },
];

export const AdminStoreDetails: React.FC<AdminStoreDetailsProps> = ({ chefs, data, role }) => {
  const [productSummary, setProductSummary] = React.useState<AdminProductSummary>();
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      chef: data?.chef,
      status: data?.status,
    },
  });
  const { openAlert } = useAlert();

  React.useEffect(() => {
    form.register('status');
  }, [form]);

  if (!data) {
    return <div>No data to display</div>;
  }

  const onChefChange = async (chef: Chef): Promise<void> => {
    try {
      await AdminProductsApi.importProduct(data.id, chef.id);
      openAlert('Store successfully assigned to the chef', 'success');
    } catch (error) {
      openAlert(`Error: ${error.response?.data?.message}`, 'error');
      console.error('onSubmit:', error);
    }
  };

  const handleStatusChange = async (event: React.ChangeEvent<{ name?: string; value: unknown }>): Promise<void> => {
    const statusesKeyBy = keyBy(storeStatuses, 'value');
    const statusType = statusesKeyBy[event.target.value as string].value;

    form.setValue('status', statusType, {
      shouldValidate: true,
      shouldDirty: true,
    });

    try {
      if (statusType === 'active') {
        await AdminProductsApi.activate([Number(data.id)]);
      }
      if (statusType === 'disabled') {
        await AdminProductsApi.deactivate([Number(data.id)]);
      }
      openAlert('Store status successfully changed', 'success');
    } catch (error) {
      openAlert(`An error occurred while changing: ${error.message}`, 'error');
      console.error('handleStatusChange:', error);
    }
  };

  const getProductSummary = async (productId: string): Promise<void> => {
    try {
      const summaryData = await AdminProductsApi.summary(productId);
      setProductSummary(summaryData);
    } catch (error: any) {
      openAlert(`An error occurred while changing: ${error.message}`, 'error');
      console.error('handleStatusChange:', error);
    }
  };

  React.useEffect(() => {
    getProductSummary(data.id);
  }, [data]);

  return (
    <FormProvider {...form}>
      <div className="p-30">
        <CreateHeader title={data.name} submitButtonText="Save" />
        <div className={styles.root}>
          <section className={styles.rootSection}>
            {role === DashboardRole.STAFF && (
              <div className="mt-20">
                <AutocompleteBlock items={chefs} name="chef" value={data.chef} title="Chef" onChange={onChefChange} />
              </div>
            )}
            <StoreInfoBlock
              images={data.media}
              name={data.name}
              options={data.options}
              price={data.price}
              supplier={data.supplier}
              description={data.description}
              shortDescription={data.shortDescription}
            />
          </section>
          <aside className="mt-20">
            {role === DashboardRole.STAFF && (
              <WhiteBlock title="Status">
                <Select
                  fullWidth
                  items={storeStatuses}
                  onChange={handleStatusChange}
                  name="status"
                  defaultValue={data.status}
                />
              </WhiteBlock>
            )}
            <WhiteBlock title="Supplier">
              <div className="d-flex align-items-center mt-20">
                <Avatar src={data.supplier.image} />
                <Typography className="ml-10">{data.supplier.name}</Typography>
              </div>
            </WhiteBlock>
            {productSummary && (
              <WhiteBlock title="Summary">
                <div className="d-flex align-items-center justify-content-between">
                  <Typography className="text-color-600">Ships From</Typography>
                  <Typography className="fw-bold">Dubai</Typography>
                </div>
                <Divider className="mt-15 mb-15" />
                <div className="d-flex align-items-center justify-content-between">
                  <Typography className="text-color-600">Listing frequency</Typography>
                  <Typography>{productSummary.orders}</Typography>
                </div>
                <Divider className="mt-15 mb-15" />
                <div className="d-flex align-items-center justify-content-between">
                  <Typography className="text-color-600">Sales</Typography>
                  <Typography>{productSummary.sales}</Typography>
                </div>
                <Divider className="mt-15 mb-15" />
                <div className="d-flex align-items-center justify-content-between">
                  <Typography className="text-color-600">Chef Income</Typography>
                  <Typography className="fw-bold">AED {productSummary.chefIncome || 0}</Typography>
                </div>
              </WhiteBlock>
            )}
          </aside>
        </div>
      </div>
    </FormProvider>
  );
};
