import { Color } from '@material-ui/lab/Alert/Alert';
import { MapboxEvent } from 'mapbox-gl';
import React from 'react';

export declare global {
  interface Window {
    mapboxgl: MapboxEvent;
    ClassicEditor: any;
    MapboxGeocoder: any;
    notify: {
      open: (text: React.ReactNode, status: Color = 'info') => void;
      close: () => void;
    };
  }
}
