// import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import Nav from './components/Nav'; // Nav was exported in Nav.js, so we can import it here and use it
import Home from './components/Home';
//import Inventory from './components/Inventory';
import InventoryTwo from './components/InventoryTwo';
import Login from './components/login';
import Register from './components/register';
import EbayAuth from './components/EbayAuth';
import Profile from './components/profile';
import Upload from './components/upload';
import Logout from './components/logout';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  //const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  return (
    // Since Nav and links will direct us to different pages, it has to act as a URL router
    // Routes added for Home link and tweet Link
   <Router>
    <div className="App">
      <header className="App-header">
        <Nav />
        <Switch>
          <Route path="/" exact component = {Home} />
          <Route path="/inventory" exact component = {InventoryTwo} />
          <Route path="/ebayauth" exact component = {EbayAuth} />
          <Route path="/register" exact component = {Register} />
          <Route path="/login" exact component = {Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </header>
    </div>
    </Router>
  );
}

export default App;
