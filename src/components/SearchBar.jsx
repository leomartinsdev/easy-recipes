import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function SearchBar() {
  const [filterBy, setFilterBy] = useState('');
  const { searchInput } = useContext(Context);
  console.log(filterBy);

  const handleSearchBtn = async () => {
    switch (filterBy) {
    case 'Ingredient':
      try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
        const json = await data.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
      break;
    case 'Name':
      try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const json = await data.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
      break;
    case 'FirstLetter':
      try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
        const json = await data.json();
        console.log(json);
      } catch {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      return true;
    }
  };

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
