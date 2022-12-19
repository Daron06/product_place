import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { WhiteBlock } from '../../../WhiteBlock/WhiteBlock';

interface ProductChefInfoBlockProps {
  image?: string;
  name?: string;
  marginZero?: boolean;
}

export const ProductChefInfoBlock: React.FC<ProductChefInfoBlockProps> = ({
  image,
  name,
  marginZero,
}): React.ReactElement => {
  return (
    <WhiteBlock title="Chef" marginZero={marginZero}>
      <div className="d-flex align-items-center">
        <Avatar src={image} />
        <Typography className="ml-10">{name}</Typography>
      </div>
    </WhiteBlock>
  );
};
