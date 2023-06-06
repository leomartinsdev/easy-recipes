import React from 'react';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Drinks() {
  return (
    <div>
      <h1>Drinks</h1>
      <Recipes typeOfRecipe="drinks" />
      <Footer />
    </div>
  );
}
