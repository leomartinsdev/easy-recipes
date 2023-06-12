import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function RecipeInProgres() {
  const { id } = useParams();
  console.log('id:', id);
  const history = useHistory();
  const locPath = history.location.pathname;
  const whatPage = locPath.includes('meals') ? '/meals' : '/drinks';
  console.log(whatPage);

  const [recipeInfo, setRecipeInfo] = useState({
    name: '',
    src: '',
    instructions: '',
  });

  async function getFood() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await response.json();
    const data = json.meals;
    setRecipeInfo({
      name: data[0].strMeal,
      src: data[0].strImageSource,
      instructions: data[0].strInstructions,
    } || []);
  }

  async function getDrink() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await response.json();
    const data = json.drinks;
    setRecipeInfo({
      name: data[0].strMeal,
      src: data[0].strImageSource,
      instructions: data[0].strInstructions,
    } || []);
  }

  const drinkOrFood = () => {
    if (whatPage === '/meals') {
      getFood();
    } else {
      getDrink();
    }
  };

  useEffect(() => {
    drinkOrFood();
  }, []);

  return (
    <div>
      <h3 data-testid="recipe-title">{recipeInfo.name}</h3>
      <img
        data-testid="recipe-photo"
        src={ recipeInfo.src }
        alt="Foto da Comida"
      />
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <span data-testid="recipe-category">Categoria</span>
      <div data-testid="instructions">
        {recipeInfo.instructions}
      </div>
      <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
    </div>
  );
}

export default RecipeInProgres;
