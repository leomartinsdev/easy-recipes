import React from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

export default function Drinks() {
  return (
    <div>
      <Header haveHeaderSearch pageName="Drinks" />
      <h1>Drinks</h1>
      <Recipes typeOfRecipe="drinks" />
      <Footer />
    </div>
  );
}
