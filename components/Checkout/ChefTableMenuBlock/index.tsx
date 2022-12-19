import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import clsx from 'clsx';
import checkoutStyles from 'components/pages/checkout/Checkout.module.scss';
import Axios from 'core/axios';
import { useTranslate } from 'hooks/useTranslate';
import { useRouter } from 'next/router';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { MenuOptions } from 'redux/ducks/products/types/contracts';

import styles from './ChefTableMenuBlock.module.scss';
import MenuOptionItem from './MenuOptionItem';

export const ChefTableMenuBlock: React.FC = (): React.ReactElement => {
  const { setValue, watch } = useFormContext();
  const router = useRouter();
  const dateId = router.query.date_id as string;
  const isMobile = useMediaQuery('(max-width:576px)');
  const [menuOptions, setMenuOptions] = React.useState<MenuOptions[] | []>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [menuAdded, setMenuAdded] = React.useState<{ [key: string]: number }>({});
  const guests = watch('guests').adults;
  const optionsQuantity = watch('options')?.reduce((prev, acc) => prev + acc.quantity, 0);
  React.useEffect(() => {
    setIsLoaded(false);

    (async (): Promise<void> => {
      const { data } = await Axios.get(`/product/chefTable/${dateId}/options`);
      setMenuOptions(data);
      setMenuAdded(
        data.reduce(function (result, item) {
          // eslint-disable-next-line no-param-reassign
          result[item.id] = 0;
          return result;
        }, {}),
      );
      setIsLoaded(true);
    })();
  }, []);

  React.useEffect(() => {
    const menuOp = Object.entries(menuAdded)
      .map((e) => ({ id: e[0], quantity: e[1] }))
      .filter((e) => e.quantity !== 0);
    setValue('options', menuOp, { shouldValidate: true });
  }, [menuAdded]);

  const onMenuOptionsCount = (id: number, action: 'added' | 'delete'): void => {
    setMenuAdded((prev) => ({ ...prev, [id]: action === 'added' ? prev[id] + 1 : prev[id] - 1 }));
  };

  const { t } = useTranslate('checkout');

  return (
    <div className={styles.wrapper}>
      <div className={styles.ml30}>
        <Typography className={clsx('fw-bold', checkoutStyles.blockTitle)} variant="h6">
          {t('cheftable-menu-title')}
        </Typography>
      </div>
      <TableContainer>
        <Table className={styles.staffOrderInfoTable}>
          {!isMobile && (
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell style={{ width: '33%', paddingLeft: '30px' }} className={styles.headText}>
                  {t('cheftable-menu-name')}
                </TableCell>
                <TableCell className={styles.headText}>{t('cheftable-menu-price')}</TableCell>
                <TableCell className={styles.headText}>{t('cheftable-menu-spot')}</TableCell>
                <TableCell style={{ textAlign: 'end' }} className={styles.headText}>
                  {t('cheftable-menu-count')}
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {(isLoaded ? menuOptions : [...Array(5)])?.map((item) => {
              return (
                <MenuOptionItem
                  isLoaded={isLoaded}
                  key={item?.id}
                  item={item}
                  isMobile={isMobile}
                  handleMenuOptionsCount={onMenuOptionsCount}
                  guests={guests}
                  optionsQuantity={optionsQuantity}
                />
              );
            })}
          </TableBody>
        </Table>
        {optionsQuantity !== guests && <p className="ml-20 text-error">{t('text-menu-error')}</p>}
      </TableContainer>
    </div>
  );
};
