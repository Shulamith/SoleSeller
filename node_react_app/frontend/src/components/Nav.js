import React from 'react'; // ES6 js
import {Link} from 'react-router-dom' // import to use Link syntax, must install 'react-router-dom' as dependencie using npm install react-router-domn
// we use this by pulling link class and create links using it

function Nav() {
    return (
        // HTML code using Bootstrap for simple navigation that has two lings
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark top">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navMainMenu" class="navbar-collapse collapse">
                <div class="navbar-nav ml-auto">
                    <Link to='/' className="nav-item nav-link active">Home</Link>
                    <Link to='/inventory' className="nav-item nav-link">Inventory</Link>
                </div>
            </div>
        </nav>
    );

}

export default Nav; 