import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next-redux-wrapper';
import { Store } from 'redux';

import Axios from '../core/axios';
import { setUserData } from '../redux/ducks/user/actionsCreators';
import { User, UserRole } from '../redux/ducks/user/types/state';
import { RootState } from '../redux/types';
import { AuthChefApi } from '../services/api/admin/AuthChefApi';
import { AuthApi } from '../services/api/AuthApi';
import { NextReturnProps } from './enhancedServerSideProps';

const adminRolesUrl: Record<UserRole, string> = {
  [UserRole.STAFF]: '/admin/staff',
  [UserRole.CLOUD_KITCHEN]: '/admin/cloud-kitchen',
  [UserRole.CHEF]: '/admin/chef',
  [UserRole.SUPPLIER]: '/admin/supplier',
  [UserRole.USER]: '/',
};

const failure = (redirect?: boolean): NextReturnProps => ({
  props: {
    isAuth: false,
    token: null,
    user: null,
  },
  ...(redirect
    ? {
        redirect: {
          permanent: false,
          destination: '/admin',
        },
      }
    : {}),
});

export type CheckAuthReturnProps = {
  props: { isAuth: boolean; token: string | null; user: User | null };
  redirect?: { permanent: false; destination: string };
};

export const checkAuth = async (
  ctx: GetServerSidePropsContext & {
    store: Store<RootState>;
  },
  _?: string,
): Promise<CheckAuthReturnProps> => {
  try {
    let user: User;
    const { token = null } = ctx.req?.headers.cookie ? cookie.parse(ctx.req.headers.cookie) : {};
    const asPath = ctx.req?.url?.replace('.json', '');
    const isAdminPath = asPath?.includes('/admin');
    const isUserProfilePath = !asPath?.includes('/admin') && asPath?.includes('/profile');
    const isAdminLoginPage = asPath?.split('/').pop() === 'admin' || asPath?.includes('register');
    Axios.defaults.headers.Authorization = token;

    if (!token && isUserProfilePath) {
      return {
        props: {
          isAuth: false,
          token: null,
          user: null,
        },
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }

    if (!token) {
      return failure(!isAdminLoginPage);
    }

    try {
      user = isAdminPath ? await AuthChefApi.getMe() : await AuthApi.getMe();
      ctx.store.dispatch(setUserData(user));
    } catch (err) {
      return failure(!isAdminLoginPage);
    }

    const url = adminRolesUrl[user.role || UserRole.USER];

    if (url && !asPath?.includes(url)) {
      return {
        props: { isAuth: true, token, user },
        redirect: {
          permanent: false,
          destination: url,
        },
      };
    }

    return failure(false);
  } catch (error) {
    console.error(error);
    return failure();
  }
};
