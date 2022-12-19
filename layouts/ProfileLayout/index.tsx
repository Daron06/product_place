import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import { Profile } from 'components/pages/profile';
import styles from 'components/pages/profile/Profile.module.scss';
import { MainLayout } from 'layouts/MainLayout';
import { useRouter } from 'next/router';
import React from 'react';

interface IProfileLayout {
  tabs: string;
}

type ProfileBackContextProps = { onBack: () => void };
export const ProfileBackContext = React.createContext({} as ProfileBackContextProps);

export const ProfileLayout: React.FC<IProfileLayout> = ({ children, tabs }): React.ReactElement => {
  const router = useRouter();
  const [tabOpened, setTabOpened] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:576px)');

  const onChangePath = async (tabName: string): Promise<void> => {
    await router.replace(`/profile/${tabName}`);
    setTabOpened(true);
  };

  React.useEffect(() => {
    if (router.pathname && router.pathname !== '/profile') {
      setTabOpened(true);
    }
  }, [router.pathname]);

  return (
    <MainLayout title="Profile">
      <div className={styles.profile}>
        <div className={clsx(styles.container, tabOpened && styles.containerWhite)}>
          <ProfileBackContext.Provider value={{ onBack: (): void => setTabOpened(false) }}>
            {isMobile ? (
              <>
                {!tabOpened ? (
                  <Profile onChangeTab={onChangePath} activeTab={tabs} />
                ) : (
                  <div className={styles.tabsContent}>{children}</div>
                )}
              </>
            ) : (
              <>
                <Profile onChangeTab={onChangePath} activeTab={tabs} />
                <div className={styles.tabsContent}>{children}</div>
              </>
            )}
          </ProfileBackContext.Provider>
        </div>
      </div>
    </MainLayout>
  );
};
