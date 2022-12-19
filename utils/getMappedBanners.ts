import { Banner } from '../services/types';

type ReturnProps = {
  top?: Banner[];
  center?: Banner[];
};

const getPosition = (position: Banner['position']): string => {
  return position.includes('TOP') ? 'top' : 'center';
};

export const getMappedBanners = (banners: Banner[]): ReturnProps => {
  return banners.reduce(
    (prev, banner) => {
      const key = getPosition(banner.position);

      return {
        ...prev,
        [key]: [...prev[key], banner],
      };
    },
    {
      center: [],
      top: [],
    } as ReturnProps,
  );
};
