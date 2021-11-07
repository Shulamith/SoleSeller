import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import cartoon from './online-selling-sites.jpg';

function Home() {
    return(
        <section>
            <div className="container">
                <img src={cartoon} alt = "Marketplace Cartoon Image"/>
                <h1 className="mt-5">Welcome to Sole Seller</h1>
                <h3 className="mt-5">The Market Place Seller's App</h3>
                <h5 className="mt-5">Please <Link to="/login">login</Link> or <Link to="/Register">register</Link> to use the website</h5>
            </div>
        </section>
    );
}

export default Home;
