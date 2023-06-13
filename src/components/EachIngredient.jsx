import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveItem, getItem } from '../services/localStorage';

function EachIngredient({ ingredient, index }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const savedState = getItem('inProgressRecipes');
    if (savedState && savedState.ingredients
      && savedState.ingredients[index] !== undefined) {
      setIsChecked(savedState.ingredients[index]);
    }
  }, [index]);

  const handleCheckbox = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    const savedState = getItem('inProgressRecipes') || { ingredients: [] };
    savedState.ingredients[index] = newCheckedState;
    saveItem('inProgressRecipes', savedState);
  };

  const defaultChecked = isChecked || false;

  return (
    <label
      htmlFor={ ingredient }
      data-testid={ `${index}-ingredient-step` }
      style={ { textDecoration: isChecked ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
    >
      {ingredient}
      {' '}
      <input
        type="checkbox"
        name={ ingredient }
        id={ ingredient }
        checked={ defaultChecked }
        onChange={ handleCheckbox }
      />
    </label>
  );
}

EachIngredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default EachIngredient;
