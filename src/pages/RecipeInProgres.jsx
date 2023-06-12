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
    category: '',
    ingredients: [],
    instructions: '',
  });

  async function getFood() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await response.json();
    const data = json.meals;
    console.log(data); // é um array com um objeto com as chaves que são usadas no código abaixo.
    const ingredientsArray = [];
    const maxIngredients = 20;
    for (let i = 1; i <= maxIngredients; i += 1) {
      const ingredientKey = `strIngredient${i}`;
      const ingredientValue = data[0][ingredientKey];

      if (ingredientValue && ingredientKey !== '') {
        ingredientsArray.push(ingredientValue);
      }
    }
    setRecipeInfo({
      name: data[0].strMeal,
      src: data[0].strImageSource,
      category: data[0].strCategory,
      ingredients: ingredientsArray,
      instructions: data[0].strInstructions,
    } || []);
  }

  async function getDrink() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await response.json();
    const data = json.drinks;
    const ingredientsArray = [];
    const maxIngredients = 20;
    for (let i = 1; i <= maxIngredients; i += 1) {
      const ingredientKey = `strIngredient${i}`;
      const ingredientValue = data[0][ingredientKey];

      if (ingredientValue && ingredientKey !== '') {
        ingredientsArray.push(ingredientValue);
      }
    }
    setRecipeInfo({
      name: data[0].strMeal,
      src: data[0].strImageSource,
      category: data[0].strCategory,
      ingredients: ingredientsArray,
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
      <span data-testid="recipe-category">{recipeInfo.category}</span>
      <br />
      <div>
        Ingredients:
        <br />
        {
          recipeInfo.ingredients.map((ingredient, index) => (
            <div key={ index }>
              <label
                htmlFor={ ingredient }
                data-testid={ `${index}-ingredient-step` }
              >
                {ingredient}
                {' '}
                <input type="checkbox" name={ ingredient } id={ ingredient } />
              </label>
            </div>))
        }
      </div>
      <br />
      <span data-testid="instructions">
        {recipeInfo.instructions}
      </span>
      <br />
      <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
    </div>
  );
}

export default RecipeInProgres;
