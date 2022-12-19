import { Button } from '@material-ui/core';
import React from 'react';

import { ProfileBackContext } from '../../../layouts/ProfileLayout';
import { Icon } from '../../Icon';
import profileStyles from './Profile.module.scss';

interface ProfileTabTitleProps {
  value: string;
}

export const ProfileTabTitle: React.FC<ProfileTabTitleProps> = ({ value }) => {
  const { onBack } = React.useContext(ProfileBackContext);

  return (
    <h2>
      <Button onClick={onBack} className={profileStyles.backButton} variant="contained">
        <Icon type="arrow-left" />
      </Button>
      {value}
    </h2>
  );
};
