import React from 'react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Footer from '../components/Footer';
import renderWithRouter from './utils/renderWithRouter';

describe('Desenvolva testes para cobertura do componente Footer', () => {
  test('Testa os botões do footer', () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRouter(
      <Footer history={ history } />,
    );

    const drinksButton = getByTestId('drinks-bottom-btn');
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');
  });

  test('navigates to /meals when meals button is clicked', () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRouter(
      <Footer history={ history } />,
    );

    const mealsButton = getByTestId('meals-bottom-btn');
    userEvent.click(mealsButton);

    expect(history.location.pathname).toBe('/meals');
  });
});
