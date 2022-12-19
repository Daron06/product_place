import Skeleton from '@material-ui/lab/Skeleton';
import { Slider } from 'components/Slider';
import React from 'react';
import { Media } from 'redux/ducks/products/types/contracts';

import styles from './CoverPhoto.module.scss';

interface CoverPhotoProps {
  imageSrc: Media[];
  loading: boolean;
  height?: string;
}

const getSlidesToShow = (length: number): number => {
  if (length === 1 || length === 2) {
    return length;
  }
  return 3;
};

export const CoverPhoto: React.FC<CoverPhotoProps> = ({
  imageSrc,
  height = '400px',
  loading = true,
}): React.ReactElement => {
  if (loading) {
    return <Skeleton animation="wave" variant="rect" height={height} />;
  }

  if (imageSrc.length === 1) {
    return (
      <div className={styles.profileCoverPhoto} style={{ height }}>
        <img src={`${imageSrc[0].url}?width=900&height=800`} alt={imageSrc[0].name} />
      </div>
    );
  }

  return (
    <div className={styles.coverSliderWrapper}>
      <Slider
        sliderSettings={{
          arrows: true,
          infinite: true,
          className: styles.chefsTableSlider,
          slidesToShow: getSlidesToShow(imageSrc.length),
          slidesToScroll: 1,
          swipe: true,
          variableWidth: false,
        }}
      >
        {imageSrc?.map((item) => (
          <div className={styles.sliderItem} key={item.id}>
            <img src={`${item.url}?width=900&height=800`} alt={item.name} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
