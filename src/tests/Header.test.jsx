import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

const SEARCH_BTN = 'search-top-btn';
const PROFILE_BTN = 'profile-top-btn';
const SEARCH_INPUT = 'search-input';
const PAGE_TITLE = 'page-title';

describe('Testes do componente header', () => {
  test('Teste /meals', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toHaveTextContent('Meals');
    const buttonSearch = screen.getByTestId(SEARCH_BTN);
    expect(buttonSearch).toBeInTheDocument();
  });

  test('Teste /drinks', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toHaveTextContent('Drinks');
    const buttonSearch = screen.getByTestId(SEARCH_BTN);
    expect(buttonSearch).toBeInTheDocument();
  });

  test('Teste /profile', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toHaveTextContent('Profile');
    const buttonSearch = screen.getByTestId(SEARCH_BTN);
    expect(buttonSearch).not.toBeInTheDocument();
  });

  test('Teste /Done Recipes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toHaveTextContent('Done Recipes');
  });

  test('Teste /Favorite Recipes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toHaveTextContent('Favorite Recipes');
  });

  test('Teste do botão de perfil', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const buttonProfile = screen.getByTestId(PROFILE_BTN);
    expect(buttonProfile).toBeInTheDocument();
    userEvent.click(buttonProfile);
    act(() => {
      history.push('/profile');
    });
  });

  test('Clique do search button com search input para habilitar', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const buttonSearch = screen.getByTestId(SEARCH_BTN);
    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    act(() => {
      userEvent.click(buttonSearch);
    });
    expect(inputSearch).toBeInTheDocument();
  });

  test('Clique do search button com search input para desabilitar', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const buttonSearch = screen.getByTestId(SEARCH_BTN);
    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    act(() => {
      userEvent.click(buttonSearch);
    });
    expect(inputSearch).toBeInTheDocument();
    act(() => {
      userEvent.click(buttonSearch);
    });
    expect(inputSearch).not.toBeInTheDocument();
  });
});
