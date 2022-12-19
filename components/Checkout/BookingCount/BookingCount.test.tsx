import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { BookingCount } from './index';

const BookingCountWrapper: React.FC = ({ children }) => {
  const form = useForm({
    defaultValues: {
      guests: {
        adults: 1,
      },
    },
  });
  return <FormProvider {...form}>{children}</FormProvider>;
};

describe('BookingCount', () => {
  let wrapper;

  const getButton = (container, parentElement, attribute): HTMLElement => {
    return container.querySelector(`[data-testid="${parentElement}"]`)?.querySelector(`[data-testid="${attribute}"]`);
  };

  beforeEach(() => {
    // eslint-disable-next-line react/display-name
    wrapper = ({ children }): any => <BookingCountWrapper>{children}</BookingCountWrapper>;
  });

  it('should render', () => {
    const { container } = render(<BookingCount type="at-home" isPrivate count={10} />, { wrapper });

    expect(container.querySelector('h6')).toHaveTextContent(/Who’s attending?/i);
  });

  it('The private group switch is hidden', () => {
    const { container } = render(<BookingCount type="at-home" isPrivate count={10} />, { wrapper });
    expect(container.querySelector('[name="isPrivateGroup"]')).not.toBeInTheDocument();
  });

  it('Private group switch is checked', () => {
    const { container } = render(<BookingCount type="at-restaurant" isPrivate count={10} />, { wrapper });
    expect(container.querySelector('[name="isPrivateGroup"]')).toBeInTheDocument();
    expect(container.querySelector('[name="isPrivateGroup"]')).toBeChecked();
  });

  it('Switch private group button', () => {
    const { container } = render(<BookingCount type="at-restaurant" isPrivate count={10} />, { wrapper });
    const privateGroupSwitch = container.querySelector('[name="isPrivateGroup"]');

    expect(container.querySelector('[data-testid="maxCapacityMsg"]')).toBeInTheDocument();

    if (privateGroupSwitch) {
      fireEvent.change(privateGroupSwitch);
    }

    expect(container.querySelector('[data-testid="plusButton"]')).toBeDisabled();
    expect(container.querySelector('[data-testid="minusButton"]')).toBeDisabled();
  });

  it('Reach the maximum guests value', async () => {
    const { container } = await render(<BookingCount type="at-restaurant" isPrivate={false} count={3} />, { wrapper });

    await fireEvent.click(getButton(container, 'adults', 'plusButton'));
    await fireEvent.click(getButton(container, 'adults', 'plusButton'));
    await fireEvent.click(getButton(container, 'adults', 'plusButton'));

    expect(getButton(container, 'adults', 'plusButton')).toBeDisabled();
  });
});
