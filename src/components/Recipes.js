import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export default function Recipes(props) {
  const { typeOfRecipe } = props;
  const { recipes, categories, setFilterByCategorie,
    filteredRecipes, setFilteredRecipes } = useFetch(typeOfRecipe);
  const id = typeOfRecipe === 'meals' ? 'idMeal' : 'idDrink';
  const recipeName = typeOfRecipe === 'meals' ? 'strMeal' : 'strDrink';
  const thumb = typeOfRecipe === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const numberOfRecipes = 12;
  const numberOfCategories = 5;
  return (
    <>
      <div className="filter-categories">
        <button
          data-testid="All-category-filter"
          onClick={ () => setFilteredRecipes([]) }
        >
          All
        </button>
        {categories
          .filter((categorie, index) => index < numberOfCategories)
          .map(({ strCategory }) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
              onClick={ () => setFilterByCategorie(strCategory) }
            >
              {strCategory}
            </button>
          ))}
      </div>
      {(filteredRecipes.length > 0 ? filteredRecipes : recipes)
        .filter((recipe, index) => index < numberOfRecipes)
        .map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe[id] }>
            <h3 data-testid={ `${index}-card-name` }>{recipe[recipeName]}</h3>
            <img
              src={ recipe[thumb] }
              alt={ recipe[id] }
              data-testid={ `${index}-card-img` }
            />
          </div>))}
    </>
  );
}

Recipes.propTypes = {
  typeOfRecipe: PropTypes.string,
}.isRequired;
