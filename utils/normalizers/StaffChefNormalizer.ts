import { WorkingExperienceItem } from '../../components/pages/admin/Register';
import { StaffChefFormFields } from '../../components/pages/admin/staff/chefs/details';

interface StaffChefNormalizerReturnType {
  chef: {
    name: string;
    jobRole: string;
    description: string;
    image: string;
    cover: string;
    links: string[];
    workingExperience: WorkingExperienceItem[];
    status: string;
  };
  userInformation: {
    email: string;
    phone: string;
    password: string;
    id: string;
  };
}

export const staffChefNormalizer = (formFields: StaffChefFormFields): StaffChefNormalizerReturnType => {
  return {
    chef: {
      name: formFields.name || '',
      jobRole: formFields.jobRole || '',
      description: formFields.description || '',
      image: formFields.image || '',
      cover: formFields.cover,
      links: formFields.links.map((o) => `https://${o.value.replace(/http(s)?:\/\//, '')}`) || [],
      workingExperience:
        formFields.workingExperience.map((obj) => {
          if (isNaN(Number(obj.id))) {
            // eslint-disable-next-line no-param-reassign
            delete obj.id;
          }
          return obj;
        }) || [],
      status: formFields.status,
    },
    userInformation: {
      email: formFields.email || '',
      phone: formFields.phone || '',
      password: formFields.password || '',
      id: formFields.id,
    },
  };
};
