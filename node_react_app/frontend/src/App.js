// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Nav from './components/Nav'; // Nav was exported in Nav.js, so we can import it here and use it
import Home from './components/Home';
import Inventory from './components/Inventory';
import Login from './components/login';
import Register from './components/register';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    // Since Nav and links will direct us to different pages, it has to act as a URL router
    // Routes added for Home link and tweet Link
   <Router>
    <div className="App">
      <header className="App-header">
        <Nav /> 
        <Switch>
          <Route path="/" exact component = {Home} /> 
          <Route path="/inventory" exact component = {Inventory} />
          <Route path="/register" exact component = {Register} />
          <Route path="/login" exact component = {Login} />
        </Switch>
      </header>
    </div>
    </Router>
  );
}

export default App;
