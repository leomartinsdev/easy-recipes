import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [filterType, setFilterType] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const history = useHistory();

  const handleShareButton = async ({ type, id }) => {
    const timeoutNumber = 3000;
    await copy(`${window.location.origin}/${type}s/${id}`);
    setTimeout(() => {
      setLinkCopied(true);
    }, timeoutNumber);
    setLinkCopied(false);
  };

  const handleDetailButton = ({ type, id }) => {
    history.push(`/${type}s/${id}`);
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
      {linkCopied && <p>Link copied!</p>}
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
            <button
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => handleDetailButton(recipe) }
            />
            {getHorizontalTopText(recipe, index)}
            <h3
              data-testid={ `${index}-horizontal-name` }
              role="presentation"
              onClick={ () => handleDetailButton(recipe) }
            >
              {recipe.name}
            </h3>
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
