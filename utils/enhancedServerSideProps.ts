import omit from 'lodash/omit';
import { GetServerSidePropsContext } from 'next-redux-wrapper';
import { Store } from 'redux';

import { User } from '../redux/ducks/user/types/state';
import { wrapper } from '../redux/store';
import { RootState } from '../redux/types';
import { checkAuth } from './checkAuth';

type NextContext = GetServerSidePropsContext & {
  store: Store<RootState>;
};

export type NextReturnProps = {
  props: { isAuth: boolean; token: string | null; user: User | null };
  redirect?: { permanent: false; destination: string };
};

type CallbackReturnProps = (Record<string, unknown> & { failureRedirect?: string }) | void;

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export const enhancedServerSideProps = (
  callback?: (ctx: NextContext) => Promise<CallbackReturnProps> | CallbackReturnProps,
) =>
  wrapper.getServerSideProps(async (ctx) => {
    const returnData = await checkAuth(ctx);
    const callbackProps = callback ? await callback(ctx) : {};
    const props: NextReturnProps = {
      props: {
        ...omit(callbackProps || {}, 'failureRedirect'),
        ...returnData.props,
      },
    };

    if (returnData.redirect) {
      props.redirect = returnData.redirect;
    }

    if (callbackProps && callbackProps.failureRedirect) {
      props.redirect = {
        permanent: false,
        destination: callbackProps.failureRedirect,
      };
    }

    return props;
  });
