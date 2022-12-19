import { Slider } from 'components/Slider';
import { Immutable } from 'immer';
import React from 'react';
import ReactSlickSlider from 'react-slick';
import { Media } from 'redux/ducks/products/types/contracts';

import styles from './ThumbnailSlider.module.scss';

interface ThumbnailSliderProps {
  items: Immutable<Media[]>;
}

export const ThumbnailSlider: React.FC<ThumbnailSliderProps> = ({ items }): React.ReactElement => {
  const mainSliderRef = React.useRef<ReactSlickSlider>();
  const thumbsSliderRef = React.useRef<ReactSlickSlider>();

  const [mainSlider, setMainSlider] = React.useState<ReactSlickSlider>();
  const [thumbsSlider, setThumbsSlider] = React.useState<ReactSlickSlider>();

  React.useEffect(() => {
    if (mainSliderRef.current) {
      setMainSlider(mainSliderRef.current);
    }

    if (thumbsSliderRef.current) {
      setThumbsSlider(thumbsSliderRef.current);
    }
  }, [mainSliderRef, thumbsSliderRef]);

  return (
    <div className={styles.sliderBlock}>
      <div className={styles.sliderMain}>
        <Slider
          sliderSettings={{
            arrows: false,
            asNavFor: thumbsSlider,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipe: true,
          }}
          ref={mainSliderRef}
        >
          {items.map((item) => (
            <div key={item.id}>
              <div className={styles.mainSlideItem}>
                <img src={item.url} alt={item.name} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {items.length > 1 && (
        <div className={styles.sliderThumbs}>
          <Slider
            sliderSettings={{
              arrows: false,
              asNavFor: mainSlider,
              slidesToShow: 5,
              slidesToScroll: 1,
              variableWidth: true,
              focusOnSelect: true,
              infinite: items.length > 4,
            }}
            ref={thumbsSliderRef}
          >
            {items.map((item) => (
              <div key={item.id} className={styles.slideThumbBox}>
                <div className={styles.slideThumbItem} style={{ backgroundImage: `url(${item.url})` }} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};
