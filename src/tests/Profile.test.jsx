import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import Profile from '../pages/Profile';

const EMAIL = 'email-input';
const PASSWORD = 'password-input';
const BUTTON = 'login-submit-btn';
const DONE_RECIPES_BTN = 'profile-done-btn';
const FAVORITE_BTN = 'profile-favorite-btn';
const LOGOUT_BTN = 'profile-logout-btn';

describe('Desenvolva testes para cobertura da tela de Profile', () => {
  test('A rota deve ser o /profile ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');
  });
  test('Teste se o email é renderizado na tela', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.queryByTestId(EMAIL);
    const passwordInput = screen.queryByTestId(PASSWORD);
    const getButton = screen.queryByTestId(BUTTON);
    userEvent.type(inputEmail, 'teste@trybe.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(getButton);
    act(() => {
      history.push('/profile');
    });
    const emailProfile = screen.queryByTestId('profile-email');
    expect(emailProfile).toBeInTheDocument();
  });
  test('Botão Done Recipes direciona pra page correspondente', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneBtn = screen.queryByTestId(DONE_RECIPES_BTN);
    expect(doneBtn).toBeInTheDocument();
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('Botão Favorite Recipes direciona pra page correspondente', () => {
    const { history } = renderWithRouter(<Profile />);
    const favoriteBtn = screen.queryByTestId(FAVORITE_BTN);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('Botão Logout direciona pra page correspondente', () => {
    const { history } = renderWithRouter(<Profile />);
    const logoutBtn = screen.queryByTestId(LOGOUT_BTN);
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
