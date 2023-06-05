import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/Header.css';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const [searchBarIsActive, setSearchBarIsActive] = useState(false);
  const { haveHeaderSearch, pageName } = props;
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  return (
    <header>
      <button
        data-testid="profile-top-btn"
        onClick={ () => handleProfileClick() }
      >
        <img src={ profileIcon } alt="profile" />
      </button>
      <div>
        {haveHeaderSearch && (
          <button
            data-testid="search-top-btn"
            onClick={ () => setSearchBarIsActive(!searchBarIsActive) }
          >
            <img
              src={ searchIcon }
              alt="search"
            />
          </button>
        )}
        {
          searchBarIsActive && (
            <input
              type="text"
              data-testid="search-input"
            />
          )
        }
      </div>
      <h1 data-testid="page-title">{pageName}</h1>
    </header>
  );
}

Header.propTypes = {
  haveHeadSearch: PropTypes.bool,
  pageName: PropTypes.string,
}.isRequired;
