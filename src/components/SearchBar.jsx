import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function SearchBar() {
  const [filterBy, setFilterBy] = useState('');
  const { searchInput,
    searchedMeals,
    setSearchedMeals,
    searchedDrinks,
    setSearchedDrinks } = useContext(Context);

  const history = useHistory();
  const whatPage = history.location.pathname;

  const checkSearched = useCallback(() => {
    if (searchedMeals.meals.length === 1) {
      history.push(`/meals/${searchedMeals.meals[0].idMeal}`);
    }
    if (searchedDrinks.drinks.length === 1) {
      history.push(`/drinks/${searchedDrinks.drinks[0].idDrink}`);
    }
  }, [searchedDrinks, searchedMeals, history]);

  function saveResults(json) {
    if (whatPage === '/meals') {
      setSearchedMeals(json);
    } else if (whatPage === '/drinks') {
      setSearchedDrinks(json);
    }
  }

  useEffect(() => {
    checkSearched();
  }, [searchedMeals, searchedDrinks, checkSearched]);

  // Ao clicar no botão de Pesquisar, executa a função abaixo.
  async function handleSearchBtn() {
    switch (filterBy) {
    case 'Ingredient':
      try {
        const url = whatPage === '/meals' ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
        const data = await fetch(url);
        const json = await data.json();
        saveResults(json);
      } catch (error) {
        console.log(error);
      }
      break;
    case 'Name':
      try {
        const url = whatPage === '/meals' ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
        const data = await fetch(url);
        const json = await data.json();
        saveResults(json);
      } catch (error) {
        console.log(error);
      }
      break;
    case 'FirstLetter':
      try {
        const url = whatPage === '/meals' ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}` : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
        const data = await fetch(url);
        const json = await data.json();
        saveResults(json);
      } catch {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      return true;
    }
  }

  return (
    <div>
      <label htmlFor="searchIngrediente">
        Ingredient
        <input
          type="radio"
          name="searchRadioBtns"
          id="searchIngrediente"
          data-testid="ingredient-search-radio"
          onClick={ () => setFilterBy('Ingredient') }
        />
      </label>

      <label htmlFor="searchName">
        Name
        <input
          type="radio"
          name="searchRadioBtns"
          id="searchName"
          data-testid="name-search-radio"
          onClick={ () => setFilterBy('Name') }
        />
      </label>

      <label htmlFor="firstLetter">
        First Letter
        <input
          type="radio"
          name="searchRadioBtns"
          id="firstLetter"
          data-testid="first-letter-search-radio"
          onClick={ () => setFilterBy('FirstLetter') }
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearchBtn }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
