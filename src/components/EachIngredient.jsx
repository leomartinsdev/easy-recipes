import React, { useState } from 'react';
import PropTypes from 'prop-types';

function EachIngredient({ ingredient, index }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

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
        checked={ isChecked }
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
