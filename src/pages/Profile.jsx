import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')) : { email: '' };
  const history = useHistory();
  const handleLogout = () => {
    history.push('/');
    localStorage.clear();
  };
  return (
    <div>
      <h1>Profile</h1>
      <Header haveHeaderSearch={ false } pageName="Profile" />
      <h2 data-testid="profile-email">{email}</h2>
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => handleLogout() }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
