import React, { useEffect, useState } from "react";

function Nav() {
  const [user, setUser] = useState({});
  useEffect(() => {
  { /*
      setInterval was used in order to refresh the page constantly
  in order to have the "logout" button show immediately in place of
  "login", as soon as user logs out.
  */}
      setInterval(() => {
          const userString = localStorage.getItem("user");
          const user = JSON.parse(userString);
          setUser(user);
          }, [])
  }, 5000);


  const logout = () => {
      return localStorage.removeItem("user");
  }

  if(!user) {
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
          </ul>
          <button id="login" type="button" class="btn btn-primary navbar-btn">
            <a class="nav-link" href="/login">Login</a>
          </button>
        </div>
      </nav>
    );
  }
  if(user) {
    return(
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
            <li class="nav-item">
              <a class="nav-link" href="/profile">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/upload">Upload</a>
            </li>
            </ul>
          <button id="login" type="button" class="btn btn-primary navbar-btn" onClick={logout}>
            <a class="nav-link" href="/">Logout</a>
          </button>
        </div>
      </nav>
    );
  }
}

export default Nav;
