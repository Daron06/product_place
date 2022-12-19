import { yupResolver } from '@hookform/resolvers/yup';
import { useAlert } from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Chef } from 'redux/ducks/products/types/contracts';
import { selectUserData } from 'redux/ducks/user/selectors';
import { DashboardRole, ProductFormFields } from 'services/types';

import { selectDirectoriesData } from '../../../../redux/ducks/directories/selectors';
import { AdminProductsApi } from '../../../../services/api/admin/ProductsApi';
import { AdminEndpoints } from '../../../../services/api/endpoints';
import { productParametersNormalizer } from '../../../../utils/normalizers/ProductParametersNormalizer';
import { CreateRecipeFormSchema } from '../../../../utils/validationSchemas/admin/createRecipeSchema';
import { StaffRecipeEditView } from '../staff/recipe/View';
import { RecipeCreateFieldsProps, RecipeCreateProps } from './types';

export const RecipeCreate: React.FC<RecipeCreateProps> = ({
  recipeData,
  role = DashboardRole.CHEF,
  title,
  isEditing,
  summary,
}) => {
  const router = useRouter();
  const [masterClassChecked, setMasterClassChecked] = React.useState(false);
  const { openAlert } = useAlert();
  const { suppliers, allergens: allergensOptions, chefs } = useSelector(selectDirectoriesData);
  const form = useForm<RecipeCreateFieldsProps>({
    mode: 'onChange',
    resolver: yupResolver(CreateRecipeFormSchema),
    defaultValues: {
      name: recipeData?.name,
      description: recipeData?.description,
      calories: String(recipeData?.productInfo?.calories),
      proteins: String(recipeData?.productInfo?.proteins),
      fat: String(recipeData?.productInfo?.fat),
      carbs: String(recipeData?.productInfo?.carbs),
      supplier: recipeData?.supplier,
      allergens: recipeData?.allergens,
      media: recipeData?.media,
      isFree: recipeData?.isFree.toString() ?? 'true',
      cuisine: recipeData?.cuisine,
      instruction: recipeData?.instruction || '',
      ingredients: recipeData?.ingredients || [],
      required: recipeData?.required || [],
      steps: recipeData?.steps || [],
      video: recipeData?.video || null,
      product: recipeData?.product?.id || '',
    },
  });
  const userData = useSelector(selectUserData);
  const masterClassId = form.watch('product');
  const chefId: Chef = form.watch('chef');
  const onSubmit = async (formFields: ProductFormFields): Promise<void> => {
    try {
      let data = productParametersNormalizer(formFields);

      data = { ...data, product: masterClassChecked && masterClassId ? { id: masterClassId } : null };

      if (recipeData) {
        await AdminProductsApi.update(AdminEndpoints.RECIPES, recipeData.id, data);
      } else {
        await AdminProductsApi.create(AdminEndpoints.RECIPES, data);
        await router.push(`/admin/${role}/recipes`);
      }
      openAlert('Successfully updated', 'success');
    } catch (err) {
      console.warn('onSubmit menu', err);
    }
  };

  React.useEffect(() => {
    form.register('product');

    if (masterClassId) {
      setMasterClassChecked(true);
    }
  }, []);

  const toggleCheckedMasterClass = (value?: boolean): void => {
    setMasterClassChecked(typeof value !== 'undefined' ? value : (prev): boolean => !prev);
  };

  return (
    <FormProvider {...form}>
      <StaffRecipeEditView
        role={role}
        allergens={recipeData?.allergens}
        allergensOptions={allergensOptions}
        description={recipeData?.description ?? ''}
        chef={recipeData?.chef}
        chefs={chefs}
        cuisine={recipeData?.cuisine?.id}
        ingredients={recipeData?.ingredients}
        instruction={recipeData?.instruction}
        images={recipeData?.media}
        onSubmit={form.handleSubmit(onSubmit)}
        productInfo={recipeData?.productInfo ?? null}
        required={recipeData?.required}
        supplier={recipeData?.supplier}
        suppliers={suppliers}
        status={recipeData?.status}
        steps={recipeData?.steps}
        title={recipeData?.name ?? title ?? ''}
        isEditing={isEditing}
        onMasterClassChecked={toggleCheckedMasterClass}
        masterClassChecked={masterClassChecked}
        chefId={recipeData?.chef?.id || userData?.chef?.id || chefId?.id}
        masterClassId={masterClassId}
        summary={summary}
        recipeData={recipeData}
      />
    </FormProvider>
  );
};
