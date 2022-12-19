import TableCell from '@material-ui/core/TableCell';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import React from 'react';

interface TextCellProps {
  color?: TypographyProps['color'];
  isLoading?: boolean;
  classes?: {
    text?: string;
  };
}

export const TextCell: React.FC<TextCellProps> = ({ children, classes, color, isLoading = false }) => {
  return (
    <TableCell>
      {isLoading ? (
        <div className="d-flex align-items-center">
          <Skeleton variant="text" width={100} />
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <Typography className={clsx('fz-large-14', classes?.text)} color={color}>
            {children}
          </Typography>
        </div>
      )}
    </TableCell>
  );
};
