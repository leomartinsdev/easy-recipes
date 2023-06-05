import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

export default function Footer() {
  const history = useHistory();

  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button
        onClick={ () => history.push('/drinks') }
      >
        <img
          src={ drinkIcon }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
        />

      </button>
      <button
        onClick={ () => history.push('/meals') }
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
          data-testid="meals-bottom-btn"
        />

      </button>
    </footer>

  );
}
