import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Desenvolva testes para cobertura da tela de Login', () => {
  test('A rota deve ser o / ', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });

  describe('Teste da rota Login', () => {
    test('Verifica se existe um campo de Email e Nome e suas especificações', () => {
      renderWithRouter(<App />);
      const getEmail = screen.getByTestId('email-input');
      const getPassword = screen.getByTestId('password-input');
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
      const getButton = getByTestId('login-submit-btn');
      expect(getButton).toBeDisabled();
      const getEmail = screen.getByText('E-mail:');
      userEvent.type(getEmail, 'teste@trybe.com');
      const getName = screen.getByText('Senha:');
      userEvent.type(getName, '1234567');
      expect(getButton).not.toBeDisabled();
    });
    test('Teste se o clique do botão leva pro local correto', async () => {
      const { history } = renderWithRouter(<App />);
      const inputEmail = screen.queryByTestId('email-input');
      const inputName = screen.queryByTestId('password-input');
      const getButton = screen.queryByTestId('login-submit-btn');
      const senha = '1234567';
      const validEmail = 'email@gmail.com';
      userEvent.type(inputEmail, validEmail);
      userEvent.type(inputName, senha);
      userEvent.click(getButton);
      expect(history.location.pathname).toBe('/meals');
    });
  });
});
