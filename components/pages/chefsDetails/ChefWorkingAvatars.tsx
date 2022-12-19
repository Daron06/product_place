import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { AvatarGroup } from '@material-ui/lab';
import { WorkingExperienceItem } from 'components/pages/admin/Register';
import React from 'react';

import styles from './ChefsDetails.module.scss';

interface ChefWorkingAvatarsProps {
  workingExperience: WorkingExperienceItem[];
}

export const ChefWorkingAvatars: React.FC<ChefWorkingAvatarsProps> = ({ workingExperience }): React.ReactElement => {
  return (
    <div className={styles.chefWorkingAvatars}>
      <AvatarGroup max={4}>
        {workingExperience.map((item) => (
          <Avatar alt="Remy Sharp" key={item.name} src={item.photo} />
        ))}
      </AvatarGroup>
      {workingExperience.length > 4 && (
        <div className="ml-10">
          <Typography className={styles.lightText} variant="body2">
            Worked before in {workingExperience.length} restaurants
          </Typography>
        </div>
      )}
    </div>
  );
};
