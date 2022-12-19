import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { Result } from 'components/Result';
import { useAlert } from 'hooks/useAlert';
import { useIsLoading } from 'hooks/useIsLoading';
import React from 'react';
import { UserApi } from 'services/api/UserApi';
import { ResponseAddress } from 'services/types';

import { useTranslate } from '../../../../../hooks/useTranslate';
import { Button } from '../../../../Button';
import { ProfileTabTitle } from '../../ProfileTabTitle';
import { AddAddressForm } from './AddAddressForm';
import styles from './DeliveryTab.module.scss';
import DeliveryUserAddress from './DeliveryUserAddress';

export const DeliveryTab: React.FC = () => {
  const [addresses, setAddresses] = React.useState<ResponseAddress[]>([]);
  const [currentAddressIdx, setCurrentAddressIdx] = React.useState<number>();
  const [isAddressesLoading, addressesLoading, addressesLoaded] = useIsLoading();
  const { openAlert } = useAlert();
  const { t } = useTranslate('profile');

  React.useEffect(() => {
    (async (): Promise<void> => {
      if (currentAddressIdx === undefined) {
        try {
          window.scrollTo(0, 0);
          addressesLoading();
          const response = await UserApi.getAddresses();
          setAddresses(response);
        } finally {
          addressesLoaded();
        }
      }
    })();
  }, [currentAddressIdx]);

  const onRemoveAddress = async (index: number): Promise<void> => {
    const userAnswer = window.confirm(t('delivery-address.confirm-delete-text'));
    const currentAddress = addresses[index];
    if (userAnswer && currentAddress.id) {
      try {
        setAddresses((prev) => prev.filter((el) => el.id !== currentAddress.id));
        await UserApi.deleteAddress(currentAddress.id);
        setCurrentAddressIdx(undefined);
        openAlert(t('delivery-address.success-deleted'), 'success');
      } catch (error) {
        openAlert(t('delivery-address.error-delete'), 'error');
        console.error(error);
      }
    }
  };

  const onClickEdit = (index: number): void => {
    setCurrentAddressIdx(index);
  };

  let content: React.ReactNode;

  if (isAddressesLoading) {
    content = [...Array(3)].map((_, index) => (
      <Skeleton
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        variant="rect"
        width="100%"
        height={100}
        className={clsx('mb-20', styles.skeletonItem)}
      />
    ));
  } else if (addresses.length > 0 && !isAddressesLoading) {
    content = addresses.map((item, index) =>
      currentAddressIdx === index ? (
        <AddAddressForm
          address={addresses[currentAddressIdx]}
          onClickCancel={(): void => setCurrentAddressIdx(undefined)}
          onClickRemove={(): Promise<void> => onRemoveAddress(currentAddressIdx)}
        />
      ) : (
        <DeliveryUserAddress
          address={item}
          key={item.id}
          setAddresses={setAddresses}
          onClickEdit={(): void => onClickEdit(index)}
          onClickRemove={(): Promise<void> => onRemoveAddress(index)}
        />
      ),
    );
  } else if (currentAddressIdx === undefined) {
    content = (
      <div className="mb-40 mt-40">
        <Result title={t('delivery-address.no-have-addresses')} />
      </div>
    );
  }

  return (
    <>
      <ProfileTabTitle value={t('delivery-address.title')} />
      <div className={styles.delivery}>
        {currentAddressIdx === -1 && (
          <AddAddressForm
            currentAddressIdx={currentAddressIdx}
            address={addresses[currentAddressIdx]}
            onClickCancel={(): void => setCurrentAddressIdx(undefined)}
            onClickRemove={(): Promise<void> => onRemoveAddress(currentAddressIdx)}
          />
        )}
        {content}
        {!currentAddressIdx && (
          <div className={styles.button}>
            <Button
              onClick={(): void => setCurrentAddressIdx(-1)}
              type="submit"
              className={styles.submitButton}
              variant="contained"
              color="secondary"
            >
              {t('delivery-address.add-new-address-button')}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
