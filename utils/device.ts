export enum CurrentDevice {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
}

interface RangeInterface {
  min: number;
  max: number;
}

interface DeviceRanges {
  [CurrentDevice.MOBILE]: RangeInterface;
  [CurrentDevice.TABLET]: RangeInterface;
  [CurrentDevice.DESKTOP]: RangeInterface;
}

export const breakPoints = {
  smMin: '320px',
  smMax: '760px',
  mdMin: '761px',
  mdMax: '999px',
  lgMin: '1000px',
  lgMax: '1239px',
  xlMin: '1240px',
};

const deviceRanges: DeviceRanges = {
  [CurrentDevice.MOBILE]: { min: parseInt(breakPoints.smMin, 10), max: parseInt(breakPoints.smMax, 10) },
  [CurrentDevice.TABLET]: { min: parseInt(breakPoints.mdMin, 10), max: parseInt(breakPoints.mdMax, 10) },
  [CurrentDevice.DESKTOP]: { min: parseInt(breakPoints.lgMin, 10), max: Infinity },
};

const withMediaQueries = typeof window !== 'undefined' && !!window.matchMedia;

export const isMobile = withMediaQueries
  ? window.matchMedia(
      `(min-width: ${deviceRanges[CurrentDevice.MOBILE].min}px) and (max-width: ${
        deviceRanges[CurrentDevice.MOBILE].max
      }px)`,
    ).matches
  : undefined;

export const isTable = withMediaQueries
  ? window.matchMedia(
      `(min-width: ${deviceRanges[CurrentDevice.TABLET].min}px) and (max-width: ${
        deviceRanges[CurrentDevice.TABLET].max
      }px)`,
    ).matches
  : undefined;

export const isDesktop = withMediaQueries
  ? window.matchMedia(`(min-width: ${deviceRanges[CurrentDevice.DESKTOP].min}px)`).matches
  : undefined;
