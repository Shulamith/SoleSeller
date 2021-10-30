import React from 'react';
import './Home.css';
import cartoon from './online-selling-sites.jpg';

function Home() {
    return(
        <section>
            <div class = "cotaniner-fluid">
                <h1 class="mt-5">Welcome to Sole Seller</h1>
            </div>
            <div class="container">
                <div class="row row-cols-1">
                    <div class="row-one">The Market Place Sellers App</div>
                    <div class="row-two">
                        <img src={cartoon}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
