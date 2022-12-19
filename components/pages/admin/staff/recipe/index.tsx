import { yupResolver } from '@hookform/resolvers/yup';
import { useAlert } from 'hooks/useAlert';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectDirectoriesData } from 'redux/ducks/directories/selectors';
import { Product } from 'redux/ducks/products/types/contracts';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { AdminEndpoints } from 'services/api/endpoints';
import { ProductFormFields } from 'services/types';
import { productParametersNormalizer } from 'utils/normalizers/ProductParametersNormalizer';
import { StaffEditRecipeFormSchema } from 'utils/validationSchemas/admin/staffEditRecipeFormSchema';

import { StaffRecipeEditView } from './View';

interface StuffRecipeEditProps {
  recipe: Product | null;
}

export const StaffRecipeEdit: React.FC<StuffRecipeEditProps> = ({ recipe }): React.ReactElement => {
  const [masterClassChecked, setMasterClassChecked] = React.useState(false);

  const { allergens: allergensOptions, suppliers } = useSelector(selectDirectoriesData);
  const { openAlert } = useAlert();
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(StaffEditRecipeFormSchema),
    defaultValues: {
      allergens: recipe?.allergens,
      calories: String(recipe?.productInfo?.calories),
      carbs: String(recipe?.productInfo?.carbs),
      chefPrice: recipe?.chefPrice,
      cuisine: recipe?.cuisine,
      description: recipe?.description,
      fat: String(recipe?.productInfo?.fat),
      ingredients: recipe?.ingredients || [],
      instruction: recipe?.instruction || '',
      msrpPrice: recipe?.msrpPrice,
      media: recipe?.media,
      name: recipe?.name,
      proteins: String(recipe?.productInfo?.proteins),
      price: String(recipe?.price),
      required: recipe?.required || [],
      status: recipe?.status,
      supplier: recipe?.supplier,
      steps: recipe?.steps || [],
      supplierPrice: recipe?.supplierPrice ?? '',
      isFree: recipe?.isFree.toString() ?? 'true',
      video: recipe?.video || '',
      product: recipe?.product?.id || '',
      preparationTime: recipe?.additionalInfo?.preparationTime,
      productFlags: recipe?.additionalInfo?.productFlags,
    },
  });

  const masterClassId = form.watch('product');

  React.useEffect(() => {
    // Did this because this value is required, on the backend
    form.register('msrpPrice');
    form.register('product');

    if (masterClassId) {
      setMasterClassChecked(true);
    }
  }, []);

  const onSubmit = async (formFields: ProductFormFields): Promise<void> => {
    if (!recipe) {
      throw new Error('The recipe data is undefined');
    }

    let data = productParametersNormalizer(formFields);

    data = { ...data, product: masterClassChecked && masterClassId ? { id: masterClassId } : undefined };

    try {
      await AdminProductsApi.update(AdminEndpoints.RECIPES, recipe.id, data);
      openAlert('Successfully updated', 'success');
    } catch (error) {
      openAlert('An error has occurred', 'error');
      console.warn('onSubmit menu', error);
    }
  };

  const toggleCheckedMasterClass = (value?: boolean): void => {
    setMasterClassChecked(typeof value !== 'undefined' ? value : (prev): boolean => !prev);
  };

  return (
    <FormProvider {...form}>
      <StaffRecipeEditView
        allergens={recipe?.allergens}
        allergensOptions={allergensOptions}
        description={recipe?.description ?? ''}
        chef={recipe?.chef}
        cuisine={recipe?.cuisine?.id}
        ingredients={recipe?.ingredients}
        instruction={recipe?.instruction}
        images={recipe?.media}
        isEditing
        onSubmit={form.handleSubmit(onSubmit)}
        productInfo={recipe?.productInfo ?? null}
        required={recipe?.required}
        supplier={recipe?.supplier}
        suppliers={suppliers}
        status={recipe?.status}
        steps={recipe?.steps}
        title={recipe?.name ?? 'New Recipe'}
        onMasterClassChecked={toggleCheckedMasterClass}
        masterClassChecked={masterClassChecked}
        chefId={recipe?.chef?.id}
        masterClassId={masterClassId}
        productFlags={recipe?.additionalInfo?.productFlags}
        recipeData={recipe}
      />
    </FormProvider>
  );
};
