import React from 'react';
import { useFormContext } from 'react-hook-form';

import { PasswordField } from '../../PasswordField';
import { WhiteBlock } from '../../WhiteBlock/WhiteBlock';

export const PasswordForm: React.FC = () => {
  const { errors, register, getValues } = useFormContext();
  const { password, passwordConfirmation } = getValues();

  return (
    <WhiteBlock title="Password">
      <PasswordField
        label="Password"
        name="password"
        autocomplete="new-password"
        error={errors.password?.message}
        value={password}
        register={register}
      />
      <PasswordField
        label="Confirm password"
        name="passwordConfirmation"
        autocomplete="new-password"
        error={errors.passwordConfirmation?.message}
        value={passwordConfirmation}
        register={register}
      />
    </WhiteBlock>
  );
};
