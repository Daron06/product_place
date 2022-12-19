import { Chip } from 'components/Chip';
import { Icon, IconName } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import { Allergen } from '../../services/types';
import styles from './ProductDetailsLayout.module.scss';

interface ProductDetailsInfoProps {
  cuisine: string;
  allergens: Readonly<Allergen[]>;
}

export const ProductDetailsInfo: React.FC<ProductDetailsInfoProps> = ({ cuisine, allergens }): React.ReactElement => {
  const { getTranslatedText } = useTranslate();
  return (
    <div className={styles.productAdditionalIfoBox}>
      <div className={styles.productDetailsTag}>
        <Chip label={cuisine} variant="default" className={styles.cuisineChip} clickable={false} />
      </div>
      <div className={styles.menuItemAllergens}>
        {allergens.map((allergen) => (
          <div key={allergen.id} className={styles.productAllergenItem} title={getTranslatedText(allergen, 'name')}>
            <Icon type={allergen.slug.toLowerCase().replace(' ', '-') as IconName} />
          </div>
        ))}
      </div>
    </div>
  );
};
