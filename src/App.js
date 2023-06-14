import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeInProgres from './pages/RecipeInProgres';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/meals/:id" component={ Meals } />
      <Route exact path="/drinks/:id" component={ Drinks } />
      <Route
        exact
        path="/meals/:id/in-progress"
        component={ RecipeInProgres }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ RecipeInProgres }
      />
    </Switch>
  );
}

export default App;
