import { IconName } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import { ProductLocationType } from 'redux/ducks/products/types/contracts';

type Value = { label: string; icon: IconName };
type ReturnProps = Record<ProductLocationType, Value>;

export const getMasterClassType = (type: ProductLocationType | undefined): Value | null => {
  const { t } = useTranslate('masterclass-details');
  const masterClassTypes: ReturnProps = {
    'at-home': {
      label: t('online'),
      icon: 'video-yellow-mini',
    },
    'at-restaurant': {
      label: t('in-person'),
      icon: 'table-green-mini',
    },
    recorded: {
      label: t('recorded'),
      icon: 'recorded-masterclass',
    },
  };

  return type ? masterClassTypes[type] : null;
};
