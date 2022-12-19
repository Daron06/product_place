import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography/Typography';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import { ProductDetailsLayout } from 'layouts/ProductDetailsLayout';
import { ProductDetailsChefInfo } from 'layouts/ProductDetailsLayout/ProductDetailsChefInfo';
import { ProductDetailsDescription } from 'layouts/ProductDetailsLayout/ProductDetailsDescription';
import styles from 'layouts/ProductDetailsLayout/ProductDetailsLayout.module.scss';
import { ProductDetailsLikeCount } from 'layouts/ProductDetailsLayout/ProductDetailsLikeCount';
import { ProductDetailsName } from 'layouts/ProductDetailsLayout/ProductDetailsName';
import { ProductDetailsPrice } from 'layouts/ProductDetailsLayout/ProductDetailsPrice';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setProductsKind } from 'redux/ducks/products/actionCreators';
import { Product } from 'redux/ducks/products/types/contracts';
import { ProductChefNullable } from 'redux/ducks/products/types/state';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { DashboardRole, ProductsKindSearch } from 'services/types';

import { ProductOptionsBlock } from '../../../ProductOptionsBlock';

interface WarehouseDetailsProps {
  details: Product | null;
  role: DashboardRole.STAFF | DashboardRole.CHEF;
}

export const WarehouseDetails: React.FC<WarehouseDetailsProps> = ({ details, role }): React.ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [chef, setChef] = React.useState<ProductChefNullable>();
  const [loading, setLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    dispatch(setProductsKind(ProductsKindSearch.ADMIN_CHEF_STORE));
  }, []);

  React.useEffect(() => {
    if (details !== null) {
      setChef(details);
      setLoading(false);
    }
  }, [details]);

  const handleImportProduct = async (): Promise<void> => {
    if (role === DashboardRole.STAFF) {
      await router.push(`/admin/staff/store/${chef?.id}`);
      return;
    }

    setIsSubmitting(true);
    try {
      if (chef) {
        if (chef.chef) {
          await AdminProductsApi.delete([Number(chef.id)]);
          setChef({
            ...chef,
            id: details?.id ?? chef.id,
            chef: null,
          });
        } else if (details) {
          const data = await AdminProductsApi.importProduct(details.id, chef.id);
          setChef(data);
        }
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error(`handleImportProduct: ${error}`);
    }
  };

  return (
    <div className="whiteBackground">
      <div className="pl-40 pt-40 pr-40">
        <CreateHeader title="Warehouse" />
      </div>
      <ProductDetailsLayout
        breadcrumbs={[
          { title: 'All items', url: '/admin/chef/store' },
          { title: 'Warehouse', url: '/admin/chef/store/warehouse' },
          { title: chef?.name ?? '' },
        ]}
        loading={loading}
        sliderItems={chef?.media}
      >
        <ProductDetailsLikeCount>4.5</ProductDetailsLikeCount>
        <ProductDetailsName loading={loading} title={chef?.name} />
        <div className="d-flex align-items-center">
          <ProductDetailsPrice commissionPrice={chef?.chefPrice} loading={loading} value={chef?.price} />
        </div>
        <ProductDetailsDescription loading={loading} text={chef?.shortDescription} />
        {chef && (
          <div className="mb-30 mt-10">
            <ProductOptionsBlock options={chef.options} />
          </div>
        )}
        <Button
          classes={{ root: clsx({ [styles.removeButton]: chef?.chef }) }}
          color="secondary"
          disabled={isSubmitting}
          onClick={handleImportProduct}
          loading={isSubmitting}
          size="large"
          style={{ minWidth: 170 }}
          variant="contained"
        >
          {chef?.chef ? '- Remove Item' : '+ Import Item'}
        </Button>
        <div className="d-flex mb-30 mt-30">
          <Avatar src={chef?.supplier.image} />
          <div className="d-flex flex-column ml-10">
            <Typography className="fw-bold">{chef?.supplier.name}</Typography>
            <Typography>{chef?.supplier.description}</Typography>
          </div>
        </div>
        <Divider />
        <div className="d-flex align-items-center mb-30 mt-30">
          <div className={`${styles.infoBlock} d-flex flex-column mr-20 pr-20`}>
            <Typography className="fw-bold">Ships From</Typography>
            <Typography>Dubai</Typography>
          </div>
          <div className={`${styles.infoBlock} d-flex flex-column`}>
            <Typography className="fw-bold">Delivery</Typography>
            <Typography>Within the UAE</Typography>
          </div>
        </div>
        <Typography className="fw-bold fz-large-18 mb-20">Description</Typography>
        <ProductDetailsDescription loading={loading} text={chef?.description} />
        {chef?.chef && (
          <ProductDetailsChefInfo
            slug={chef.chef.slug}
            avatar={chef.chef.image}
            name={chef.chef.name}
            description={chef.chef.description}
            loading={loading}
          />
        )}
      </ProductDetailsLayout>
    </div>
  );
};
