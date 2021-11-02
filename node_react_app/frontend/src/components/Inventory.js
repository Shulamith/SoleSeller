import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ''./Inventory.css';

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
                                <input type="text" name="itemInput" class="form-control" placeholder="Item Name"/>
                                <input type="text" name ="itemPriceInput" class="form-control" placeholder="Item Price"/>
                                <input type="submit" value="Send" class="btn btn-primary mb-2"/>
                            </div>
                    </div>
                </form>

                {/* <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" placeholder="Enter email"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control"  placeholder="Password"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form> */}

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
            </div>
        </section>


    );
}

export default Inventory;
