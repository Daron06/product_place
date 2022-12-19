import { Typography } from '@material-ui/core';
import { RequiredList } from 'components/pages/admin/RequiredList';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Chef } from 'redux/ducks/products/types/contracts';
import { RequiredType } from 'services/types';

interface RequiredBlockProps {
  required?: RequiredType[] | Chef[];
  marginZero?: boolean;
  disabled?: boolean;
  title?: string;
  type?: 'required' | 'chefs';
}

export const RequiredBlock: React.FC<RequiredBlockProps> = ({
  required,
  type = 'required',
  title = 'Appliances & Utensils required',
  marginZero = false,
  disabled = false,
}): React.ReactElement => {
  const { errors, formState, register, setValue } = useFormContext();

  React.useEffect(() => {
    register(type);
    setValue(type, required || [], { shouldValidate: true });
  }, []);

  const handleChangeAutocomplete = (value): void => {
    setValue(type, value, { shouldValidate: true });
  };

  return (
    <div className="mb-20">
      <WhiteBlock marginZero={marginZero} disabled={disabled}>
        <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
          {title}
        </Typography>
        <RequiredList
          type={type}
          onChange={handleChangeAutocomplete}
          error={formState?.isSubmitted ? errors.required?.message : undefined}
          value={required}
        />
      </WhiteBlock>
    </div>
  );
};
