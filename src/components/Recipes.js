import React from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export default function Recipes(props) {
  const { typeOfRecipe } = props;
  const { recipes } = useFetch(typeOfRecipe);
  const id = typeOfRecipe === 'meals' ? 'idMeal' : 'idDrink';
  const recipeName = typeOfRecipe === 'meals' ? 'strMeal' : 'strDrink';
  const thumb = typeOfRecipe === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const numberOfRecipes = 12;
  console.log(recipes);
  return (
    <>
      <h2>teste</h2>
      {recipes
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
