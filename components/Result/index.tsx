import Typography from '@material-ui/core/Typography';
import EmptyBoxIcon from 'assets/icons/empty-box.svg';
import SuccessIcon from 'assets/icons/success-bold-xl.svg';
import clsx from 'clsx';
import React from 'react';

import styles from './Result.module.scss';

export type ResultClasses = {
  root?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  icon?: string;
};

const resultIcons = {
  empty: EmptyBoxIcon,
  success: SuccessIcon,
} as const;

interface ResultProps {
  subTitle?: string;
  title: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  status?: keyof typeof resultIcons;
  prefixCls?: string;
  classes?: ResultClasses;
}

export const Result: React.FC<ResultProps> = ({
  subTitle,
  title,
  style,
  children,
  status = 'empty',
  classes,
}): React.ReactElement => {
  const rootClasses = clsx('d-flex flex-column align-items-center', classes?.root);
  const titleClasses = clsx(styles.title, classes?.title);
  const subtitleClasses = clsx(classes?.subtitle);
  const contentClasses = clsx(classes?.content);
  const iconClasses = clsx('d-flex align-items-center justify-content-center mb-32', classes?.icon);

  const IconComponent = resultIcons[status];

  return (
    <div className={rootClasses} style={style}>
      {status && (
        <span className={iconClasses}>
          <IconComponent className={iconClasses} />
        </span>
      )}
      <Typography className={titleClasses}>{title}</Typography>
      {subTitle && <div className={subtitleClasses}>{subTitle}</div>}
      {children && <div className={contentClasses}>{children}</div>}
    </div>
  );
};
