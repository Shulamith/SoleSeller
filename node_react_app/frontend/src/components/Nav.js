import React from 'react'; // ES6 js

function Nav() {
    return (
        // HTML code using Bootstrap for simple navigation that has two lings
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/inventory">Inventory</a>
            </li>
          </ul>
          <button type="button" class="btn btn-primary navbar-btn">
            <a class="nav-link" href="/login">Login</a>
          </button>
        </div>
      </nav>
    );

}

export default Nav;
