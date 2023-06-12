import React from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

export default function Meals() {
  return (
    <div>
      <Header haveHeaderSearch pageName="Meals" />
      <h1>Meals</h1>
      <Header haveHeaderSearch pageName="Meals" />
      <Recipes typeOfRecipe="meals" />
      <Footer />
    </div>
  );
}
