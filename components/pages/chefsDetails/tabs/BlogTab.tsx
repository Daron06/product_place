import { CardItem } from 'components/CardItem';
import { CardsList } from 'layouts/CardsList';
import Link from 'next/link';
import React from 'react';

export const BlogTab: React.FC = (): React.ReactElement => {
  return (
    <CardsList isLoading={false} itemsLength={5}>
      <Link href="/chefs-table/slug">
        <a href="/chefs-table/slug">
          <CardItem
            id={1}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            name="Autumn mix"
            imageUrl="https://i.pinimg.com/474x/ef/d0/66/efd0663ae6456489799d12973173283b.jpg"
            isBlog
          />
        </a>
      </Link>
      <Link href="/chefs-table/slug">
        <a href="/chefs-table/slug">
          <CardItem
            id={2}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            name="Autumn mix"
            imageUrl="https://i.pinimg.com/474x/ef/d0/66/efd0663ae6456489799d12973173283b.jpg"
            isBlog
          />
        </a>
      </Link>
      <Link href="/chefs-table/slug">
        <a href="/chefs-table/slug">
          <CardItem
            id={3}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            name="Autumn mix"
            imageUrl="https://i.pinimg.com/474x/ef/d0/66/efd0663ae6456489799d12973173283b.jpg"
            isBlog
          />
        </a>
      </Link>
    </CardsList>
  );
};
