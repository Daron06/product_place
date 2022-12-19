import { useProductDetails } from 'hooks/useProductDetails';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { Endpoints } from 'services/api/endpoints';

import { MenuDetailsView } from './View';

interface MenuDetailsProps {
  initialMenuItem: Product | null;
}

export const MenuDetails: React.FC<MenuDetailsProps> = ({ initialMenuItem }): React.ReactElement => {
  const productDetails = useProductDetails(initialMenuItem, Endpoints.PRODUCT_MENU);

  return <MenuDetailsView loading={productDetails.isLoading} menuItem={productDetails.data} />;
};
