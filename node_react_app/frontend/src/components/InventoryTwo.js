import React, {useEffect, useState} from 'react';
import "./InventoryTwo.css";
import inventoryData from "./mockdata.json";
//TODO: check casing of variables in React
function InventoryTwo () {

    //some bootstrap to pretty things up
    return(
        <section>
            <div className="gallery">
            { inventoryData.map((item, index) =>{
              <div className = "pics" key ={index}>
                  <img src = {item.product.imageUrls[0]} />
                  </div>
            })}
            </div>
        </section>
    );
}

export default InventoryTwo;
