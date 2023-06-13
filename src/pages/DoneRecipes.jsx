import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

// const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const history = useHistory();
  const [filterType, setFilterType] = useState('');
  const url = history.location.pathname;
  console.log(url);

  const handleShareButton = async () => {
    // global.alert('Link copied!');
    // await copy(`/${type}s/${id}`);
  };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : [];

  const getHorizontalTopText = (
    { type, nationality, category, alcoholicOrNot },
    index,
  ) => {
    const topText = type === 'meal'
      ? `${nationality} - ${category}` : `${alcoholicOrNot}`;
    return (
      <p data-testid={ `${index}-horizontal-top-text` }>
        {topText}
      </p>
    );
  };

  return (
    <div>
      <Header haveHeaderSearch={ false } pageName="Done Recipes" />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterType('') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilterType('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterType('drink') }
      >
        Drinks
      </button>
      {doneRecipes
        .filter(({ type }) => type.includes(filterType))
        .map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            {getHorizontalTopText(recipe, index)}
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => handleShareButton(recipe) }
            >
              Share
            </button>
            {recipe.tags.map((tagName, indexTag) => (
              <span
                key={ indexTag }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </span>
            ))}
          </div>))}
    </div>
  );
}
