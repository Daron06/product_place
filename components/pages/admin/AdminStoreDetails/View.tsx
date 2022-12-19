import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography/Typography';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import { StoreInfoBlock } from 'components/pages/admin/StoreInfoBlock';
import React from 'react';

import { StoreTestimonialBlock } from '../StoreTestiomonialBlock';
import styles from './AdminChefStoreUpsert.module.scss';
import { AdminStoreDetailsViewProps } from './types';

export const AdminStoreDetailsView: React.FC<AdminStoreDetailsViewProps> = ({
  data,
  handleSubmit,
}): React.ReactElement => {
  return (
    <div className="p-30">
      <div className="mb-30">
        <CreateHeader title={data.name} handleSubmit={handleSubmit} submitButtonText="Save" />
      </div>
      <div className={styles.root}>
        <section className={styles.rootSection}>
          <StoreInfoBlock
            images={data.media}
            name={data.name}
            options={data.options}
            price={data.price}
            supplier={data.supplier}
            description={data.description}
            shortDescription={data.shortDescription}
          />
          <StoreTestimonialBlock />
        </section>
        <aside className={styles.rootAside}>
          <Paper elevation={0}>
            <div className="p-20">
              <Typography className={styles.boldText}>Supplier</Typography>
              <div className="d-flex align-items-center mt-20">
                <Avatar />
                <Typography className="ml-10">Jimmy Hudson</Typography>
              </div>
            </div>
          </Paper>
        </aside>
      </div>
    </div>
  );
};
