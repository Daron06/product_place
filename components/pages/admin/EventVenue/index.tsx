import { Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styles from 'components/pages/admin/ChefTableUpsert/ChefsTableUpsert.module.scss';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { AdminChefTableUpsertViewProps } from '../ChefTableUpsert/types';

export interface EventVenueProps {
  type: AdminChefTableUpsertViewProps['productType'];
}

export const EventVenue: React.FC<EventVenueProps> = ({ type }) => {
  const { control } = useFormContext();
  const {
    field: { ref, onChange, value, name },
  } = useController({
    name: 'type',
    control,
  });

  return (
    <WhiteBlock className="p-20">
      <Typography className={styles.blockTitle} variant="h6">
        Type
      </Typography>
      <RadioGroup
        value={String(value)}
        name={name}
        ref={ref}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
          onChange((event.target as HTMLInputElement).value)
        }
      >
        <FormControlLabel
          value="at-restaurant"
          control={<Radio />}
          label={type === 'chefTable' ? 'At chef’s Location' : 'In-Person'}
        />
        <FormControlLabel
          value="at-home"
          control={<Radio />}
          label={type === 'chefTable' ? 'At customer home' : 'Online'}
        />
        {type === 'masterClass' && <FormControlLabel value="recorded" control={<Radio />} label="Recorded" />}
      </RadioGroup>
    </WhiteBlock>
  );
};
