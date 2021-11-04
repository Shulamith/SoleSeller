import React  from 'react';
import Image from 'react-bootstrap/Image'
import "./InventoryTwo.css";
import inventoryData from "./mockdata.json";
//TODO: check casing of variables in React
function InventoryTwo() {

    const itemPics = new Map();

    for (var i = 0; i < inventoryData.length; i++) {
        itemPics.set(inventoryData[i].product.title, inventoryData[i].product.imageUrls);
    }

    var str = "";

    for (const pic of itemPics.values()) {
        str += "<li>" + pic + "</li>";
    }

    //some bootstrap to pretty things up
    return (
        <section>
            <div className="container">
                <div>
                    <table id="itemList">
                        <tr>
                            <td> <img src={itemPics.get(inventoryData[0].product.title)} /> </td>
                            <td> <img src={itemPics.get(inventoryData[1].product.title)} /> </td>
                        </tr>
                        <tr>
                            <td>
                                <table id="itemInfo">
                                    <tr>
                                        <th> {inventoryData[0].product.title} </th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td> Etsy </td>
                                        <td> eBay </td>
                                        <td> Etc. </td>
                                    </tr>
                                    <tr>
                                        <td> Selling Price </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td> Fees </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td> Total Earnings </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table id="itemInfo">
                                    <tr>
                                        <th> {inventoryData[1].product.title} </th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td> Etsy </td>
                                        <td> eBay </td>
                                        <td> Etc. </td>
                                    </tr>
                                    <tr>
                                        <td> Selling Price </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td> Fees </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td> Total Earnings </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </section>
    );
    
}


export default InventoryTwo;
