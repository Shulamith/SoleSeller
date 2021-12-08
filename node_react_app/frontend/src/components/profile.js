import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ebay from "./ebay.png";
import etsy from "./etsy.jpg";
import "./profile.css";


export default function Profile() {

    const User = window.localStorage.getItem("user");

    return(
        <section>
            <div className = "row-img-bg">
                <p>Welcome {User}</p>
            </div>
            <div className = "buttons">
                <Button id="ebay" block size="sm" type="link">
                    <a href="https://localhost:4000/ebayauth" style={{ color: '#000' }}>
                        <img src={ebay} height = {25} width = {50}/>
                        Connect to Ebay
                    </a>
                </Button>
                &nbsp;
                <Button id="etsy" block size="sm" type="link" >
                    <a href="https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=http://localhost:4000/oauth/redirect&scope=email_r%20address_r%20billing_r%20transactions_r%20listings_r%20listings_w%20listings_d&client_id=b397ddo9ov4lu91igrv1rjjc&state=8056a9&code_challenge=-fqDGjHEsuMqqH57qgaopzCacIJLBijMkjlaQv-2HhA&code_challenge_method=S256" style={{ color: '#000' }}>
                        <img src={etsy} height={25} width={50} />
                        Connect to Etsy
                    </a>
                </Button>
            </div>
        </section>
    );
}
