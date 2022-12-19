import { Tab } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography/Typography';
import clsx from 'clsx';
import { CategoriesMenu } from 'components/CategoriesMenu';
import { TabPanel } from 'components/TabPanel';
import { useTranslate } from 'hooks/useTranslate';
import { ProductDetailsLayout } from 'layouts/ProductDetailsLayout';
import { ProductDetailsActions } from 'layouts/ProductDetailsLayout/ProductDetailsActions';
import { ProductDetailsChefInfo } from 'layouts/ProductDetailsLayout/ProductDetailsChefInfo';
import { ProductDetailsDescription } from 'layouts/ProductDetailsLayout/ProductDetailsDescription';
import { ProductDetailsLikeCount } from 'layouts/ProductDetailsLayout/ProductDetailsLikeCount';
import { ProductDetailsName } from 'layouts/ProductDetailsLayout/ProductDetailsName';
import { ProductDetailsPrice } from 'layouts/ProductDetailsLayout/ProductDetailsPrice';
import keyBy from 'lodash/keyBy';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { AdminEndpoints, Endpoints } from 'services/api/endpoints';
import { CategoryItem } from 'services/types';

import { ProductOptionsBlock, SelectedIdsRecord } from '../../ProductOptionsBlock';
import styles from './chefStoreDetails.module.scss';

interface ChefStoreDetailsProps {
  data: Product | null;
  recommendations?: Product[];
  categories?: CategoryItem[];
  endpoint?: AdminEndpoints.CHEF_STORE | Endpoints.PRODUCT_CHEF_STORE;
}

export const ChefStoreDetails: React.FC<ChefStoreDetailsProps> = ({ data, categories }): React.ReactElement => {
  const [selectedOptions, setSelectedOptions] = React.useState<SelectedIdsRecord>({} as SelectedIdsRecord);
  const [chefStorePrice, setChefStorePrice] = React.useState<number>(0);
  const { t, getTranslatedText } = useTranslate('chefs-store-details');

  React.useEffect(() => {
    if (!chefStorePrice && data) {
      setChefStorePrice(data.price);
    }
  }, [data]);

  if (data === null) {
    return <div>Chefs store details is null</div>;
  }

  const handleOptionsChange = (event: React.ChangeEvent<{ value: string }>): void => {
    const selectedId = event.target.value;
    const options = keyBy(data?.options, 'option.id');
    const selectedOption = options[selectedId];

    const optionName = selectedOption.option.category.slug;

    setSelectedOptions({
      [optionName]: Number(selectedOption.id),
    });

    setChefStorePrice(Number(selectedOption.price));
  };

  const selectedOptionsArr = Object.values(selectedOptions).map((id) => {
    const obj = data?.options.find((o) => id === o.id);
    return {
      id,
      name: obj?.option.name || '',
      price: obj?.option.price || 0,
      quantity: 1,
    };
  });

  return (
    <>
      <ProductDetailsLayout
        breadcrumbs={[
          { title: t('home'), url: '/' },
          { title: t('chefs-store'), url: '/chefs-store' },
          { title: getTranslatedText(data, 'name') ?? '' },
        ]}
        loading={false}
        sliderItems={data?.media}
        breadcrumbsCssClass="chefsStore"
      >
        {categories && <CategoriesMenu categories={categories} isDrawer />}

        {data.rating > 0 && <ProductDetailsLikeCount>{data.rating}</ProductDetailsLikeCount>}

        <ProductDetailsName loading={false} title={getTranslatedText(data, 'name')} />
        <ProductDetailsPrice loading={false} value={data.price} />
        <ProductDetailsDescription loading={false} text={getTranslatedText(data, 'shortDescription') || ''} />
        <Divider className="mb-20" />
        <ProductOptionsBlock
          onChange={handleOptionsChange}
          options={data?.options}
          value={selectedOptions}
          selectable
        />
        <div className={clsx('d-flex align-items-center mb-20', styles.supplierInfo)}>
          <Typography className="text-color-600 fz-large-14">{t('supplier')}:</Typography>
          <div className={clsx(styles.ml10, 'd-flex align-items-center')}>
            <Avatar src={data.supplier.image} style={{ width: 25, height: 25 }} />
            <Typography className={clsx(styles.ml10, 'fz-large-14')}>{data.supplier.name}</Typography>
          </div>
        </div>
        <ProductDetailsActions
          disabled={data?.options.length > 0 ? !selectedOptionsArr.length || !chefStorePrice : false}
          image={data.media[0]?.url || data.image}
          name={data.name}
          id={data.id}
          price={chefStorePrice}
          favoriteType="menu"
          options={selectedOptionsArr}
          type={data.type}
          slug={data.slug}
        />
        <Divider />
        {data.chef && (
          <ProductDetailsChefInfo
            slug={data.chef.slug}
            avatar={data.chef.image}
            name={data.chef.name}
            description={getTranslatedText(data.chef, 'shortDescription')}
            loading={false}
          />
        )}
        <Tabs
          className={styles.tabs}
          TabIndicatorProps={{ children: <div className={styles.indicator} /> }}
          indicatorColor="primary"
          value="description"
        >
          <Tab label={t('description')} value="description" />
        </Tabs>
        <TabPanel active="description" tab="description">
          <div className="redactorSection">
            <div
              className={styles.fullDescription}
              dangerouslySetInnerHTML={{ __html: getTranslatedText(data, 'description') || '' }}
            />
          </div>
        </TabPanel>
      </ProductDetailsLayout>
    </>
  );
};
