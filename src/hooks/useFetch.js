import { useEffect, useState } from 'react';

export default function useFetch(typeOfRecipe) {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data[typeOfRecipe]);
  };

  const getRecipes = (typeRecipe) => {
    if (typeRecipe === 'meals') {
      fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else if (typeRecipe === 'drinks') {
      fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  };

  useEffect(() => {
    getRecipes(typeOfRecipe);
  }, []);

  return { recipes };
}
