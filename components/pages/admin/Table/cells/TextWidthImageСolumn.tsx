/* eslint-disable no-nested-ternary */
import Avatar from '@material-ui/core/Avatar';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Link from 'next/link';
import React from 'react';

interface TextWidthImageCellProps {
  id?: string | number;
  image?: string | null;
  name?: string;
  imageStyle: React.CSSProperties;
  isLoading?: boolean;
  href: string;
  link?: boolean;
}

export const TextWidthImageСell: React.FC<TextWidthImageCellProps> = ({
  imageStyle,
  href,
  id,
  name,
  image,
  isLoading = false,
  link = true,
}): React.ReactElement => {
  return (
    <TableCell scope="row">
      {isLoading ? (
        <div className="d-flex align-items-center">
          <Skeleton variant="circle" height={28} width={28} style={{ marginRight: 15 }} />
          <Skeleton width={Math.round(Math.random() * 70) + 100} />
        </div>
      ) : !link ? (
        <div className="d-flex align-items-center">
          <Avatar src={image ?? '/static/no_avatar.svg'} style={imageStyle} />
          <Typography className="ml-15 fz-large-14">{name}</Typography>
        </div>
      ) : (
        <Link href={`${href}/${id}`}>
          <a href={`${href}/${id}`}>
            <div className="d-flex align-items-center">
              <Avatar src={image ?? '/static/no_avatar.svg'} style={imageStyle} />
              <Typography className="ml-15 fz-large-14">{name}</Typography>
            </div>
          </a>
        </Link>
      )}
    </TableCell>
  );
};
