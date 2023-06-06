import { useEffect, useState } from 'react';

export default function useFetch(typeOfRecipe) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchRecipes = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data[typeOfRecipe]);
  };

  const fetchCategories = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setCategories(data[typeOfRecipe]);
  };

  const getInfos = (typeRecipe) => {
    if (typeRecipe === 'meals') {
      fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      fetchCategories('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    } else if (typeRecipe === 'drinks') {
      fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      fetchCategories('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    }
  };

  useEffect(() => {
    getInfos(typeOfRecipe);
  }, []);

  return { recipes, categories };
}
