import { AdminEditingHeader } from 'components/pages/admin/AdminEditingHeader';
import { AutocompleteBlock } from 'components/pages/admin/AutocompleteBlock';
import { IngredientsBlock } from 'components/pages/admin/forms/IngredientsBlock';
import { GeneralInfoBlock } from 'components/pages/admin/GeneralBlock';
import { IngredientsListProps } from 'components/pages/admin/IngredientsList/IngredientsList';
import { ProductChefInfoBlock } from 'components/pages/admin/ProductChefInfoBlock';
import { ProductPriceBlock } from 'components/pages/admin/ProductPriceBlock';
import {
  ProductStatusChangeBlock,
  ProductStatusChangeBlockProps,
} from 'components/pages/admin/ProductStatusChangeBlock';
import { RecipeStep } from 'components/pages/admin/RecipeSteps/types';
import { SpecificationBlock, SpecificationBlockProps } from 'components/pages/admin/SpecificationBlock';
import { SummaryDetailsList } from 'components/pages/admin/SummaryDetailsList';
import { UploadFileBlock, UploadFileBlockProps } from 'components/pages/admin/UploadFileBlock';
import { UploadedImage } from 'components/pages/admin/UploadImages/types';
import { Rating } from 'components/Rating';
import React from 'react';
import { useFormContext, UseFormMethods } from 'react-hook-form';
import { ImmutableDirectoriesState } from 'redux/ducks/directories/types/state';
import { Chef, Cuisine, Product } from 'redux/ducks/products/types/contracts';
import { AdminProductSummary, DashboardRole, RequiredType, Supplier } from 'services/types';

import { AddMasterclassBlock } from '../../AddMasterclassBlock';
import { PreparationTimeBlock, PreparationTimeBlockProps } from '../../PreparationTimeBlock';
import { ProductFlagsBlock, ProductFlagsBlockProps } from '../../ProductFlagsBlock';
import { ProductAccessBlock } from '../../ProductsAccessBlock';
import { RecipeStepsBlock } from '../../RecipeStepsBlock';
import { RequiredBlock } from '../../RequiredBlock';

interface StaffRecipeEditViewProps {
  allergens: SpecificationBlockProps['allergens'];
  role?: DashboardRole;
  allergensOptions: SpecificationBlockProps['allergensOptions'];
  chef?: Chef;
  chefs?: ImmutableDirectoriesState['data']['chefs'];
  cuisine?: Cuisine['id'];
  description: string;
  ingredients?: Readonly<IngredientsListProps['items']>;
  instruction?: UploadFileBlockProps['instruction'];
  images?: UploadedImage[];
  isEditing?: boolean;
  onSubmit: ReturnType<UseFormMethods['handleSubmit']>;
  productInfo: SpecificationBlockProps['productInfo'];
  required?: RequiredType[];
  supplier?: Supplier;
  suppliers?: ImmutableDirectoriesState['data']['suppliers'];
  status?: ProductStatusChangeBlockProps['value'];
  steps?: RecipeStep[];
  title: string;
  onMasterClassChecked: (value?: boolean) => void;
  masterClassChecked: boolean;
  chefId?: string;
  masterClassId?: string;
  summary?: AdminProductSummary;
  preparationTime?: PreparationTimeBlockProps['value'];
  productFlags?: ProductFlagsBlockProps['productFlags'];
  recipeData?: Product | null;
}

export const StaffRecipeEditView: React.FC<StaffRecipeEditViewProps> = ({
  allergens,
  allergensOptions,
  chef,
  chefs,
  cuisine,
  onSubmit,
  productInfo,
  instruction,
  images,
  isEditing,
  required,
  status,
  steps,
  supplier,
  suppliers,
  onMasterClassChecked,
  masterClassChecked,
  title,
  chefId,
  masterClassId,
  role = DashboardRole.STAFF,
  summary,
  productFlags,
  recipeData,
}): React.ReactElement => {
  const { watch } = useFormContext();
  const { ingredients: currentIngredients, supplier: currentSupplier } = watch();

  const filteredSuppliers = suppliers?.filter((item) => item.ingredients.length);

  return (
    <div className="p-30">
      <AdminEditingHeader isEditing title={title} onSubmit={onSubmit} isLanguageSelect />
      <div className="adminDataUpsertPageGrid">
        <section className="adminDataUpsertSectionGrid">
          {!isEditing && role === DashboardRole.STAFF && <AutocompleteBlock items={chefs} name="chef" title="Chef" />}
          <AutocompleteBlock items={filteredSuppliers} name="supplier" value={supplier} title="Supplier" />
          <IngredientsBlock disabled={!currentSupplier} items={filteredSuppliers} marginZero />
          <GeneralInfoBlock
            cuisine={cuisine}
            images={images}
            disabled={!currentIngredients?.length}
            marginZero
            isLanguageSelect
            itemData={recipeData}
          />
          <SpecificationBlock
            allergens={allergens}
            allergensOptions={allergensOptions}
            productInfo={productInfo}
            disabled={!currentIngredients?.length}
            marginZero
          />
          <RecipeStepsBlock steps={steps} disabled={!currentIngredients?.length} marginZero />
          <RequiredBlock required={required} disabled={!currentIngredients?.length} marginZero />
        </section>
        <aside>
          <ProductAccessBlock title="Access to recipe" marginZero />
          <AddMasterclassBlock
            masterClassChecked={masterClassChecked}
            onMasterClassChecked={onMasterClassChecked}
            chefId={chefId}
            masterClassId={masterClassId}
            role={role}
            chefStatus={chef?.status}
          />
          {role === DashboardRole.STAFF && (
            <>
              <ProductStatusChangeBlock value={status} marginZero />
              {isEditing && <ProductChefInfoBlock image={chef?.image} name={chef?.name} marginZero />}

              <ProductPriceBlock
                name="chefPrice"
                subtitle="Specify the price of the product including the chef's commission"
                title="Chef"
                marginZero
              />
              <ProductPriceBlock
                name="supplierPrice"
                subtitle="Specify the price of the product including the chef's commission"
                title="Supplier cost"
                marginZero
              />
              <ProductPriceBlock
                name="price"
                subtitle="Specify the price of the product including the chef's commission"
                title="unknown Price"
                marginZero
              />
              <PreparationTimeBlock
                subtitle="Pick Up / Collecting time for Delivery Agent"
                name="preparationTime"
                title="Order processing time"
              />
              <ProductFlagsBlock productFlags={productFlags} />
            </>
          )}
          <UploadFileBlock instruction={instruction} marginZero />
          {summary && (
            <SummaryDetailsList
              title="Summary"
              items={[
                {
                  name: 'Customer rating',
                  value: <Rating value={summary.rating} />,
                },
                {
                  name: 'Reviews',
                  value: <b className="fontBold text-secondary">{summary.reviews}</b>,
                },
                {
                  name: '# of orders',
                  value: <b className="fontBold text-secondary">{summary.orders}</b>,
                },
                { name: 'Your Income', value: <b>{summary.chefIncome || 0} AED</b> },
              ]}
            />
          )}
        </aside>
      </div>
    </div>
  );
};
