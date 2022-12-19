import clsx from 'clsx';
import { Icon } from 'components/Icon';
import React from 'react';
import SlickSlider, { Settings } from 'react-slick';

import styles from './Slider.module.scss';

interface SliderProps {
  children: React.ReactNode | React.ReactElement[];
  fullLink?: string;
  sliderSettings?: Settings;
  autoPlaySpeed?: number;
}

interface SliderArrowProps {
  onClick?: () => void;
  type: string;
  className?: string;
}

const settings = {
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        dots: true,
        dotsClass: 'mobileSliderDots',
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        dots: true,
        dotsClass: 'mobileSliderDots',
      },
    },
  ],
};

const Arrow = (props: SliderArrowProps): React.ReactElement => {
  const { onClick, type, className } = props;
  return (
    <button
      className={clsx(styles.sliderArrow, type === 'left' && styles.sliderArrowLeft, className)}
      onClick={onClick}
      type="button"
      aria-label={`Slider Arrow ${type}`}
      disabled={className?.includes('disabled')}
    >
      <Icon type="chevron-right" />
    </button>
  );
};

export const Slider = React.forwardRef<SlickSlider, SliderProps>(function Slider(
  { children, fullLink, sliderSettings, autoPlaySpeed }: SliderProps,
  ref,
): React.ReactElement {
  return (
    <div className={styles.sliderWrapper}>
      {fullLink && (
        <div
          className={clsx(styles.sliderFullLink, {
            [styles.sliderFullLinkRightAlign]: (children as React.ReactElement[])?.length <= 3,
          })}
        />
      )}
      <SlickSlider
        className={clsx({ [styles.slider]: Boolean(fullLink) })}
        swipe={false}
        slidesToShow={4}
        prevArrow={<Arrow type="left" />}
        nextArrow={<Arrow type="right" />}
        autoplaySpeed={autoPlaySpeed}
        autoplay={!!autoPlaySpeed}
        infinite
        {...settings}
        {...sliderSettings}
        ref={ref}
      >
        {children}
      </SlickSlider>
    </div>
  );
});
