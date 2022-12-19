import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import { Container } from 'components/Container';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { AuthApi } from 'services/api/AuthApi';
import { RegisterSupplierData } from 'services/types';

import { useIsLoading } from '../../../../hooks/useIsLoading';
import { FormError, ResponseFormError } from '../../../../redux/ducks/user/types/state';
import { createAreaByName } from '../../../../utils/normalizers/addressNormalizer';
import { responseErrorsNormalize } from '../../../../utils/responseErrorsNormalize';
import { getSteps, initialFormData } from './constants';
import styles from './RegisterSupplier.module.scss';
import SupplierAboutStep from './SupplierAboutStep';
import SupplierContactInformationStep from './SupplierContactInformationStep';
import { SupplierLocationStep } from './SupplierLocationStep';
import { SupplierFormData } from './types';

export const RegisterSupplier: React.FC<{ registerRole: 'supplier' | 'cloud-kitchen' }> = ({
  registerRole,
}): React.ReactElement => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [completed, setCompleted] = React.useState<Record<number, boolean>>({});
  const [formData, setFormData] = React.useState<SupplierFormData>(initialFormData);
  const [errors, setErrors] = React.useState<FormError[]>();
  const [isLoading, loading, loaded] = useIsLoading();
  const [formFilled, toggleFormCompleted] = React.useState(false);

  const router = useRouter();
  const steps = getSteps();

  const totalSteps = (): number => steps.length;
  const isLastStep = (): boolean => activeStep === totalSteps() - 1;
  const handleStep = (step: number) => (): void => setActiveStep(step);

  const handleErrorsResponse = (errorResponse: ResponseFormError[]): void => {
    const normalizedErrors = responseErrorsNormalize(errorResponse);

    const firstError = normalizedErrors[0];

    setErrors(normalizedErrors);

    if (firstError) {
      switch (firstError.field.split('.')[0]) {
        case 'company':
          setActiveStep(0);
          break;
        case 'locationInfo':
          setActiveStep(1);
          break;
        case 'contactInfo':
          setActiveStep(2);
          break;
        default:
          break;
      }
    }
  };

  const onSubmit = async (): Promise<void> => {
    if (!formData) {
      throw new Error(`Unexpected value, expected object type SupplierFormData, but got null`);
    }

    const normalizeLinks = formData.contactInfo.links?.map(
      (link) => `https://${link.value.replace(/http(s)?:\/\//, '')}`,
    );

    const preparedData: RegisterSupplierData = {
      ...formData,
      contactInfo: {
        ...formData.contactInfo,
        links: normalizeLinks,
        phone: formData.contactInfo.phone,
      },
      locationInfo: {
        ...formData.locationInfo,
        area: createAreaByName(formData.locationInfo.area),
      },
    };

    try {
      loading();
      await AuthApi.registerSupplier(preparedData, registerRole);
      router.push('/admin/register/success');
    } catch (error) {
      toggleFormCompleted(false);
      loaded();

      if (error.response.status === 422) {
        handleErrorsResponse(error.response.data.errors as ResponseFormError[]);
      }
    }
  };

  React.useEffect(() => {
    if (formFilled) {
      onSubmit();
    }
  }, [formFilled]);

  const handleComplete = (formFields: SubmitHandler<SupplierFormData>): void => {
    setFormData((prevState: SupplierFormData) => ({ ...prevState, ...formFields }));

    setCompleted({
      ...completed,
      [activeStep]: true,
    });

    if (activeStep === 2) {
      toggleFormCompleted(true);
    }

    if (!isLastStep()) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Container>
      <div className={styles.root}>
        <div className="mt-40 mb-40 pl-20 pr-20 text-center">
          <Typography className={styles.pageTitle} variant="h3">
            Apply to be a {registerRole === 'supplier' ? 'supplier' : 'cloud kitchen'}
          </Typography>
          <Typography>
            {registerRole === 'supplier'
              ? 'Join the unknown family of suppliers of top quality Food, Beverage, and Kitchenware and get your products endorsed by Influential Chefs.'
              : 'Join the unknown family of Cloud Kitchen Operators and execute dishes and recipes of highly influential Chefs.'}
          </Typography>
        </div>
        <Paper elevation={0} style={{ overflow: 'hidden' }}>
          <Stepper activeStep={activeStep} classes={{ root: styles.stepper }} color="secondary" nonLinear>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={handleStep(index)} disabled={!completed[index]} completed={completed[index]}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div className={styles.formWrapper}>
            <div className={`${activeStep === 1 ? styles.stepperInnerLocation : styles.stepperInner} mt-20`}>
              {activeStep === 0 && (
                <SupplierAboutStep
                  description={formData?.company.description}
                  name={formData?.company.name}
                  type={formData?.company.type}
                  image={formData?.company.image}
                  onNext={handleComplete}
                  responseErrors={errors}
                />
              )}
              {activeStep === 1 && Object.keys(formData).length > 0 && (
                <SupplierLocationStep
                  area={formData?.locationInfo.area}
                  building={formData?.locationInfo.building}
                  apartment={formData?.locationInfo.apartment}
                  street={formData?.locationInfo.street}
                  city={formData?.locationInfo.city}
                  responseErrors={errors}
                  notes={formData?.locationInfo.notes}
                  lat={formData?.locationInfo.lat}
                  long={formData?.locationInfo.long}
                  onNext={handleComplete}
                />
              )}
              {activeStep === 2 && (
                <SupplierContactInformationStep
                  loading={isLoading}
                  responseErrors={errors}
                  name={formData?.contactInfo.name}
                  email={formData?.contactInfo.email}
                  phone={formData?.contactInfo.phone}
                  onNext={handleComplete}
                />
              )}
            </div>
          </div>
        </Paper>
      </div>
    </Container>
  );
};
