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
    setFilteredRecipes, filterByCategorie } = useFetch(typeOfRecipe);
  // const usedRecipes = filteredRecipes === [] ? recipes : filteredRecipes;
  const id = typeOfRecipe === 'meals' ? 'idMeal' : 'idDrink';
  const recipeName = typeOfRecipe === 'meals' ? 'strMeal' : 'strDrink';
  const thumb = typeOfRecipe === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const numberOfRecipes = 12;
  const numberOfCategories = 5;


  // função que verifica se a categoria selecionada esta sendo selecionada uma segunda vez
  const verifyFilter = (strCategory) => {
    if (strCategory === filterByCategorie) {
      setFilterByCategorie('');
    } else {
      setFilterByCategorie(strCategory);
    }
  };

  const handleCardClick = (redipeId) => {
    history.push(`/${typeOfRecipe}/${redipeId}`);
  };
  const { searchedMeals, searchedDrinks } = useContext(Context);

  function changeFilteredRecipes() {
    if (searchedMeals.meals == null || searchedDrinks.drinks == null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (whatPage === '/meals' && searchedMeals.meals.length > 0) {
      setFilteredRecipes(searchedMeals.meals);
    } else if (whatPage === '/drinks' && searchedDrinks.drinks.length > 0) {
      setFilteredRecipes(searchedDrinks.drinks);
    }
  }

  useEffect(() => {
    changeFilteredRecipes();
  }, [searchedMeals, searchedDrinks]);

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
              onClick={ () => verifyFilter(strCategory) }
            >
              {strCategory}
            </button>
          ))}
      </div>
      {(filteredRecipes.length > 0 ? filteredRecipes : recipes)
        .filter((recipe, index) => index < numberOfRecipes)
        .map((recipe, index) => (
          <button
            data-testid={ `${index}-recipe-card` }
            key={ recipe[id] }
            onClick={ () => handleCardClick(recipe[id]) }
          >
            <h3 data-testid={ `${index}-card-name` }>{recipe[recipeName]}</h3>
            <img
              src={ recipe[thumb] }
              alt={ recipe[id] }
              data-testid={ `${index}-card-img` }
            />
          </button>))}
       //   </div>))}
      {/* ----->>>>>> NÃO APAGAR A PARTE DE BAIXO DE JEITO NENHUM <<<<<------*/ }
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
