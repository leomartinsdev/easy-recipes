import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Context from '../context/Context';

export default function Recipes() {
  const history = useHistory();
  const whatPage = history.location.pathname.substring(1);
  const { recipes,
    categories, setFilterByCategorie, filteredRecipes,
    setFilteredRecipes, filterByCategorie } = useFetch(whatPage);
  // const usedRecipes = filteredRecipes === [] ? recipes : filteredRecipes;
  const id = whatPage === 'meals' ? 'idMeal' : 'idDrink';
  const recipeName = whatPage === 'meals' ? 'strMeal' : 'strDrink';
  const thumb = whatPage === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
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

  const handleCardClick = (recipeId) => {
    history.push(`/${whatPage}/${recipeId}`);
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
          <div
            data-testid={ `${index}-recipe-card` }
            key={ recipe[id] }
            role="presentation"
            onClick={ () => handleCardClick(recipe[id]) }
          >
            <h3 data-testid={ `${index}-card-name` }>{recipe[recipeName]}</h3>
            <img
              src={ recipe[thumb] }
              alt={ recipe[id] }
              data-testid={ `${index}-card-img` }
            />
          </div>))}
      {/* filteredRecipes.length !== 0 ? filteredRecipes : recipes)
        .filter((recipe, index) => index < numberOfRecipes)
        .map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe[id] }>
            <h3 data-testid={ `${index}-card-name` }>{recipe[recipeName]}</h3>
            <img
              src={ recipe[thumb] }
              alt={ recipe[id] }
              data-testid={ `${index}-card-img` }
            />
          </div> */}
    </>
  );
}
