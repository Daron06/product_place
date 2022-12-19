import { Container } from 'components/Container';
import { BlogDetails } from 'components/pages/blogDetails';
import { MainLayout } from 'layouts/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { BlogsApi } from 'services/api/BlogApi';
import { BlogItem } from 'services/types';

interface BlogItemProps {
  data: BlogItem | null;
}

const BlogItemPage: NextPage<BlogItemProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <MainLayout title={data?.title} image={data?.image} description={data?.description}>
      <Container>
        <BlogDetails initialBlogItem={data} />
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<BlogItemProps> = async ({ query }) => {
  try {
    const data = await BlogsApi.details(query.slug as string);

    if (data) {
      return { props: { data } };
    }

    return {
      props: {
        data: null,
      },
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        data: null,
      },
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }

  return { props: { data: null } };
};

export default BlogItemPage;
