import React from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Meals() {
  return (
    <div>
      <h1>Meals</h1>
      <Recipes typeOfRecipe="meals" />
      <Footer />
    </div>
  );
}
