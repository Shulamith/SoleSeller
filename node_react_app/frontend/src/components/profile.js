import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import ebay from "./ebay.png";
import etsy from "./etsy.jpg";
import "./profile.css";

export default function Profile() {
    return(
        <section> 
            <div class = "row-img-bg">
                <p>Welcome User</p>
            </div>
            <div class = "buttons">
                <Button id="ebay" block size="sm" type="link">
                    <a href="http://signin.ebay.com">
                        <img src={ebay} height = {25} width = {50}/>
                        Connect to Ebay
                    </a>
                </Button>
                &nbsp;
                <Button id="etsy" block size="sm" type="link" >
                    <a href="https://www.etsy.com/signin">
                        <img src={etsy} height = {25} width = {50}/>
                        Connect to Etsy
                    </a>
                </Button>
            </div>
        </section>
    );
}
