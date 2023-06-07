import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <Header haveHeaderSearch={ false } pageName="Profile" />
      <Footer />
    </div>
  );
}
