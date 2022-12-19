import { Chef } from 'redux/ducks/products/types/contracts';
import { Area, EventAddressFormFields, EventAddressUpdate } from 'services/types';
import slugify from 'slugify';

export const createAreaByName = (name: string): Area => {
  return {
    name,
    code: slugify(name).toLocaleLowerCase(),
    cityCode: 'dubai',
  };
};

export function addressNormalizer(address: EventAddressFormFields, chef?: Chef | null): EventAddressUpdate {
  return {
    ...(chef && { chef: { id: chef?.id } }),
    area: createAreaByName(address.area),
    building: address.building,
    street: address.street,
    notes: address.notes,
    city: address.city,
    zoom: address.zoom,
    apartment: address.apartment,
    long: address.location.lng || address.location.long || 55.25,
    lat: address.location.lat,
    images: address?.images?.map((item) => item.url),
  };
}
