import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

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

    //some bootstrap to pretty things up
    return(
        <section>
            
            <div class="container-fluid">
                <h1 class="mt-5">Items</h1>
                <form method="POST" action="/addItem">
                    <div class="input-group justify-content-center">
                            <div class="input-group-prepend">
                                <input type="text" name="itemInput" class="form-control" />
                                <input trype="submit" value="Send" class="btn btn-primary mb-2"/>
                            </div>
                    </div>
                </form> 

            {
                items.map(item => (
                    <div class="row padding">
                        <div class="alert alert-info rounded-pill" rolse="alert">
                            <i class="fa fa-user mr-2"></i><i>{item.user.fullname}({item.user.username}) ({item.user.username}):{item.item}</i>
                        </div>
                    </div>
                ))   
            }
            </div>
        </section>
        

    );
}

export default Inventory;