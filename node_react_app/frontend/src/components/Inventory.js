import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Inventory.css';

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

            <div className="container-fluid">
                <h1 className="mt-5">Items</h1>
                <form method="POST" action="/addItem">
                    <div className="input-group justify-content-center">
                            <div className="input-group-prepend">
                                <input type="text" name="itemInput" className="form-control" placeholder="Item Name"/>
                                <input type="text" name ="itemPriceInput" className="form-control" placeholder="Item Price"/>
                                <input type="submit" value="Send" className="btn btn-primary mb-2"/>
                            </div>
                    </div>
                </form>

                {/* <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control"  placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form> */}

            {
                <div className="container">
                    <div className="row row-cols-2">
                        <div className="col">
                            <p>Product 1</p>
                            <p>Price</p>
                            <p>Ebay</p>
                        </div>
                        <div className="col">
                            Product 1
                            Price
                            Etsy
                        </div>
                        <div className="col">
                            Product 2
                            Price
                            Ebay
                        </div>
                        <div className="col">
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
