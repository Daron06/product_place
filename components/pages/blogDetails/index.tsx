import { Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Container } from 'components/Container';
import format from 'date-fns/format';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { BlogItem } from 'services/types';

import styles from './Blog.module.scss';

interface BlogDetailsProps {
  initialBlogItem: BlogItem;
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({ initialBlogItem }): React.ReactElement => {
  const { t, getTranslatedText } = useTranslate('blog');
  return (
    <div className={styles.blogPage}>
      <Container>
        <div className="mt-30">
          <Breadcrumbs
            items={[
              { title: t('home'), url: '/' },
              { title: t('title'), url: '/blog' },
              { title: initialBlogItem ? getTranslatedText(initialBlogItem, 'title') : '' },
            ]}
          />
        </div>

        <div className={styles.blogCoverPhoto}>
          <img src={`${initialBlogItem?.image}?width=900&height=800`} alt="" />
        </div>
        <div className={styles.infotWrapper}>
          <section>
            <div className="mb-30">
              <Typography variant="h1" className={styles.blogTitle}>
                {getTranslatedText(initialBlogItem, 'title')}
              </Typography>
            </div>
            <div className={styles.catDate}>
              {initialBlogItem?.category && (
                <MuiLink className={styles.link} href={`blog?category=${initialBlogItem.category.id}`}>
                  {getTranslatedText(initialBlogItem.category, 'name')}
                </MuiLink>
              )}
              <span />
              {initialBlogItem?.createdAt && <p>{format(new Date(initialBlogItem?.createdAt), 'MMM d, Y')}</p>}
            </div>
            <div className={styles.shortDesc}>
              {initialBlogItem?.shortDescription && (
                <div dangerouslySetInnerHTML={{ __html: getTranslatedText(initialBlogItem, 'shortDescription') }} />
              )}
            </div>

            <div className={styles.blogtDesc}>
              {initialBlogItem?.description && (
                <div dangerouslySetInnerHTML={{ __html: getTranslatedText(initialBlogItem, 'description') }} />
              )}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};
