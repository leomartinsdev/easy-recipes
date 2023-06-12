import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

// const INITIAL_STATE = { nome: 'Xablau' };

export default function Provider({ children }) {
  // const [state] = useState(INITIAL_STATE);

  // Inputs do Header que serão usados no componente Search Bar
  const [searchInput, setSearchInput] = useState('');

  // Meals encontradas ao utilizar a barra de pesquisa
  const [searchedMeals, setSearchedMeals] = useState({ meals: [] });

  // Drinks encontradas ao utilizar a barra de pesquisa
  const [searchedDrinks, setSearchedDrinks] = useState({ drinks: [] });

  const values = useMemo(() => ({
    searchInput,
    setSearchInput,
    searchedMeals,
    setSearchedMeals,
    searchedDrinks,
    setSearchedDrinks,
  }), [searchInput,
    setSearchInput,
    searchedMeals,
    setSearchedMeals,
    searchedDrinks,
    setSearchedDrinks]);

  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element,
}.isRequired;
