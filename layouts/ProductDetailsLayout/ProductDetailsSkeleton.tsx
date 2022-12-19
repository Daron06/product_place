import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

import styles from './ProductDetailsLayout.module.scss';

export const ProductDetailsSkeleton: React.FC = (): React.ReactElement => {
  return (
    <div className={styles.container}>
      <div className="mb-30">
        <div className="d-flex">
          <Typography component="div" variant="overline">
            <Skeleton width="30px" height="25px" />
          </Typography>
          <div className="ml-10">
            <Typography component="div" variant="overline">
              <Skeleton width="50px" height="25px" />
            </Typography>
          </div>
          <div className="ml-10">
            <Typography component="div" variant="overline">
              <Skeleton width="70px" height="25px" />
            </Typography>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className={styles.slider}>
          <div className="d-flex flex-column">
            <Skeleton width="100%" height={570} variant="rect" className={styles.sliderSkeleton} />
            <div className="d-flex mt-20">
              <Skeleton width={104} height={100} variant="rect" className={styles.thumbSliderSkeleton} />
              <Skeleton width={104} height={100} variant="rect" className={styles.thumbSliderSkeleton} />
              <Skeleton width={104} height={100} variant="rect" className={styles.thumbSliderSkeleton} />
              <Skeleton width={104} height={100} variant="rect" className={styles.thumbSliderSkeleton} />
              <Skeleton width={104} height={100} variant="rect" className={styles.thumbSliderSkeleton} />
            </div>
          </div>
        </div>
        <div className={styles.information}>
          <Typography component="div" variant="h3">
            <Skeleton width="60px" />
          </Typography>
          <Typography component="div" variant="overline" className="mb-10">
            <Skeleton width="60%" height="60px" />
          </Typography>
          <div className="d-flex align-items-center mb-10">
            <Skeleton width="45%" />
            <div className="ml-20 d-flex">
              <Skeleton width="20px" className="ml-10" />
              <Skeleton width="20px" className="ml-10" />
            </div>
          </div>
          <div className="mb-15">
            <Skeleton width={80} height={55} />
          </div>
          <div className="mb-15">
            <Typography component="div" variant="body1" className="mb-20">
              <Skeleton width="70%" height={10} className="mb-10" />
              <Skeleton width="70%" height={10} className="mb-10" />
              <Skeleton width="70%" height={10} className="mb-10" />
            </Typography>
          </div>
          <div className="mb-15">
            <Skeleton width={80} height={30} className="mb-15" />
          </div>
          <div className="mb-15">
            <Skeleton width="100%" height={146} variant="rect" className={styles.notifSkeleton} />
          </div>
          <div className="d-flex align-items-center mb-30">
            <Skeleton width={280} height={48} variant="rect" className={styles.radiusSkeleton16} />
            <div className="ml-10">
              <Skeleton width={40} height={40} variant="rect" className={styles.radiusSkeleton8} />
            </div>
            <div className="ml-10">
              <Skeleton width={40} height={40} variant="rect" className={styles.radiusSkeleton8} />
            </div>
          </div>
          <div className={styles.chefSkeleton}>
            <div className="d-flex">
              <Skeleton animation="wave" variant="circle" width={60} height={60} />
              <div className="d-flex flex-column ml-15">
                <div className="mb-5">
                  <Typography component="div" variant="overline">
                    <Skeleton width="50px" height="10px" />
                  </Typography>
                </div>
                <div className="mb-20">
                  <Typography component="div" variant="overline">
                    <Skeleton width="150px" height="20px" />
                  </Typography>
                </div>
                <Typography component="div" variant="overline">
                  <div className="mb-5">
                    <Skeleton width="250px" height="10px" />
                  </div>
                  <div className="mb-5">
                    <Skeleton width="50%" height="10px" />
                  </div>
                  <div className="mb-5">
                    <Skeleton width="80%" height="10px" />
                  </div>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
