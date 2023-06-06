import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const history = useHistory();

  const validateForm = () => {
    const SIX = 6;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(email);
    setIsEmailValid(emailValid);
    const passwordValid = password.length > SIX;
    setIsPasswordValid(passwordValid);
  };

  useEffect(() => {
    validateForm();
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateForm();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateForm();
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push('/meals');
    localStorage.setItem('user', JSON.stringify({ email }));
  };
  return (
    <form>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          data-testid="email-input"
          id="email"
          value={ email }
          onChange={ handleEmailChange }
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          data-testid="password-input"
          id="password"
          value={ password }
          onChange={ handlePasswordChange }
        />
      </div>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !isEmailValid || !isPasswordValid }
        onClick={ (event) => handleClick(event) }
      >
        Entrar
      </button>
    </form>
  );
}
