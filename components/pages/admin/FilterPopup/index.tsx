import React from 'react';

import { FilterPopupView } from './View';

const filterItems: string[] = [
  'Product',
  'Price',
  'Cuisine',
  'Allergies',
  'Your commission',
  'Master class',
  'Status',
  'Calories',
  'Fat',
];

export const FilterPopup = (): React.ReactElement => {
  const [selectedFilter, setSelectedFilter] = React.useState<string>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  const toggleOpenPopup = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <FilterPopupView
      anchorEl={anchorEl}
      filterItems={filterItems}
      onSelectFilter={(filter): void => setSelectedFilter(filter)}
      selectedFilter={selectedFilter}
      toggleOpenPopup={toggleOpenPopup}
      open={open}
    />
  );
};
