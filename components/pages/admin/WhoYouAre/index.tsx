import { WhoYouAreView } from 'components/pages/admin/WhoYouAre/View';
import { useRouter } from 'next/router';
import React from 'react';

const WhoYouAre = (): React.ReactElement => {
  const router = useRouter();

  const onClickCard = (path: string): void => {
    router.push(`/admin/register/${path}`);
  };

  return <WhoYouAreView onClickCard={onClickCard} />;
};

export default WhoYouAre;
