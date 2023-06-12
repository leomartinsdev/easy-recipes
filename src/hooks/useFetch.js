import { useEffect, useState } from 'react';

export default function useFetch(typeOfRecipe) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterByCategorie, setFilterByCategorie] = useState('');

  const fetchRecipes = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data[typeOfRecipe]);
  };

  const fetchFilteredRecipes = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setFilteredRecipes(data[typeOfRecipe]);
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

  const getFilteredRecipes = (typeRecipe, filterCategorie) => {
    if (filterCategorie !== '') {
      if (typeRecipe === 'meals') {
        fetchFilteredRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterCategorie}`);
      } else if (typeRecipe === 'drinks') {
        fetchFilteredRecipes(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterCategorie}`);
      }
    } else {
      setFilteredRecipes([]);
    }
  };

  useEffect(() => {
    getInfos(typeOfRecipe);
  });

  useEffect(() => {
    getFilteredRecipes(typeOfRecipe, filterByCategorie);
  }, [filterByCategorie]);

  return { recipes,
    categories,
    setFilterByCategorie,
    filteredRecipes,
    setFilteredRecipes,
    filterByCategorie };
}
