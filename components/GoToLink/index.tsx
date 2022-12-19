import { useMediaQuery } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

import styles from './GoToLink.module.scss';

interface GoToLinkProps {
  href?: string;
  onClick?: () => void;
  text: string;
}

export const GoToLink: React.FC<GoToLinkProps> = ({ href, onClick, text }): React.ReactElement => {
  const handleOnClick = (event: React.MouseEvent): void => {
    if (onClick) {
      event.preventDefault();
      onClick();
    }
  };
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Link href={href ?? ''}>
      <a className={styles.wrapperLink} href={href} onClick={handleOnClick}>
        <div className={styles.wrapper}>
          {isMobile ? (
            <>
              <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.999999 1L7 6.5L1 12"
                  stroke="#373737"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          ) : (
            <>
              <span className={styles.text}>{text}</span>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.66667 1L14 5.5M14 5.5L9.66667 10M14 5.5H1"
                  stroke="#1CBD8D"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </div>
      </a>
    </Link>
  );
};
