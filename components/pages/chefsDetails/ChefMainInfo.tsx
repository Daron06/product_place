import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from '@material-ui/lab';
import { FavoriteButton } from 'components/FavoriteButton';
import { WorkingExperienceItem } from 'components/pages/admin/Register';
import { ShareButton } from 'components/ShareButton';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectUserIsAuth } from '../../../redux/ducks/user/selectors';
import styles from './ChefsDetails.module.scss';

interface ChefMainInfoProps {
  loading?: boolean;
  avatar?: string;
  name?: string;
  description?: string;
  workingExperience?: WorkingExperienceItem[];
  links?: string[];
  jobRole?: string;
  isFavorite: boolean;
  onClickFavorite: () => void;
}

export const ChefMainInfo: React.FC<ChefMainInfoProps> = ({
  avatar,
  description,
  loading = false,
  name,
  isFavorite,
  onClickFavorite,
}): React.ReactElement => {
  const isAuth = useSelector(selectUserIsAuth);

  return (
    <div className={styles.mainInfo}>
      <div className={styles.avatarWrapper}>
        {loading ? (
          <Skeleton animation="wave" variant="circle" width={367} height={367} />
        ) : (
          <Avatar classes={{ root: styles.avatar }} src={avatar} />
        )}
      </div>
      <div className="d-flex flex-column pt-20 flex-auto">
        <div className="d-flex align-items-center">
          <Typography className={styles.name}>{loading ? <Skeleton width="200px" /> : name}</Typography>
          {!loading && (
            <div className="ml-auto d-flex align-items-center">
              {isAuth && <FavoriteButton onClick={onClickFavorite} active={isFavorite} variant="page" />}
            </div>
          )}
        </div>
        <ShareButton url={typeof window !== 'undefined' ? window.location.href : ''} title={name} />
        <Typography variant="body1" className={styles.chefDescription}>
          {loading ? (
            <span className="d-flex flex-column">
              <Skeleton />
              <Skeleton width="80%" />
              <Skeleton width="50%" />
            </span>
          ) : (
            description
          )}
        </Typography>
      </div>
    </div>
  );
};
