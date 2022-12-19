import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import CustomPhoneInput from 'components/CustomPhoneInput';
import { FormField } from 'components/FormField';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import ProfileDate from '../../../../../ProfileDate';

export const AboutCustomer: React.FC = () => {
  const { control, register, errors } = useFormContext();
  const {
    field: { ref, onChange: onGenderChange, value, name },
  } = useController({
    name: 'gender',
    control,
  });

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onGenderChange((event.target as HTMLInputElement).value);
  };

  return (
    <WhiteBlock>
      <FormField label="First Name" name="firstName" register={register} error={errors.name?.message} />
      <FormField label="Last Name" name="lastName" register={register} error={errors.lastName?.message} />
      <FormField label="Email" name="email" register={register} error={errors.email?.message} />
      <CustomPhoneInput label="Phone" name="phone" />
      <ProfileDate />
      <FormControl component="fieldset">
        <Typography className="fw-600 fz-large-13" variant="caption">
          Gender
        </Typography>
        <RadioGroup aria-label="gender" name={name} onChange={handleGenderChange} ref={ref} value={value}>
          <div className="d-flex align-items-center">
            <FormControlLabel classes={{ label: 'fz-large-14' }} value="female" control={<Radio />} label="Female" />
            <FormControlLabel classes={{ label: 'fz-large-14' }} value="male" control={<Radio />} label="Male" />
          </div>
        </RadioGroup>
      </FormControl>
    </WhiteBlock>
  );
};
