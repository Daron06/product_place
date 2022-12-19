import { Typography } from '@material-ui/core';
import { BlogCategories } from 'components/BlogCategories';
import { CardItem } from 'components/CardItem';
import { Pagination } from 'components/Pagination';
import { useTranslate } from 'hooks/useTranslate';
import { CardsList } from 'layouts/CardsList';
import { ProductsLayout } from 'layouts/ProductsLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BlogsApi } from 'services/api/BlogApi';
import { BlogCategory, BlogItem, ResponseBlog } from 'services/types';

interface BlogProps {
  items: BlogItem[];
  totalCount: number;
  postCategories: BlogCategory[];
}

export const BlogList: React.FC<BlogProps> = ({ items, totalCount, postCategories }): React.ReactElement => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [perPageItemsCount, setperPageItemsCount] = React.useState<number>(12);
  const isMountedRef = React.useRef(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [blogResponse, setBlogResponse] = React.useState<ResponseBlog>({
    items,
    meta: { total: totalCount },
  });

  const setPage = (page: number): void => {
    setCurrentPage(page);
  };

  const { query } = useRouter();
  const catId = query.category;
  const perPage = 12;

  const getBlogItems = async (goToFirstPage?: boolean): Promise<void> => {
    setIsLoading(true);
    if (goToFirstPage) {
      setCurrentPage(1);
    }
    try {
      const data = await BlogsApi.getAll({
        page: currentPage,
        take: 12,
        category_ids: catId,
      });
      setBlogResponse(data);
      setperPageItemsCount(perPage * (currentPage - 1) + data.items.length);
    } catch (error) {
      console.error('StatisticDashboard error', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isMountedRef.current) {
      getBlogItems();
    }
    isMountedRef.current = true;
  }, [currentPage]);

  React.useEffect(() => {
    if (isMountedRef.current) {
      getBlogItems(true);
    }
    isMountedRef.current = true;
  }, [catId]);

  const pageCount = totalCount ? totalCount / perPage : 0;

  const { t, getTranslatedText } = useTranslate('blog');

  return (
    <ProductsLayout pageTitle={t('title')} breadcrumbs={[{ title: t('home'), url: '/' }, { title: t('title') }]}>
      <BlogCategories items={postCategories} />
      <CardsList isLoading={isLoading} isLoaded itemsLength={items?.length}>
        {blogResponse.items?.map((item) => (
          <Link key={item.id} href={`blog/${item.slug}`}>
            <a href={`blog/${item.slug}`}>
              <CardItem
                type="blog"
                id={Number(item.id)}
                description={getTranslatedText(item, 'description')}
                name={getTranslatedText(item, 'title')}
                imageUrl={item.image ? item.image : ''}
                size="large"
                rating={undefined}
              />
            </a>
          </Link>
        ))}
      </CardsList>
      {blogResponse.items && (
        <div className="d-flex justify-content-between p-20">
          <Pagination currentPage={currentPage} goToPage={setPage} pageCount={Math.ceil(pageCount)} />
          <Typography variant="subtitle1">
            {perPageItemsCount}/{totalCount}
          </Typography>
        </div>
      )}
    </ProductsLayout>
  );
};
