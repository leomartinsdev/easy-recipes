import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Header from '../components/Header';
import Meals from '../pages/Meals';

const SEARCH_BTN = 'search-top-btn';
const PROFILE_BTN = 'profile-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Desenvolva testes para cobertura do componente Header', () => {
  test('Teste geral do funcionamento do header', () => {
    renderWithRouter(<Meals />);

    const mealsTitle = screen.getByRole('heading', { name: /meals/i, level: 1 });
    const profileBtn = screen.getByTestId(PROFILE_BTN);
    const searchBtn = screen.getByTestId(SEARCH_BTN);
    const searchInput = screen.getByTestId(SEARCH_INPUT);

    expect(mealsTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    test('Verifica rotas do Profile', () => {
      const { history } = renderWithRouter(<Meals />);
      userEvent.click(profileBtn);
      expect(history.location.pathname).toBe('/profile');
      expect(profileBtn).toBeInTheDocument();
      expect(searchBtn).not.toBeInTheDocument();
      expect(screen.getByText(/profile/i)).toBeInTheDocument();
    });

    test('Teste do botão em relação com o input', () => {
      renderWithRouter(<Meals />);
      userEvent.click(searchBtn);
      expect(searchInput).toBeInTheDocument();
      userEvent.click(searchBtn);
      expect(searchInput).not.toBeInTheDocument();
    });

    test('Verifica se o header aparece nas paginas corretas e corretamente', () => {
      const { history } = renderWithRouter(<Header />);
      const titleElement = screen.getByTestId('page-title');

      switch (history.location.pathname) {
      case '/meals':
        expect(titleElement).toHaveTextContent('Meals');
        expect(searchBtn).toBeInTheDocument();
        break;
      case '/drinks':
        expect(titleElement).toHaveTextContent('Drinks');
        expect(searchBtn).toBeInTheDocument();
        break;
      case '/profile':
        expect(titleElement).toHaveTextContent('Profile');
        expect(searchBtn).not.toBeInTheDocument();
        break;
      case '/done-recipes':
        expect(titleElement).toHaveTextContent('Done Recipes');
        expect(searchBtn).not.toBeInTheDocument();
        break;
      case '/favorite-recipes':
        expect(titleElement).toHaveTextContent('Favorite Recipes');
        expect(searchBtn).not.toBeInTheDocument();
        break;
      default:
        expect(titleElement).toHaveTextContent('');
      }
    });
  });
});
