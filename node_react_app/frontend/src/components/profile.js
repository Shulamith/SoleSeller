import React from "react";
import Button from "react-bootstrap/Button";
import "./profile.css";
import ebay from "./eBay.png";
import etsy from "./etsy.jpg"

export default function Profile() {
    return(
        <section> 
            <div class = "container-fluid">
                <p>Welcome user</p>
            </div>
            <Button id="ebay" block size="sm" type="link">  <img src={ebay} height = {25} width = {50}/>
                <a href="http://ebay.com">
                Connect to Ebay
                </a>
            </Button>
            <Button id="etsy" block size="sm" type="link" > <img src={etsy} height = {25} width = {50}/>
                <a href="http://etsy.com"> 
                Connect to Etsy
                </a>
            </Button>
        </section>
    );
}