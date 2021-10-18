import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function EbayAuth() {

    // useEffect retrives  data from backend
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/ebayauth'); // Inventory url from port 4000, retriving data
        const items = await data.json(); // set it into items as json data
        setItems(items);
    };

    return(
        <section>
            {
                items.map(item => (
                    <div>
                        <p>{item.product}</p>
                        <p>{item.channel}</p>
                        <p>{item.username}</p>
                    </div>
                ))
            }
        </section>


    );
}

export default EbayAuth;
