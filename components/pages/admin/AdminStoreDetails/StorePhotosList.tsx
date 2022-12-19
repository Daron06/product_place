import React from 'react';
import { Media } from 'redux/ducks/products/types/contracts';

import styles from './AdminChefStoreUpsert.module.scss';

export interface StorePhotosListProps {
  items: Media[];
}

export const StorePhotosList: React.FC<StorePhotosListProps> = ({ items }): React.ReactElement => {
  return (
    <ul className="d-flex align-items-center flex-wrap mb-30 m-n-10">
      {items.map((item) => (
        <li className={styles.photoStoreItem} key={item.id}>
          <img src={item.url} alt={item.name} />
        </li>
      ))}
    </ul>
  );
};
