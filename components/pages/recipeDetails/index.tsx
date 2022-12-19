import { RecipeDetailsView } from 'components/pages/recipeDetails/View';
import { useProductDetails } from 'hooks/useProductDetails';
import { castDraft } from 'immer';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { Endpoints } from 'services/api/endpoints';

interface RecipeDetailsProps {
  initialRecipeDetails: Product | null;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ initialRecipeDetails }): React.ReactElement => {
  const productDetails = useProductDetails(initialRecipeDetails, Endpoints.PRODUCT_RECIPES);

  return <RecipeDetailsView recipe={castDraft(productDetails.data)} loading={productDetails.isLoading} />;
};
