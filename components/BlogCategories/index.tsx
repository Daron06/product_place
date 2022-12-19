import clsx from 'clsx';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BlogCategory } from 'services/types';

import styles from './BlogCats.module.scss';

interface BlogCatsProps {
  items: readonly BlogCategory[];
}

export const BlogCategories: React.FC<BlogCatsProps> = ({ items }) => {
  const { query } = useRouter();
  const catId = query.category;

  const { t, getTranslatedText } = useTranslate('blog');
  return (
    <div className={styles.catsWrapper}>
      <Link href="/blog">
        <a className={clsx({ [styles.active]: !catId }, styles.catsLink)} href="/blog">
          {t('all-posts')}
          <span />
        </a>
      </Link>
      {items.map((item) => (
        <Link key={item.id} href={`blog?category=${item.id}`}>
          <a
            className={clsx({ [styles.active]: String(catId) === String(item.id) }, styles.catsLink)}
            href={`blog?category=${item.id}`}
          >
            {getTranslatedText(item, 'name')}
            <span />
          </a>
        </Link>
      ))}
    </div>
  );
};
