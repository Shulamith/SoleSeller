import React from 'react';
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import inventoryData from "./mockdata.json";
import './InventoryTwo.css';

console.log(inventoryData.length);
function InventoryTwo() {

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
                    {inventoryData.map((val, key) => {
                        return (
                            <th key={key} id="itemName">
                                {val.product.title}
                            </th>
                        )
                    })}
                </tr>
                <tr>
                    {inventoryData.map((val, key) => {
                        return (
                            <td key={key} id="dataTable">
                                <table>
                                    <tr>
                                        <td></td>
                                        <td>Etsy</td>
                                        <td>eBay</td>
                                        <td>Etc.</td>
                                    </tr>
                                    <tr>
                                        <td>Selling Price</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Fees</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Total Earnings</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </td>
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
