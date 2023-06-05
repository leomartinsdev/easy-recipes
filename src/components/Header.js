import React from 'react';
import PropTypes from 'prop-types';

export default function Header(props) {
  const { haveHeadSearch, pageName } = props;
  return (
    <header>
      <img
        src="../images/profileIcon.svg"
        alt="profile"
        data-testid="profile-top-btn"
      />
      {haveHeadSearch && (
        <img
          src="../images/searchIcon.svg"
          alt="search"
          data-testid="search-top-btn"
        />
      )}
      <h1 data-testid="page-title">{pageName}</h1>
    </header>
  );
}

Header.propTypes = {
  haveHeadSearch: PropTypes.bool,
  pageName: PropTypes.string,
}.isRequired;
