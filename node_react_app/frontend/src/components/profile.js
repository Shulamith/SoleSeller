import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import ebay from "./ebay.png";
import etsy from "./etsy.jpg";
import "./profile.css";


export default function Profile() {
    /*function componentDidMount() {
        const userLog = localStorage.getItem('userLog') === 'true';
        const userReg = localStorage.getItem('userReg') === 'true';
        const user = (userLog.JSON.parse("email") ? userReg.JSON.parse("email") && userLog.JSON.parse("password") ? userReg.JSON.parse("password") : '';
        this.setState({ user, userLog });
    }*/

    return(
        <section>
            <div className = "row-img-bg">
                <p>Welcome User</p>
            </div>
            <div className = "buttons">
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
