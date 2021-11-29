import React, {useEffect, useState} from 'react';
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import inventoryData from "./mockdata.json";
import './InventoryTwo.css';

function InventoryTwo() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() => {
        const data = await fetch('/inventory'); // Inventory url from port 4000, retriving data
        const items = await data.json(); // set it into items as json data
        setItems(items);
    };

function calculateFees(price) {
    return price / 10;
}

    return (
        <div className="InventoryTwo">
            <table id="display">
                <tr>
                    {inventoryData.map((val, key) => {
                        return (
                            <td key={key} id="pics">
                                <Image src={val.product.imageUrls} />
                            </td>
                        )
                    })}
                </tr>
                <tr>
                    {items.map((val, key) => {
                        return (
                            <tr key={key}>
                                <table>
                                    <tr>
                                        <td><h5>{val.item}</h5></td>
                                        <td>Etsy</td>
                                        <td>eBay</td>
                                        <td>Etc.</td>
                                    </tr>
                                    <tr>
                                        <td>Selling Price</td>
                                        <td>{val.etsyPrice}</td>
                                        <td>{val.ebayPrice}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Fees</td>
                                        <td>{((val.etsyPrice)*(.05)).toFixed(2)}</td>
                                        <td>{((val.ebayPrice)*(.05)).toFixed(2)}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Total Earnings</td>
                                        <td>{val.etsyPrice-(((val.etsyPrice)*(.05)).toFixed(2))}</td>
                                        <td>{val.ebayPrice-(((val.ebayPrice)*(.05)).toFixed(2))}</td>
                                        <td></td>
                                    </tr>
                                </table>
                            </tr>
                        )
                    })}
                </tr>
                <tr>
                    <td colspan={ inventoryData.length } >
                        <footer>
                            <h3>Want to post a new listing?</h3>
                            <Button block size="lg">
                                <Link to="/upload">Click Here</Link>
                            </Button>
                        </footer>
                    </td>
                </tr>
            </table>
        </div>
    );
}


export default InventoryTwo;
