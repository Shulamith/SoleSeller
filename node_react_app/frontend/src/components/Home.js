import React from 'react';
import './Home.css';
import cartoon from './online-selling-sites.jpg';
import { Link } from 'react-router-dom';

function Home() {
    return(
        <section>
            <div class="container">
                <img src={cartoon} />
                <h1 class="mt-5">Welcome to Sole Seller</h1>
                <h3 class="mt-5">The Market Place Sellers App</h3>
                <h5 class="mt-5">Please <Link to="/login">login</Link> to use the website</h5>
            </div>
        </section>
    );
}

export default Home;
