import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="searchIngrediente">
        Ingredient
        <input
          type="radio"
          name="searchRadioBtns"
          id="searchIngrediente"
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="searchName">
        Name
        <input
          type="radio"
          name="searchRadioBtns"
          id="searchName"
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="firstLetter">
        First Letter
        <input
          type="radio"
          name="searchRadioBtns"
          id="firstLetter"
          data-testid="first-letter-search-radio"
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
