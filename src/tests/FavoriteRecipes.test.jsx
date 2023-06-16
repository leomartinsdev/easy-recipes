import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando a pagina FavoriteRecipes', () => {
  const url = '/favorite-recipes';
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  it('Verifica se as receitas renderizam corretamente', () => {
    renderWithRouter(<App />, url);
    const meal = screen.getByText(/corba/i);
    const drink = screen.getByText(/B-53/i);
    expect(meal).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
  });

  it('Verifica se ao clicar no nome da comida e redirecionado corretamente', () => {
    const { history } = renderWithRouter(<App />, url);
    const meal = screen.getByText(/corba/i);
    userEvent.click(meal);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
  });

  it('Verifica se ao clicar na imagem da comida e redirecionado corretamente', () => {
    const { history } = renderWithRouter(<App />, url);
    const meal = screen.getByRole('link', { name: /corba/i });
    within(meal).getByRole('img', { hidden: true });
    userEvent.click(meal);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
  });

  it('Verifica se ao clicar no nome do drink e redirecionado corretamente', () => {
    const { history } = renderWithRouter(<App />, url);
    const drink = screen.getByText(/B-53/i);
    userEvent.click(drink);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/13332');
  });

  it('Verifica se ao clicar na imagem do drink e redirecionado corretamente', () => {
    const { history } = renderWithRouter(<App />, url);
    const drink = screen.getByRole('link', { name: /B-53/i });
    within(drink).getByRole('img', { hidden: true });
    userEvent.click(drink);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/13332');
  });

  it('Testa o filtro de drinks', () => {
    renderWithRouter(<App />, url);
    const drink = screen.getByText(/B-53/i);
    const buttonDrink = screen.getByRole('button', { name: /Drinks/i });
    userEvent.click(buttonDrink);
    expect(drink).toBeInTheDocument();
  });

  it('Testa a funcao de desfavoritar', () => {
    renderWithRouter(<App />, url);
    const favButton = screen.getByTestId('1-horizontal-favorite-btn');
    const favButtonNext = screen.getByTestId('0-horizontal-favorite-btn');
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favoriteRecipes);
    userEvent.click(favButton);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')))
      .toEqual([favoriteRecipes[0]]);
    userEvent.click(favButtonNext);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([]);
  });
});
