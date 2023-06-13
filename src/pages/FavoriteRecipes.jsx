import React, { useEffect, useState, useCallback } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [data, setData] = useState([]);
  const [filterBy, setFilterBy] = useState('all');
  const [showMessage, setShowMessage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setData(getLocal);
  }, []);

  const shareRecipe = (receita) => {
    const path1 = window.location.href.replace('/favorite-recipes', '');
    const path2 = `${path1}/${receita.type}s/${receita.id}`;
    copy(path2);
    setShowMessage(true);
  };

  const sendTo = (receita) => {
    const {
      location: { pathname },
    } = history;
    const path1 = pathname.replace('/favorite-recipes', '');
    const path2 = `${path1}/${receita.type}s/${receita.id}`;
    return path2;
  };

  const handleFilter = (type) => {
    setFilterBy(type);
  };

  const filterFavoriteRecipes = (obj) => {
    if (filterBy === 'meals') { return obj.filter((receita) => receita.type === 'meal'); }
    if (filterBy === 'drinks') { return obj.filter((receita) => receita.type === 'drink'); }
    return obj;
  };

  const unfavoriteRecipe = useCallback(
    (rf) => {
      const newData = data.filter((arf) => arf.id !== rf.id);
      setData(newData);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    },
    [data],
  );

  return (
    <div>
      <Header haveHeaderSearch={ false } pageName="Favorite Recipes" />
      <nav>
        <div>
          <nav className="me-auto">
            <NavLink
              data-testid="filter-by-all-btn"
              onClick={ () => handleFilter('all') }
            >
              All
            </NavLink>
            <NavLink
              data-testid="filter-by-meal-btn"
              onClick={ () => handleFilter('meals') }
            >
              Meals
            </NavLink>
            <NavLink
              data-testid="filter-by-drink-btn"
              onClick={ () => handleFilter('drinks') }
            >
              Drinks
            </NavLink>
          </nav>
        </div>
      </nav>
      {filterFavoriteRecipes(data)?.map((recipe, idx) => (
        <div key={ recipe.id }>
          <Link
            to={ sendTo(recipe) }
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${idx}-horizontal-image` }
            onClick={ () => sendTo(recipe) }
          />
          <div>
            <div data-testid={ `${idx}-horizontal-name` }>
              <Link to={ sendTo(recipe) }>{recipe.name}</Link>
              <button
                type="button"
                className="search-top"
                onClick={ () => shareRecipe(recipe) }
              >
                <img
                  src={ shareIcon }
                  alt="shareIcon"
                  data-testid={ `${idx}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
                className="search-top"
                onClick={ () => unfavoriteRecipe(recipe) }
              >
                <img
                  src={ blackHeartIcon }
                  alt="Receita favoritada"
                  data-testid={ `${idx}-horizontal-favorite-btn` }
                />
              </button>
            </div>
            {showMessage && (
              <div>
                <p>Link copied!</p>
              </div>
            )}
            <div className="list-group-flush">
              <div data-testid={ `${idx}-horizontal-top-text` }>
                {recipe.type === 'meal'
                  && `${recipe.nationality} - ${recipe.category}`}
                {recipe.type === 'drink' && `${recipe.alcoholicOrNot}`}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
