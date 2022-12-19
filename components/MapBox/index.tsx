import { Loader } from '@googlemaps/js-api-loader';
import clsx from 'clsx';
import React from 'react';

import formFieldStyles from '../FormField/FormField.module.scss';
import styles from './MapBox.module.scss';

export type LatLng = { lat: number; lng: number; zoom?: number };

export interface MapBoxProps {
  onChange?: (data: LatLng & { long?: number }) => void;
  defaultValue?: { lat: string | number; lng: string | number };
  placeholder?: string;
}

const defaultCenter = {
  lat: 25.2,
  lng: 55.25,
};

export const MapBox: React.FC<MapBoxProps> = ({
  onChange,
  placeholder = 'Find your address',
  defaultValue = defaultCenter,
}) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyA6aKCVDxEL1hRbwlzhh8bhgChrTofAMPE',
      version: 'weekly',
      libraries: ['places', 'geometry'],
      language: 'en',
      region: 'UAE',
    });

    const center = {
      lat: Number(defaultValue.lat) || defaultCenter.lat,
      lng: Number(defaultValue.lng) || defaultCenter.lng,
    };

    const dubaiBounds = { north: 25.38, east: 55.71, south: 24.26, west: 54.38 };

    loader
      .load()
      .then((google) => {
        let zoom = 13;
        if (mapRef.current && inputRef.current) {
          const mapOptions: google.maps.MapOptions = {
            center,
            zoom,
            mapTypeId: 'roadmap',
            mapTypeControl: null,
            streetViewControl: false,
          };

          const autocompleteOptions = {
            bounds: dubaiBounds,
            types: ['establishment'],
            componentRestrictions: { country: 'AE' },
            strictBounds: true,
          };

          const map = new google.maps.Map(mapRef.current, mapOptions);
          map.fitBounds(dubaiBounds);
          map.panTo(center);

          const searchBox = new google.maps.places.Autocomplete(inputRef.current, autocompleteOptions);

          map.addListener('bounds_changed', () => {
            const bounds = map.getBounds();
            if (bounds) {
              searchBox.setBounds(bounds);
            }
          });

          let lastMarker: google.maps.Marker = new google.maps.Marker({
            position: center,
            draggable: true,
            map,
          });

          // eslint-disable-next-line no-inner-declarations
          function markerChangePosition(evt) {
            onChange?.({
              lat: evt.latLng.lat(),
              lng: evt.latLng.lng(),
              long: evt.latLng.lng(),
              zoom: map.getZoom(),
            });
            map.panTo(evt.latLng);
          }

          let markerListener = google.maps.event.addListener(lastMarker, 'dragend', markerChangePosition);

          searchBox.addListener('place_changed', () => {
            const place = searchBox.getPlace();

            lastMarker.setMap(null);

            const bounds = new google.maps.LatLngBounds();

            if (!place.geometry || !place.geometry.location) {
              console.warn('Returned place contains no geometry');
              return;
            }

            markerListener.remove();

            lastMarker = new google.maps.Marker({
              map,
              title: place.name,
              position: place.geometry.location,
              draggable: true,
            });

            markerListener = google.maps.event.addListener(lastMarker, 'dragend', markerChangePosition);

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
            map.fitBounds(bounds);

            const geo = lastMarker?.getPosition()?.toJSON();

            if (geo) {
              if (onChange) {
                onChange({ ...geo, long: geo.lng, zoom });
              }
            }
          });

          google.maps.event.addListener(map, 'zoom_changed', () => {
            zoom = map.getZoom() || zoom;
          });
        }
      })
      .catch((e) => {
        console.warn('map', e);
      });
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} />
      <input
        ref={inputRef}
        className={clsx(formFieldStyles.field, onChange && styles.googleMapSearchInput)}
        placeholder={placeholder}
      />
    </div>
  );
};
