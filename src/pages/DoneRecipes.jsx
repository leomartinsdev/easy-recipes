import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : [];
  console.log(doneRecipes);
  return (
    <div>
      <Header haveHeaderSearch={ false } pageName="Done Recipes" />
      <button
        data-testid="filter-by-all-btn"
        // onClick={ () => setFilteredRecipes([]) }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        // onClick={ () => setFilteredRecipes([]) }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        // onClick={ () => setFilteredRecipes([]) }
      >
        Drinks
      </button>
      {doneRecipes.map(
        (
          { id, name, image, category, doneDate, tags, type, nationality },
          index,
        ) => (
          <div key={ id }>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
            />
            {type === 'meal' && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${nationality} - ${category}`}
              </p>
            )}
            {type !== 'meal' && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${category}`}
              </p>
            )}
            <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
            <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              // onClick={ () => setFilteredRecipes([]) }
            >
              Share
            </button>
            {tags.map((tagName, indexTag) => (
              <span
                key={ indexTag }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </span>
            ))}
          </div>
        ),
      )}
    </div>
  );
}
