import React from 'react';
import { Banner } from 'services/types';

import styles from './GalleryBanners.module.scss';

interface GalleryBannersProps {
  items: Banner[];
}

export const GalleryBanners: React.FC<GalleryBannersProps> = ({ items }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.banners}>
        {items.map((banner, index) => (
          <a key={banner.id} href={banner.link} className={styles[`banner${index + 1}`]}>
            <img alt={`Banner ${index}`} src={banner.image} />
          </a>
        ))}
      </div>
    </div>
  );
};
