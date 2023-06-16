import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/Header.css';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Context from '../context/Context';

export default function Header(props) {
  const [searchBarIsActive, setSearchBarIsActive] = useState(false);
  const { haveHeaderSearch, pageName } = props;
  const history = useHistory();

  const { searchInput, setSearchInput } = useContext(Context);

  const handleProfileClick = () => {
    history.push('/profile');
  };

  return (
    <header>
      <button
        data-testid="profile-top-btn"
        onClick={ () => handleProfileClick() }
        src={ profileIcon }
      >
        Profile
        {/* <img src={ profileIcon } alt="profile" /> */}
      </button>
      <div>
        {haveHeaderSearch && (
          <button
            data-testid="search-top-btn"
            onClick={ () => setSearchBarIsActive(!searchBarIsActive) }
            src={ searchIcon }
          >
            🔎
          </button>
        )}
        {
          searchBarIsActive && (
            <>
              <input
                type="text"
                data-testid="search-input" // esse input é o que vai servir para pesquisar
                value={ searchInput }
                onChange={ (e) => { setSearchInput(e.target.value); } }
              />
              <SearchBar />
            </>
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
