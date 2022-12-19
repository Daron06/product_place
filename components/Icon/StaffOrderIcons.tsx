import StaffChefTableIcon from 'assets/icons/staff-orders/cheftable.svg';
import StaffMasterClassIcon from 'assets/icons/staff-orders/masterclass.svg';
import StaffMenuIcon from 'assets/icons/staff-orders/menu.svg';
import StaffRecipeIcon from 'assets/icons/staff-orders/recipe.svg';
import StaffStoreIcon from 'assets/icons/staff-orders/store.svg';
import React from 'react';
import { IconType } from 'services/types';

const icons = {
  menu: StaffMenuIcon,
  masterclass: StaffMasterClassIcon,
  chefTable: StaffChefTableIcon,
  recipe: StaffRecipeIcon,
  chefStore: StaffStoreIcon,
  store: StaffStoreIcon,
} as const;

interface StaffIconProps {
  className?: string;
  type: IconType;
}

export const StaffOrderIcons: React.FC<StaffIconProps> = ({ className, type }): React.ReactElement | null => {
  const IconComponent = icons[type];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
};
