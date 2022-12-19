import React from 'react';
import { Banner } from 'services/types';

import styles from './Banners.module.scss';

export enum BannerPositionType {
  CHEF_STORE_TOP_1 = 'CHEF_STORE_TOP_1',
  CHEF_STORE_TOP_2 = 'CHEF_STORE_TOP_2',
  CHEF_STORE_TOP_3 = 'CHEF_STORE_TOP_3',
  CHEF_STORE_TOP_4 = 'CHEF_STORE_TOP_4',
  HOMEPAGE_SLIDER = 'HOMEPAGE_SLIDER',
  CHEF_STORE_MIDDLE = 'CHEF_STORE_MIDDLE',
}

interface BannersProps {
  banners: Banner[] | null | undefined;
  position: 'top' | 'middle';
}

export const Banners: React.FC<BannersProps> = ({ banners, position }) => {
  const bannersTopChefStore =
    position === 'top'
      ? banners
          ?.filter((el) => el?.position?.includes('CHEF_STORE_TOP'))
          .sort(
            (a, b) =>
              Number(a?.position?.split('CHEF_STORE_TOP_')[1]) - Number(b?.position?.split('CHEF_STORE_TOP_')[1]),
          )
      : banners?.find((el) => el.position === BannerPositionType.CHEF_STORE_MIDDLE);

  return position === 'top' ? (
    <div className={styles.wrapper}>
      <div className={styles.banners}>
        {Array.isArray(bannersTopChefStore) &&
          bannersTopChefStore?.map((banner, index) => {
            return (
              <a key={banner.id} href={banner.link} className={styles[`banner${index + 1}`]}>
                <img src={banner.image} />
              </a>
            );
          })}
      </div>
    </div>
  ) : (
    <div className={styles.middleBanner}>
      <a href={(bannersTopChefStore as Banner).link}>
        <img src={(bannersTopChefStore as Banner).image} />
        <div className={styles.bannerTextBlock}>
          <p>{(bannersTopChefStore as Banner).title}</p>
          <span>{(bannersTopChefStore as Banner).subTitle}</span>
        </div>
      </a>
    </div>
  );
};
