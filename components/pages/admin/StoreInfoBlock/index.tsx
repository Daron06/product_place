import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography/Typography';
import styles from 'components/pages/admin/AdminStoreDetails/AdminChefStoreUpsert.module.scss';
import { StorePhotosList, StorePhotosListProps } from 'components/pages/admin/AdminStoreDetails/StorePhotosList';
import { Rating } from 'components/Rating';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { ProductOption } from 'redux/ducks/products/types/contracts';
import { Supplier } from 'services/types';

import { ProductOptionsBlock } from '../../../ProductOptionsBlock';

interface StoreInfoBlockProps {
  images: StorePhotosListProps['items'];
  name: string;
  price: number;
  supplier: Supplier;
  options: ProductOption[];
  shortDescription: string | null;
  description: string;
}

export const StoreInfoBlock: React.FC<StoreInfoBlockProps> = ({
  images,
  name,
  options,
  price,
  supplier,
  description,
  shortDescription,
}) => {
  return (
    <WhiteBlock>
      <StorePhotosList items={images} />
      <div className="d-flex align-items-center mb-10">
        <div className={styles.item}>
          <Rating value={4} />
        </div>
        <div className={styles.item}>
          <Typography className={styles.itemText}>124 imports</Typography>
        </div>
        <div className={styles.item}>
          <Typography className={styles.itemText}>249 orders</Typography>
        </div>
      </div>
      <Typography className={styles.productTitle} variant="h4">
        {name}
      </Typography>
      <div className="d-flex align-items-center mb-20">
        <Typography className="fw-bold fz-large-18 ">AED {price}</Typography>
        <div className="d-flex align-items-center ml-15">
          <Typography className={styles.commissionKey}>Your commission:</Typography>
          <Typography className={styles.commissionVal}>AED 20</Typography>
        </div>
      </div>
      <Typography dangerouslySetInnerHTML={{ __html: shortDescription || '' }} />
      <Typography className="fw-bold fz-large-18">Color</Typography>
      <div className="mb-30 mt-10">
        <ProductOptionsBlock options={options} />
      </div>
      <div className="d-flex align-items-center mb-30">
        <Avatar src={supplier.image} style={{ width: 45, height: 45 }} />
        <div className="d-flex flex-column ml-10">
          <Typography className="fw-bold fz-large-13">Supplier</Typography>
          <Typography>{supplier.name}</Typography>
        </div>
      </div>
      <div className="mb-20">
        <Divider />
      </div>
      <div className="d-flex align-items-center mb-30">
        <div className={`${styles.infoBlock} d-flex flex-column`}>
          <Typography className="fw-bold fz-large-13">Ships From</Typography>
          <Typography>Dubai</Typography>
        </div>
        <div className={`${styles.infoBlock} d-flex flex-column`}>
          <Typography className="fw-bold fz-large-13">Delivery</Typography>
          <Typography>Within the UAE</Typography>
        </div>
        <div className={`${styles.infoBlock} d-flex flex-column`}>
          <Typography className="fw-bold fz-large-13">Inventory</Typography>
          <Typography>204</Typography>
        </div>
      </div>
      <Typography className="fw-bold mb-20 fz-large-18">Description</Typography>
      <Typography dangerouslySetInnerHTML={{ __html: description }} />
    </WhiteBlock>
  );
};
