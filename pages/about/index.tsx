import clsx from 'clsx';
import { Container } from 'components/Container';
import { useTranslate } from 'hooks/useTranslate';
import { MainLayout } from 'layouts/MainLayout';
import React from 'react';

import { Icon } from '../../components/Icon';
import styles from './About.module.scss';

const AboutPage: React.FC = () => {
  const { t } = useTranslate('about');
  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.yellowBg} />
      <MainLayout title={t('title')}>
        <div className={styles.topSection}>
          <Container>
            <h1 className="text-center">{t('title')}</h1>
            <div className={styles.text24}>
              <p>{t('first-paragraph')}</p>
              <p>{t('second-paragraph')}</p>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <img src="/static/about/about-top.png" alt="About" />
            </div>
            <div className={clsx('d-flex justify-content-between mb-50', styles.topText)}>
              <div className="w-50">
                <h2>{t('our-vision')}</h2>
                <p>{t('vision-paragraph')}</p>
              </div>
              <div className="w-50">
                <h2>{t('our-mission')}</h2>
                <p>{t('mission-paragraph')}</p>
              </div>
            </div>
          </Container>
        </div>
        <div className={styles.greySection}>
          <Container>
            <div className={styles.plr40}>
              <h2>{t('our-core-values')}</h2>
              <div className={styles.iconsBlock}>
                <div className={styles.iconItem}>
                  <Icon type="LovePartners" />
                  <p>{t('love-partners')}</p>
                </div>
                <div className={styles.iconItem}>
                  <Icon type="LoveCustomer" />
                  <p>{t('love-customer')}</p>
                </div>
                <div className={styles.iconItem}>
                  <Icon type="MakeSimple" />
                  <p>{t('make-complex-simple')}</p>
                </div>
                <div className={styles.iconItem}>
                  <Icon type="LearnNonStop" />
                  <p>{t('learn-non-stop')}</p>
                </div>
                <div className={styles.iconItem}>
                  <Icon type="InnovateBig" />
                  <p>{t('innovate-big')}</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className={styles.teamSection}>
          <Container>
            <div className={styles.plr40}>
              <h2 className="text-center">{t('our-team')}</h2>
              <div className={styles.line} />
              <div className={styles.quoteBlock}>
                <p>{t('team-quote')}</p>
                <b>{t('team-quote-author')}</b>
              </div>
              <div className={styles.teamBlock}>
                <div className={styles.line} />
                <div className={styles.teamList}>
                  <div className={styles.teamItem}>
                    <div>
                      <img src="/static/about/Bassel.png" alt="Bassel Siblini" />
                      <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/bassel-siblini-44790313/">
                        <b>{t('bassel-siblini')}</b>
                      </a>
                      <span>{t('CEO')}</span>
                    </div>
                  </div>
                  <div className={styles.teamItem}>
                    <div>
                      <img src="/static/about/Ghiath.png" alt="Ghiath Osman" />
                      <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/ghiathosman/">
                        <b>{t('ghiath-osman')}</b>
                      </a>
                      <span>{t('CTO')}</span>
                    </div>
                  </div>
                  <div className={styles.teamItem}>
                    <div>
                      <img src="/static/about/Yacine.png" alt="Yacine Meallem" />
                      <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/yacine-meallem/">
                        <b>{t('yacine-meallem')}</b>
                      </a>
                      <span>{t('BDM')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </MainLayout>
    </div>
  );
};

export default AboutPage;
