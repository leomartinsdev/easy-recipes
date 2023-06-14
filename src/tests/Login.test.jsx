import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

const EMAIL = 'email-input';
const PASSWORD = 'password-input';
const BUTTON = 'login-submit-btn';

describe('Desenvolva testes para cobertura da tela de Login', () => {
  test('A rota deve ser o / ', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });
  test('Local Storage', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.queryByTestId(EMAIL);
    const passwordInput = screen.queryByTestId(PASSWORD);
    const getButton = screen.queryByTestId(BUTTON);
    userEvent.type(inputEmail, 'teste@trybe.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(getButton);
    expect(localStorage.getItem('user')).toBe('teste@trybe.com');
  });

  describe('Teste da rota Login', () => {
    test('Verifica se existe um campo de Email e Nome e suas especificações', () => {
      renderWithRouter(<App />);
      const getEmail = screen.getByTestId(EMAIL);
      const getPassword = screen.getByTestId(PASSWORD);
      expect(getEmail).toBeInTheDocument();
      expect(getPassword).toBeInTheDocument();
    });
    test('Verifica o botão e suas especificações', () => {
      const { getByText } = renderWithRouter(<App />);
      const getButton = getByText('Entrar');
      expect(getButton).toBeInTheDocument();
    });
  });

  describe('Teste do comportamento do botões', () => {
    test('Teste do comportamento do botão Entrar', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const getButton = getByTestId(BUTTON);
      expect(getButton).toBeDisabled();
      const getEmail = screen.getByText('E-mail:');
      userEvent.type(getEmail, 'test@trybe.com');
      const getSenha = screen.getByText('Senha:');
      userEvent.type(getSenha, '1234567');
      expect(getButton).not.toBeDisabled();
    });
    test('Teste se o clique do botão leva pro local correto', async () => {
      const { history } = renderWithRouter(<App />);
      const inputEmail = screen.queryByTestId(EMAIL);
      const inputSenha = screen.queryByTestId(PASSWORD);
      const getButton = screen.queryByTestId(BUTTON);
      const senha = '1234567';
      const validEmail = 'email@gmail.com';
      userEvent.type(inputEmail, validEmail);
      userEvent.type(inputSenha, senha);
      userEvent.click(getButton);
      expect(history.location.pathname).toBe('/meals');
    });
  });
});
