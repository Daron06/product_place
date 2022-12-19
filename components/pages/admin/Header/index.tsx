import { HeaderView } from 'components/pages/admin/Header/View';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectUserData } from '../../../../redux/ducks/user/selectors';

export const Header = (): React.ReactElement => {
  const userData = useSelector(selectUserData);
  const router = useRouter();

  return <HeaderView userData={userData} currentPath={router.pathname} />;
};
