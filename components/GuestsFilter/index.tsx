import ClearIcon from '@material-ui/icons/Clear';
import { Chip } from 'components/Chip';
import { PeopleCounter } from 'components/PeopleCounter';
import React from 'react';

import styles from './GuestsFilter.module.scss';

interface GuestsFilterProps {
  disabled: boolean;
  onApply: (guests: { [k: string]: number }) => void;
  onReset: () => void;
}

const initialGuests = {
  adults: 0,
};

export const GuestsFilter: React.FC<GuestsFilterProps> = ({ disabled, onApply, onReset }): React.ReactElement => {
  const [filterApplied, setFilterApplied] = React.useState(false);
  const [guests, setGuests] = React.useState<{ [k: string]: number }>(initialGuests);

  const handleApplyFilter = (data: { [k: string]: number }): void => {
    setFilterApplied(true);
    onApply(data);
  };

  const handleFilterReset = (): void => {
    setGuests(initialGuests);
    onReset();
    setFilterApplied(false);
  };

  const disableApplyBtn = Boolean(guests?.adults);

  return (
    <Chip
      deleteIcon={<ClearIcon />}
      disabled={disabled}
      label="Select guests"
      color={filterApplied ? 'primary' : 'default'}
      popoverTitle="Guests"
      popovered
      disableApplyButton={!disableApplyBtn}
      classes={{ root: styles.root }}
      onApply={(): void => handleApplyFilter(guests)}
      onClear={filterApplied ? handleFilterReset : undefined}
    >
      <PeopleCounter guests={guests} onChange={setGuests} minusIsDisabled={false} />
    </Chip>
  );
};
