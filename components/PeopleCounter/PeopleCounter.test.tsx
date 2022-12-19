import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { PeopleCounter } from '.';

test('render PeopleCounter', () => {
  let guests = { people: 0 };
  const handleChangeCounter = (data): void => {
    guests = data;
  };
  const { container } = render(<PeopleCounter onChange={handleChangeCounter} guests={guests} />);

  expect(container.querySelector('p')).toHaveTextContent(/people/i);
});

test('increment peoples', () => {
  let guests = { people: 0 };
  const handleChangeCounter = (data): void => {
    guests = data;
  };
  const { container } = render(<PeopleCounter onChange={handleChangeCounter} guests={guests} />);
  const plusButton = container.querySelector('[data-testid="people"]')?.querySelector('[data-testid="plusButton"]');

  if (plusButton) {
    fireEvent.click(plusButton);
  }

  expect(guests.people === 1).toBeTruthy();
  expect(container.querySelector('[data-testid="people"]')?.querySelector('[data-testid="count"]')).toHaveTextContent(
    '1',
  );
});

test('decrement people', () => {
  let guests = { people: 0 };
  const handleChangeCounter = (data): void => {
    guests = data;
  };
  const { container } = render(<PeopleCounter onChange={handleChangeCounter} guests={{ people: 0 }} />);
  const plusButton = container.querySelector('[data-testid="people"]')?.querySelector('[data-testid="plusButton"]');

  if (plusButton) {
    fireEvent.click(plusButton);
  }

  const minusButton = container.querySelector('[data-testid="people"]')?.querySelector('[data-testid="minusButton"]');

  if (minusButton) {
    fireEvent.click(minusButton);
  }

  expect(guests.people === 0).toBeTruthy();
  expect(container.querySelector('[data-testid="people"]')?.querySelector('[data-testid="count"]')).toBeNull();
});
