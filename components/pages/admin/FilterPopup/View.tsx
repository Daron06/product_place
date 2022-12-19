import { Button, Popover, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import chipStyles from '../../../Chip/Chip.module.scss';
import { Icon } from '../../../Icon';
import { Select } from '../../../Select';
import adminProductsStyles from '../Products/AdminProducts.module.scss';
import styles from './FilterPopup.module.scss';
import { StatusFilter } from './filters/Status';

interface FilterPopupViewProps {
  toggleOpenPopup: (event: React.MouseEvent<HTMLButtonElement>) => void;
  anchorEl: HTMLButtonElement | null;
  open: boolean;
  filterItems: string[];
  selectedFilter: string | undefined;
  onSelectFilter: (filter: string) => void;
}

const filterComponent = {
  status: <StatusFilter />,
};

export const FilterPopupView: React.FC<FilterPopupViewProps> = ({
  toggleOpenPopup,
  anchorEl,
  open,
  filterItems,
  selectedFilter,
  onSelectFilter,
}): React.ReactElement => {
  return (
    <>
      <Button
        onClick={toggleOpenPopup}
        classes={{ root: adminProductsStyles.rootFilterButton }}
        startIcon={
          <div className={adminProductsStyles.buttonIcon}>
            <Icon type="filter" />
          </div>
        }
        variant="outlined"
      >
        Filter
      </Button>
      <Popover
        classes={{
          paper: styles.filterPopup,
        }}
        onClose={toggleOpenPopup}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
      >
        <div className="content pl-25 pt-15 pr-25 pb-25">
          <Typography variant="overline" display="block" gutterBottom>
            <b>Filter</b>
          </Typography>
          <Select
            items={filterItems.map((val) => ({
              name: val,
              value: val.toLowerCase(),
            }))}
            placeholder="Select filter..."
            onChange={(event): void => onSelectFilter(event.target.value as string)}
            value={selectedFilter}
          />
          {selectedFilter && filterComponent[selectedFilter]}
        </div>

        {selectedFilter && (
          <div className={clsx('d-flex align-items-center justify-content-between', chipStyles.popoverFooter)}>
            <button type="button" className={clsx(chipStyles.button, chipStyles.buttonClear)}>
              Clear
            </button>
            <Button
              color="primary"
              classes={{ root: chipStyles.button, label: chipStyles.buttonLabel }}
              variant="contained"
            >
              Apply
            </Button>
          </div>
        )}
      </Popover>
    </>
  );
};
