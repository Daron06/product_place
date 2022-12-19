import Avatar from '@material-ui/core/Avatar';
import MuiMenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import { Immutable } from 'immer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ProductChefNullable } from 'redux/ducks/products/types/state';

import { Checkbox } from '../../../Checkbox';
import { ProductStatusDropdown } from '../../../ProductStatus';
import styles from './AdminProducts.module.scss';

interface ProductTableRowProps {
  isItemSelected: boolean;
  item?: Immutable<ProductChefNullable>;
  onActivateItem: (id: number) => void;
  onDeactivateItem: (id: number) => void;
  onSelectProductItem: (ids: number) => void;
  isLoading: boolean;
  labelId: string;
}

export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  isItemSelected,
  item,
  onActivateItem,
  onDeactivateItem,
  onSelectProductItem,
  isLoading,
  labelId,
}) => {
  const router = useRouter();

  return (
    <TableRow aria-checked={isItemSelected} role="checkbox" selected={isItemSelected} tabIndex={-1} hover>
      <TableCell padding="checkbox" onClick={item ? (): void => onSelectProductItem(Number(item.id)) : undefined}>
        {isLoading ? (
          <div />
        ) : (
          item &&
          item.status === 'active' && <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
        )}
      </TableCell>
      <TableCell component="th" id={labelId} scope="item" padding="none">
        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative', top: -3 }}>
            <Skeleton width="46px" height="74px" />
            <Skeleton height="26px" style={{ marginLeft: 17 }} width={Math.round(Math.random() * 100) + 180} />
          </div>
        ) : (
          item && (
            <Link href={`${router.asPath}/edit/${item.id}`}>
              <a href={`${router.asPath}/edit/${item.id}`}>
                <div className="d-flex align-items-center">
                  <span className={styles.tableImage}>
                    {/* TODO: Поправить на media и избавиться от image */}
                    {item.media && <img src={item.media[0]?.url} alt="Dish" />}
                    {item?.image && <img src={item?.image} alt="Dish" />}
                  </span>
                  <span>{item.name}</span>
                </div>
              </a>
            </Link>
          )
        )}
      </TableCell>
      <TableCell>{isLoading ? <Skeleton width="50px" /> : (item?.price && `AED ${item.price}`) || '---'}</TableCell>
      <TableCell>
        {isLoading ? (
          <div className="d-flex align-items-center">
            <Skeleton variant="circle" height={28} width={28} style={{ marginRight: 15 }} />
            <Skeleton width={Math.round(Math.random() * 70) + 100} />
          </div>
        ) : (
          item && (
            <div className="d-flex align-items-center">
              <Avatar src={item.supplier?.image || item.chef?.image} style={{ height: 28, width: 28 }} />
              <div className="ml-15">{item.supplier?.name || item.chef?.name}</div>
            </div>
          )
        )}
      </TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton width={67} height={33} />
        ) : (
          item && (
            <ProductStatusDropdown status={item.status}>
              {item.status === 'active' && (
                <MuiMenuItem onClick={(): void => onDeactivateItem(Number(item.id))}>Disable</MuiMenuItem>
              )}
              {item.status === 'disabled' && (
                <MuiMenuItem onClick={(): void => onActivateItem(Number(item.id))}>Active</MuiMenuItem>
              )}
            </ProductStatusDropdown>
          )
        )}
      </TableCell>
    </TableRow>
  );
};
