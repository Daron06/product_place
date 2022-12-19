import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import { Ingredient } from '../../../services/types';
import styles from './RecipesDetails.module.scss';

interface IngredientsTabProps {
  items: Ingredient[];
}

export const IngredientsTab: React.FC<IngredientsTabProps> = ({ items }): React.ReactElement => {
  const { t } = useTranslate('recipes-details');
  if (!items.length) {
    return <Typography>{t('ingredients-after-purchase')}</Typography>;
  }

  return (
    <ul className={styles.recipeList}>
      {items.map((ingredient) => (
        <a href={ingredient.slug} key={ingredient.id}>
          <li className="d-flex flex-column">
            <div className={styles.recipeImageCircle}>
              <img src={ingredient.image} alt={ingredient.name} />
            </div>
            <div className="mt-15 text-center">
              <Typography>{ingredient.name}</Typography>
            </div>
          </li>
        </a>
      ))}
    </ul>
  );
};
