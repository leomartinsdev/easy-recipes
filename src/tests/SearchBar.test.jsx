import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando componente Header', () => {
  it('verifica se o componente SearchBar renderiza e desrenderiza na tela', () => {
    renderWithRouter(<App />, '/drinks');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    screen.getByTestId('ingredient-search-radio');
    screen.getByTestId('name-search-radio');
    screen.getByTestId('first-letter-search-radio');

    const searchInput = screen.getByTestId('search-input');
    screen.getByTestId('exec-search-btn');

    userEvent.click(searchTopBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
  it('função onChange', () => {
    renderWithRouter(<App />, '/drinks');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    screen.getByTestId('ingredient-search-radio');
    screen.getByTestId('name-search-radio');
    screen.getByTestId('first-letter-search-radio');

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Abobrinha Recheada' } });
    expect(searchInput.value).toBe('Abobrinha Recheada');
  });
});
