import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ContainerFull } from 'components/ContainerFull';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

import { useTranslate } from '../../hooks/useTranslate';
import { Icon } from '../Icon';
import styles from './Footer.module.scss';

export const Footer: FC = () => {
  const { t } = useTranslate('footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <ContainerFull>
          <div className={clsx('d-flex align-items-center justify-content-between', styles.links)}>
            <div>
              <a href="/">
                <Image width={105} height={44} src="/logo-footer.svg" alt="logo" />
              </a>
            </div>
            <div className={clsx('d-flex align-items-center', styles.socialLinks)}>
              <a
                aria-label="Instagram"
                className={styles.footerIcon}
                href="https://instagram.com/getunknown"
                target="_blank"
                rel="noreferrer"
              >
                <Icon type="instagram" />
              </a>
              <a
                aria-label="Twitter"
                className={styles.footerIcon}
                href="https://twitter.com/getunknown"
                target="_blank"
                rel="noreferrer"
              >
                <Icon type="twitter" />
              </a>
              <a
                aria-label="Facebook"
                className={styles.footerIcon}
                href="https://www.facebook.com/unknown-inc-105626528692523"
                target="_blank"
                rel="noreferrer"
              >
                <Icon type="facebook" />
              </a>
              <a
                className={styles.footerIcon}
                aria-label="Linkedin"
                href="https://linkedin.com/company/70232761/admin"
                target="_blank"
                rel="noreferrer"
              >
                <Icon type="linkedin" />
              </a>
              <a
                className={styles.footerIcon}
                aria-label="TikTok"
                href="https://www.tiktok.com/@getunknown?lang=en"
                target="_blank"
                rel="noreferrer"
              >
                <Icon type="tiktok" />
              </a>
              <a
                className={styles.footerIcon}
                aria-label="YouTube"
                href="https://www.youtube.com/channel/UClQbI0nhI2CDSngH0PVyNKg"
                target="_blank"
                rel="noreferrer"
              >
                <Icon type="youtube" />
              </a>
            </div>
            <div className={styles.footerAppsLinks}>
              <a target="_blank" rel="noreferrer" href="https://apps.apple.com/ru/app/unknown-tech/id1564259895">
                <Image width={224} height={65} src="/static/app-store.jpg" alt={t('app-store')} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://play.google.com/store/apps/details?id=me.unknown.unknown"
              >
                <Image width={224} height={65} src="/static/google-play.jpg" alt={t('google-play')} />
              </a>
            </div>
          </div>
        </ContainerFull>
      </div>
      <div className={styles.footerCener}>
        <ContainerFull>
          <div className={styles.footerInfo}>
            <div className={styles.footerunknown}>
              <div className="mb-15">
                <Typography className={styles.footerTitle} variant="h6" component="h3">
                  {t('unknown.title')}
                </Typography>
              </div>
              <ul className={styles.footerList}>
                {t('unknown.links').map((item) => (
                  <li key={item.title}>
                    <Typography component="a" href={item.link} className={styles.footerItem} variant="subtitle1">
                      {item.title}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.footerAbout}>
              <div className="mb-15">
                <Typography className={styles.footerTitle} variant="h6" component="h3">
                  {t('about.title')}
                </Typography>
              </div>
              <ul className={styles.footerList}>
                {t('about.links').map((item) => (
                  <li key={item.title}>
                    <Link href={item.link}>
                      <Typography component="a" href={item.link} className={styles.footerItem} variant="subtitle1">
                        {item.title}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.footerAbout}>
              <div className="mb-15">
                <Typography className={styles.footerTitle} variant="h6" component="h3">
                  {t('for_partners.title')}
                </Typography>
              </div>
              <ul className={styles.footerList}>
                {t('for_partners.links').map((item) => (
                  <li key={item.title}>
                    <Link href={item.link}>
                      <Typography component="a" href={item.link} className={styles.footerItem} variant="subtitle1">
                        {item.title}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.footerAbout}>
              <div className="mb-15">
                <Typography className={styles.footerTitle} variant="h6" component="h3">
                  {t('contacts.title')}
                </Typography>
              </div>
              <ul className={styles.footerList}>
                {t('contacts.list').map((item) => (
                  <li key={item.title}>
                    <Typography component="a" className={styles.footerItem} href={item.link} variant="subtitle1">
                      {item.title} {item.phone && <span className={styles.phone}>{item.phone}</span>}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContainerFull>
        <div className={styles.footerBottom}>
          <ContainerFull>
            <div className={clsx('d-flex align-items-center justify-content-between ph-40 pv-30', styles.links)}>
              <Typography className={styles.footerLightText} variant="subtitle1" component="h4">
                2020-{new Date().getFullYear()} {t('copyright')}
              </Typography>
              <Typography className={styles.footerLightText} variant="subtitle1" component="h4">
                <Link href="/docs/terms_and_conditions.html">
                  <a target="_blank" rel="noreferrer" href="/docs/terms_and_conditions.html">
                    {t('terms_of_service')}
                  </a>
                </Link>
                {' | '}
                <Link href="/docs/privacy_policy.html">
                  <a target="_blank" rel="noreferrer" href="/docs/privacy_policy.html">
                    {t('privacy_policy')}
                  </a>
                </Link>
              </Typography>
              <Typography
                className={clsx(styles.footerLightText, styles.footerPartner)}
                variant="subtitle1"
                component="h4"
              >
                <a target="_blank" rel="noreferrer" href="https://www.gulfood.com/">
                  {t('official-partner')} &nbsp;{' '}
                  <Image width={80} height={45} src="/static/culfood-logo.png" alt="Logo" />
                </a>
              </Typography>
            </div>
          </ContainerFull>
        </div>
      </div>
    </footer>
  );
};
