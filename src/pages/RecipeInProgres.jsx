import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import EachIngredient from '../components/EachIngredient';
import shareIcon from '../images/shareIcon.svg';
import whiteHeatIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgres() {
  const { id } = useParams();
  console.log('id:', id);
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

  // Very importante state. It saves all the current recipe's info.
  const [recipeInfo, setRecipeInfo] = useState({
    name: '',
    src: '',
    category: '',
    ingredients: [],
    instructions: '',
  });

  // DA PRA REFATORAR E TRANSFORMAR EM UMA ASYNC SÓ USANDO A MESMA LÓGICA DO WHATPAGE QUE USEI NO SEARCHBAR

  async function getRecipe() {
    const url = whatPage === '/meals' ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const json = await response.json();
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
    const nameStr = whatPage === '/meals' ? data[0].strMeal : data[0].strDrink;
    setRecipeInfo({
      name: nameStr,
      src: data[0].strImageSource,
      category: data[0].strCategory,
      ingredients: ingredientsArray,
      instructions: data[0].strInstructions,
    } || []);
  }

  // async function getFood() {
  //   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  //   const json = await response.json();
  //   const data = json.meals; // é um array com um objeto com as chaves que são usadas no código abaixo.
  //   const ingredientsArray = [];
  //   const maxIngredients = 20;
  //   for (let i = 1; i <= maxIngredients; i += 1) {
  //     const ingredientKey = `strIngredient${i}`;
  //     const ingredientValue = data[0][ingredientKey];

  //     if (ingredientValue && ingredientKey !== '') {
  //       ingredientsArray.push(ingredientValue);
  //     }
  //   }
  //   setRecipeInfo({
  //     name: data[0].strMeal, // Caso eu refatore para ficar só com 1 async, essa chave pode ser alterada para um ternário para receber strMeal ou strDrink baseado no whatPage
  //     src: data[0].strImageSource,
  //     category: data[0].strCategory,
  //     ingredients: ingredientsArray,
  //     instructions: data[0].strInstructions,
  //   } || []);
  // }

  // async function getDrink() {
  //   const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  //   const json = await response.json();
  //   const data = json.drinks;
  //   const ingredientsArray = [];
  //   const maxIngredients = 20;
  //   for (let i = 1; i <= maxIngredients; i += 1) {
  //     const ingredientKey = `strIngredient${i}`;
  //     const ingredientValue = data[0][ingredientKey];

  //     if (ingredientValue && ingredientKey !== '') {
  //       ingredientsArray.push(ingredientValue);
  //     }
  //   }
  //   setRecipeInfo({
  //     name: data[0].strDrink,
  //     src: data[0].strImageSource,
  //     category: data[0].strCategory,
  //     ingredients: ingredientsArray,
  //     instructions: data[0].strInstructions,
  //   } || []);
  // }

  // const drinkOrFood = () => {
  //   if (whatPage === '/meals') {
  //     getFood();
  //   } else {
  //     getDrink();
  //   }
  // };

  // As soon as the component renders, check if we're dealing with meals or drinks.
  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div>
      <h3 data-testid="recipe-title">{recipeInfo.name}</h3>
      <img
        data-testid="recipe-photo"
        src={ recipeInfo.src }
        alt="Foto da Comida"
      />
      <button data-testid="share-btn" type="button" onClick={ handleShareBtn }>
        {
          linkCopied ? <span>Link copied!</span> : <img src={ shareIcon } alt="Share" />
        }
      </button>
      { /* Por algum motivo, a imagem do coração não aparece se eu deixa-la como src do btn */ }
      <button src={ whiteHeatIcon } data-testid="favorite-btn" type="button">
        {/* <img src={ whiteHeatIcon } alt="Favorite" /> */}
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
