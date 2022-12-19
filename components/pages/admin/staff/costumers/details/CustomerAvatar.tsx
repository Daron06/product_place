import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';

import { AvatarUpload } from '../../../../../AvatarUpload';

export const CustomerAvatar: React.FC = () => {
  return (
    <WhiteBlock title="Avatar">
      <div className="d-flex justify-content-center">
        <AvatarUpload />
      </div>
    </WhiteBlock>
  );
};
