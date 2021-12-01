import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Home.css';
import cartoon from './online-selling-sites.jpg';

function Home() {
        const [user, setUser] = useState({});
        useEffect(() => {
        { /*
            setInterval was used in order to refresh the page constantly
        in order to have the "logout" button show immediately in place of
        "login", as soon as user logs out.
        */}
            setInterval(() => {
                const user = localStorage.getItem("user");
                //const user = JSON.parse(userString);
                setUser(user);
                }, [])
        }, 5000);

    if(user) {
        return(
            <section>
                <div className="container">
                    <img src={cartoon} alt = "Marketplace Cartoon Image"/>
                    <h1 className="mt-5">Welcome to Sole Seller</h1>
                    <h3 className="mt-5">The Market Place Seller's App</h3>
                </div>
            </section>
            );
        }
        if (!user) {
            return (
                <section>
                <div className="container">
                    <img src={cartoon} alt = "Marketplace Cartoon Image"/>
                    <h1 className="mt-5">Welcome to Sole Seller</h1>
                    <h3 className="mt-5">The Market Place Seller's App</h3>
                    <h5 className="mt-5">Please <Link to="/login" id="links">login</Link> or <Link to="/register" id="links">register</Link> to use the website</h5>
                </div>
            </section>
            )
        }

}

export default Home;
