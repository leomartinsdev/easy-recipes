import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import EachIngredient from '../components/EachIngredient';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { saveItem, getItem } from '../services/localStorage';

function RecipeInProgres() {
  const { id } = useParams();
  const history = useHistory();
  const locPath = history.location.pathname;
  const whatPage = locPath.includes('meals') ? '/meals' : '/drinks';

  // Define the state that will control the conditional rendering of the 'Link Copied!' text and the clipboard copy.
  const [linkCopied, setLinkCopied] = useState(false);

  // Handles the Share button click. Copies the requested URL to the clipboard.
  function handleShareBtn() {
    const treatedURL = locPath.split('/').slice(1);
    navigator.clipboard.writeText(`http://localhost:3000/${treatedURL[0]}/${treatedURL[1]}`);
    setLinkCopied(true);
  }

  const [isFavorite, setIsFavorite] = useState(false);

  // Very importante state. It saves all the current recipe's info.
  const [recipeInfo, setRecipeInfo] = useState({
    id,
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    img: '',
    ingredients: [],
    instructions: '',
  });

  // Handles the favorite button click. Saves the recipe's information on the localStorage.
  function handleFavoriteBtn() {
    const shouldSave = {
      id: recipeInfo.id,
      type: recipeInfo.type,
      nationality: recipeInfo.nationality,
      category: recipeInfo.category,
      alcoholicOrNot: recipeInfo.alcoholicOrNot,
      name: recipeInfo.name,
      image: recipeInfo.img,
    };

    const savedState = getItem('favoriteRecipes') || [];
    let updatedState = [];
    if (isFavorite) {
      updatedState = savedState.filter((recipe) => recipe.id !== shouldSave.id);
    } else {
      updatedState = [...savedState, shouldSave];
    }

    saveItem('favoriteRecipes', updatedState);

    setIsFavorite(!isFavorite);
  }

  function checkIfFavorite() {
    const savedState = getItem('favoriteRecipes') || [];
    savedState.map((recipe) => {
      if (recipe.id === id) {
        setIsFavorite(true);
      }
      return recipe;
    });
  }

  // Handles the API request to get the recipe's information.
  // Honestly, this would be better if the recipe's information from the RecipeDetails page was saved on the global context and i'd just use it in this page.
  async function getRecipe() {
    const url = whatPage === '/meals' ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log('CHAMOU API');
    const data = whatPage === '/meals' ? json.meals : json.drinks; // é um array com um objeto com as chaves que são usadas no código abaixo.
    const ingredientsArray = [];
    const maxIngredients = 20;
    for (let i = 1; i <= maxIngredients; i += 1) {
      const ingredientKey = `strIngredient${i}`;
      const ingredientValue = data[0][ingredientKey];

      if (ingredientValue && ingredientKey !== '') {
        ingredientsArray.push(ingredientValue);
      }
    }
    const name = whatPage === '/meals' ? data[0].strMeal : data[0].strDrink;
    const alcoholicOrNot = whatPage === '/meals' ? '' : data[0].strAlcoholic;
    const nationality = whatPage === '/meals' ? data[0].strArea : '';
    const img = whatPage === '/meals' ? data[0].strMealThumb : data[0].strDrinkThumb;
    const type = whatPage === '/meals' ? 'meal' : 'drink';

    setRecipeInfo({
      id,
      type,
      nationality,
      category: data[0].strCategory,
      alcoholicOrNot,
      name,
      img,
      ingredients: ingredientsArray,
      instructions: data[0].strInstructions,
    });
  }

  // This is just to check the recipeInfo received
  useEffect(() => {
    console.log(recipeInfo);
  }, [recipeInfo]);

  // As soon as the component renders, check if we're dealing with meals or drinks.
  useEffect(() => {
    getRecipe();
    checkIfFavorite();
  }, []);

  return (
    <div>
      <h3 data-testid="recipe-title">{recipeInfo.name}</h3>
      <img
        data-testid="recipe-photo"
        src={ recipeInfo.img }
        alt="Foto da Comida"
        style={ { width: 250 } }
      />
      <button data-testid="share-btn" type="button" onClick={ handleShareBtn }>
        {
          linkCopied ? <span>Link copied!</span> : <img src={ shareIcon } alt="Share" />
        }
      </button>
      { /* Por algum motivo, a imagem do coração não aparece se eu deixa-la como src do btn */ }
      <button
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        type="button"
        onClick={ handleFavoriteBtn }
      >
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
      </button>
      <span data-testid="recipe-category">{recipeInfo.category}</span>
      <br />
      <div>
        Ingredients:
        <br />
        {
          recipeInfo.ingredients.map((ingredient, index) => (
            <div key={ index }>
              <EachIngredient ingredient={ ingredient } index={ index } />
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
