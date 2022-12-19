import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Skeleton } from '@material-ui/lab';
import { AddCartButtons } from 'components/AddCartButtons';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { MenuOptions } from 'redux/ducks/products/types/contracts';

import styles from './ChefTableMenuBlock.module.scss';

interface MenuOptionItemProps {
  item: MenuOptions;
  isMobile: boolean;
  handleMenuOptionsCount: (id: number, action: 'delete' | 'added') => void;
  isLoaded: boolean;
  optionsQuantity: number | undefined;
  guests: number;
}

const MenuOptionItem: React.FC<MenuOptionItemProps> = ({
  item,
  handleMenuOptionsCount,
  isLoaded,
  guests,
  optionsQuantity,
  isMobile = false,
}) => {
  const [count, setCount] = React.useState(0);
  const { getTranslatedText } = useTranslate();
  const { t } = useTranslate('checkout');

  const onMinusCount = (): void => {
    if (item.id) {
      handleMenuOptionsCount(item.id, 'delete');
      setCount((prev) => prev - 1);
    }
  };

  const onPlusCount = (): void => {
    if (item.id) {
      handleMenuOptionsCount(item.id, 'added');
      setCount((prev) => prev + 1);
    }
  };

  return (
    <TableRow key={item?.id}>
      <TableCell className={styles.tableCell}>
        {isLoaded ? (
          <>
            <span>{getTranslatedText(item, 'name')}</span>
            {isMobile && (
              <>
                <div className="mt-10">
                  <span style={{ fontSize: 14 }}>
                    <strong>
                      {t('aed')} {item.price}/
                    </strong>
                    {t('cheftable-menu-person')}
                  </span>
                </div>
                <div className="mt-10 fz-large-14">
                  <span className="opacity-6">{t('cheftable-menu-spot')}</span> {item.spots}
                </div>
              </>
            )}
          </>
        ) : (
          <Skeleton height="40px" />
        )}
      </TableCell>
      {!isMobile && (
        <TableCell className={styles.tableCell}>
          {isLoaded ? (
            <span>
              <strong>
                {t('aed')} {item.price}/
              </strong>
              {t('cheftable-menu-person')}
            </span>
          ) : (
            <Skeleton height="40px" />
          )}
        </TableCell>
      )}
      {!isMobile && (
        <TableCell className={styles.tableCell}>
          {isLoaded ? <span>{item.spots}</span> : <Skeleton height="40px" />}
        </TableCell>
      )}
      <TableCell className={styles.tableCell}>
        {isLoaded ? (
          <>
            {Number(item.spots) ? (
              <AddCartButtons
                count={count}
                whenDontShow={-1}
                disabled={false}
                plusDisabled={Number(count) === Number(item.spots) || Number(optionsQuantity) >= guests}
                minusDisabled={count === 0}
                onPlus={onPlusCount}
                onMinus={onMinusCount}
                size="large"
              />
            ) : (
              'Sold Out'
            )}
          </>
        ) : (
          <Skeleton height="40px" />
        )}
      </TableCell>
    </TableRow>
  );
};

export default MenuOptionItem;
