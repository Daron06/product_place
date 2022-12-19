import React from 'react';

import styles from './PromoBanner.module.scss';

interface PromoBannerProps {
  imageUrl: string;
  link: string;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ link, imageUrl }) => {
  return (
    <div className={styles.root}>
      <a href={link}>
        <img src={imageUrl} alt="Promo banner" />
      </a>
    </div>
  );
};
