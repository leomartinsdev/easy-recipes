import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Header from './components/Header';

function App() {
  return (
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route
        exact
        path="/meals"
        render={ (props) => (<Header
          { ...props }
          haveHeaderSearch
          pageName="Meals"
        />) }
      />
      {/* <Route exact path="/" component={ Login } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/" component={ Login } /> */}
    </Switch>
  );
}

export default App;
