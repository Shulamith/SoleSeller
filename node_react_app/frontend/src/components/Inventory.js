import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import "./Inventory.css";

function Inventory() {

    // useEffect retrives  data from backend
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/inventory'); // Inventory url from port 4000, retriving data
        const items = await data.json(); // set it into items as json data
        setItems(items);
    };

    return(
        <section>
            {
                <div class="container">
                    <div class="row row-cols-2">
                        <div class="col">
                            <p>Product 1</p>
                            <p>Price</p>
                            <p>Ebay</p>
                        </div>
                        <div class="col">
                            Product 1
                            Price
                            Etsy
                        </div>
                        <div class="col">
                            Product 2
                            Price
                            Ebay
                        </div>
                        <div class="col">
                            Product 2
                            Price
                            Etsy
                        </div>
                    </div>
                </div>
                /*items.map(item => (
                    <div>
                        <p>{item.product}</p>
                        <p>{item.channel}</p>
                        <p>{item.username}</p>
                    </div>
                ))*/
            }
        </section>
        

    );
}

export default Inventory;
