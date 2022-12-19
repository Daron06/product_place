import MuiMenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import { Immutable } from 'immer';
import { useRouter } from 'next/router';
import React from 'react';

import { DashboardRole, Ingredient } from '../../../../services/types';
import { ProductStatusDropdown } from '../../../ProductStatus';
import { SelectItemCell } from '../Table/cells/SelectItemCell';
import { TextCell } from '../Table/cells/TextCell';
import { TextWidthImageСell } from '../Table/cells/TextWidthImageСolumn';

interface IngredientsTableRowProps {
  isSelected: boolean;
  labelId: string;
  isLoading: boolean;
  onSelectItem: (ids: number) => void;
  onActivateItem: (id: number) => void;
  onDeactivateItem: (id: number) => void;
  item: Immutable<Ingredient>;
  role?: DashboardRole;
}

export const IngredientsTableRow: React.FC<IngredientsTableRowProps> = ({
  item,
  labelId,
  isSelected = false,
  isLoading = false,
  onSelectItem,
  onActivateItem,
  onDeactivateItem,
  role,
}) => {
  const router = useRouter();

  return (
    <TableRow aria-checked={isSelected} hover key={labelId} role="checkbox" selected={isSelected} tabIndex={-1}>
      <SelectItemCell
        isLoading={isLoading}
        isItemSelected={isSelected}
        onSelectItem={(): void => onSelectItem(Number(item))}
      />
      <TextCell isLoading={isLoading}>{item?.id ?? null}</TextCell>
      <TextWidthImageСell
        href={`${router.asPath}/edit`}
        id={String(item?.id)}
        name={item?.name}
        image={item?.image}
        imageStyle={{ height: 25, width: 25 }}
        isLoading={isLoading}
      />
      {role === DashboardRole.STAFF && (
        <TextWidthImageСell
          href={`${router.asPath}/edit`}
          id={String(item?.id)}
          name={item?.supplier?.name}
          image={item?.supplier?.image}
          imageStyle={{ height: 25, width: 25 }}
          isLoading={isLoading}
        />
      )}
      <TextCell color="secondary" classes={{ text: 'fw-bold' }} isLoading={isLoading}>
        12
      </TextCell>
      <TextCell color="secondary" classes={{ text: 'fw-bold' }} isLoading={isLoading}>
        23
      </TextCell>
      <TextCell isLoading={isLoading}>46</TextCell>
      <TableCell>
        {isLoading ? (
          <Skeleton width={67} height={33} />
        ) : (
          item.status && (
            <ProductStatusDropdown status={item.status as any}>
              <MuiMenuItem onClick={(): void => onDeactivateItem(Number(item.id))}>Stop</MuiMenuItem>
              <MuiMenuItem onClick={(): void => onActivateItem(Number(item.id))}>Active</MuiMenuItem>
            </ProductStatusDropdown>
          )
        )}
      </TableCell>
    </TableRow>
  );
};
