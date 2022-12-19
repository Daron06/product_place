import { AvatarUpload } from 'components/AvatarUpload';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';

export const ChangeAvatarBlock: React.FC = () => {
  return (
    <WhiteBlock title="Avatar">
      <div className="d-flex justify-content-center">
        <AvatarUpload />
      </div>
    </WhiteBlock>
  );
};
