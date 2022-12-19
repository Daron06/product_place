import { AutocompleteBlock } from 'components/pages/admin/AutocompleteBlock';
import { IngredientsBlock } from 'components/pages/admin/forms/IngredientsBlock';
import { GeneralInfoBlock } from 'components/pages/admin/GeneralBlock';
import { ProductStatusChangeBlock } from 'components/pages/admin/ProductStatusChangeBlock';
import { SpecificationBlock } from 'components/pages/admin/SpecificationBlock';
import { StaffMenuViewProps } from 'components/pages/admin/staff/menu/type';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DashboardRole } from 'services/types';

import { AdminEditingHeader } from '../../AdminEditingHeader';
import { PreparationTimeBlock } from '../../PreparationTimeBlock';
import { ProductChefInfoBlock } from '../../ProductChefInfoBlock';
import { ProductFlagsBlock } from '../../ProductFlagsBlock';
import { ProductPriceBlock } from '../../ProductPriceBlock';
import { UploadFileBlock } from '../../UploadFileBlock';

export const StaffMenuView: React.FC<StaffMenuViewProps> = ({
  allergens,
  allergensOptions,
  chef,
  chefs,
  cuisine,
  isEditing,
  onSubmit,
  productInfo,
  instruction,
  images,
  status,
  supplier,
  suppliers,
  title,
  role = DashboardRole.STAFF,
  productFlags,
  menuData,
}) => {
  const { watch } = useFormContext();
  const { ingredients: currentIngredients, supplier: currentSupplier } = watch();

  return (
    <div className="p-30">
      <AdminEditingHeader isEditing title={title} onSubmit={onSubmit} isLanguageSelect />
      <div className="adminDataUpsertPageGrid">
        <section className="adminDataUpsertSectionGrid">
          {!isEditing && role === DashboardRole.STAFF && <AutocompleteBlock items={chefs} name="chef" title="Chef" />}
          <AutocompleteBlock items={suppliers} name="supplier" title="Cloud kitchen" value={supplier} />
          <IngredientsBlock disabled={!currentSupplier} items={suppliers} marginZero />
          <GeneralInfoBlock
            images={images}
            cuisine={cuisine}
            disabled={!currentIngredients?.length}
            marginZero
            isLanguageSelect
            itemData={menuData}
          />
          <SpecificationBlock
            allergens={allergens}
            allergensOptions={allergensOptions}
            productInfo={productInfo}
            disabled={!currentIngredients?.length}
            marginZero
          />
        </section>
        <aside className="adminDataUpsertAsideGrid">
          {role === DashboardRole.STAFF && (
            <>
              <ProductStatusChangeBlock value={status} marginZero />
              {isEditing && role === DashboardRole.STAFF && (
                <ProductChefInfoBlock image={chef?.image} name={chef?.name} marginZero />
              )}
              <ProductPriceBlock
                name="chefPrice"
                subtitle="Specify the price of the product including the chef's commission"
                title="Chef price"
                marginZero
              />
              <ProductPriceBlock
                name="supplierPrice"
                subtitle="Specify the price of the product including the chef's commission"
                title="Cloud Kitchen cost"
                marginZero
              />
              <ProductPriceBlock name="price" title="Set a selling price" marginZero />
              <PreparationTimeBlock
                subtitle="Pick Up / Collecting time for Delivery Agent"
                name="preparationTime"
                title="Order processing time"
              />
              <ProductFlagsBlock productFlags={productFlags} />
            </>
          )}
          <UploadFileBlock instruction={instruction} marginZero />
        </aside>
      </div>
    </div>
  );
};
