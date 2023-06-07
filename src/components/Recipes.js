import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Context from '../context/Context';

export default function Recipes(props) {
  const history = useHistory();
  const whatPage = history.location.pathname;

  const { typeOfRecipe } = props;
  const { recipes,
    categories, setFilterByCategorie, filteredRecipes,
    setFilteredRecipes } = useFetch(typeOfRecipe);
  // console.log);
  // const usedRecipes = filteredRecipes === [] ? recipes : filteredRecipes;
  const id = typeOfRecipe === 'meals' ? 'idMeal' : 'idDrink';
  const recipeName = typeOfRecipe === 'meals' ? 'strMeal' : 'strDrink';
  const thumb = typeOfRecipe === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const numberOfRecipes = 12;
  const numberOfCategories = 5;

  const { searchedMeals, searchedDrinks } = useContext(Context);

  function changeFilteredRecipes() {
    if (whatPage === '/meals' && searchedMeals.meals.length > 0) {
      setFilteredRecipes(searchedMeals.meals);
    }
    if (whatPage === '/drinks' && searchedDrinks.drinks.length > 0) {
      setFilteredRecipes(searchedDrinks.drinks);
    }
  }

  useEffect(() => {
    changeFilteredRecipes();
  }, [searchedMeals, searchedDrinks]);

  console.log(filteredRecipes);
  return (
    <>
      <div className="categories">
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
      { (filteredRecipes.length !== 0 ? filteredRecipes : recipes)
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
      {/* {(filteredRecipes.length !== 0 ? filteredRecipes : recipes)
        .filter((recipe, index) => index < numberOfRecipes)
        .map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe[id] }>
            <h3 data-testid={ `${index}-card-name` }>{recipe[recipeName]}</h3>
            <img
              src={ recipe[thumb] }
              alt={ recipe[id] }
              data-testid={ `${index}-card-img` }
            />
          </div>))} */}
    </>
  );
}

Recipes.propTypes = {
  typeOfRecipe: PropTypes.string,
}.isRequired;
