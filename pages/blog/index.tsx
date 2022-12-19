import { BlogList } from 'components/pages/blog';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import React from 'react';
import { BlogsApi } from 'services/api/BlogApi';
import { BlogCategory, BlogItem } from 'services/types';

import { wrapper } from '../../redux/store';
import { ProductsApi } from '../../services/api/ProductsApi';

interface BlogPageProps {
  items: BlogItem[];
  totalCount: number;
  postCategories: BlogCategory[];
}

const BlogPage: NextPage<BlogPageProps> = ({ items, totalCount, postCategories }) => {
  return (
    <MainLayout title="Blog">
      <BlogList items={items} totalCount={totalCount} postCategories={postCategories} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const { items, meta } = await BlogsApi.getAll({ ...ctx.query, take: 12, category_ids: ctx.query.category });
    const { postCategories } = await ProductsApi.directories(['postCategories']);
    return {
      props: {
        items,
        totalCount: meta.total,
        postCategories,
      },
    };
  } catch (error) {
    console.warn(error);
  }

  return { props: { items: [], totalCount: 0 } };
});

export default BlogPage;
