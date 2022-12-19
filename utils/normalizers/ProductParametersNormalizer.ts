import isNull from 'lodash/isNull';
import omitBy from 'lodash/omitBy';

import { Address, ProductFields, ProductFormFields } from '../../services/types';

const getProductInfo = (
  calories: number | undefined,
  fat: number | undefined,
  proteins: number | undefined,
  carbs: number | undefined,
): ProductFields['productInfo'] | undefined => {
  if (calories || fat || proteins || carbs) {
    return {
      calories: calories ? Number(calories) : undefined,
      fat: fat ? Number(fat) : undefined,
      proteins: proteins ? Number(proteins) : undefined,
      carbs: carbs ? Number(carbs) : undefined,
    };
  }
  return undefined;
};

type ProductParametersNormalizerReturnType = Omit<
  ProductFormFields,
  'address' & Omit<Address, 'building_number' | 'long'> & { building: string; lng: string }
>;

export const productParametersNormalizer = (formFields: ProductFormFields): ProductParametersNormalizerReturnType => {
  return {
    ...omitBy<ProductFields>(
      {
        allergens:
          formFields.allergens?.map((obj) => ({
            id: obj.id,
            name: obj.name,
            slug: obj.slug,
          })) || [],
        cuisine: formFields.cuisine
          ? {
              id: formFields.cuisine?.id,
              name: formFields.cuisine?.name,
              slug: formFields.cuisine?.slug,
            }
          : null,
        chefPrice: formFields?.chefPrice ?? '',
        chef: formFields?.chef ?? null,
        dates: formFields?.dates ?? [],
        isFree: formFields?.isFree,
        description: formFields.description,
        shortDescription: formFields.shortDescription || '',
        instruction: formFields.instruction === '' ? '' : formFields.instruction,
        ingredients: formFields.ingredients || [],
        media: formFields.media.map((obj) => ({
          url: obj.url,
          name: obj.name,
        })),
        msrpPrice: formFields?.msrpPrice,
        name: formFields.name,
        price: formFields.price ?? null,
        productInfo: getProductInfo(formFields?.calories, formFields.fat, formFields.proteins, formFields.carbs),
        required: formFields.required || [],
        supplierPrice: formFields?.supplierPrice ?? '',
        vimeoUrl: formFields?.vimeoUrl,
        chatFileUrl: formFields?.chatFileUrl,
        supplier: formFields.supplier
          ? {
              id: formFields.supplier?.id ?? '',
              name: formFields.supplier?.name ?? '',
              slug: formFields.supplier?.slug ?? '',
            }
          : null,
        status: formFields?.status,
        steps: formFields.steps || [],
        additionalInfo: { ...formFields.additionalInfo, preparationTime: formFields.preparationTime },
        address: formFields.address,
        menuOptions: formFields?.menuOptions,
      },
      isNull,
    ),
    video: formFields?.video?.url ? { url: formFields?.video?.url || null, id: formFields?.video?.id || null } : null,
  } as Required<ProductFields>;
};
