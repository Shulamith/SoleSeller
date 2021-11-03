import React from 'react'; // ES6 js

function Nav() {
    return (
        // HTML code using Bootstrap for simple navigation that has two lings
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/inventory">Inventory</a>
            </li>
          </ul>
          <button type="button" className="btn btn-primary navbar-btn">
            <a className="nav-link" href="/login">Login</a>
          </button>
        </div>
      </nav>
    );

}

export default Nav;
