import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

// const INITIAL_STATE = { nome: 'Xablau' };

export default function Provider({ children }) {
  // const [state] = useState(INITIAL_STATE);

  // Inputs do Header que serão usados no componente Search Bar
  const [searchInput, setSearchInput] = useState('');

  const values = { searchInput, setSearchInput };

  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element,
}.isRequired;
