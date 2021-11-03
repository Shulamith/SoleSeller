import React  from 'react';
import Image from 'react-bootstrap/Image'
import "./InventoryTwo.css";
import inventoryData from "./mockdata.json";
//TODO: check casing of variables in React
function InventoryTwo () {

    //some bootstrap to pretty things up
    return(
          <div className = "container">
            { inventoryData.map((item, index) =>{
              <div className="pics" key ={index}>
                  <a> <img src = {item.product.imageUrls[0]} alt= "new"/> </a>
                  </div>
           })}
           </div>
    );
}
//{item.product.imageUrls[0]}

export default InventoryTwo;
