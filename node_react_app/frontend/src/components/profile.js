import React from "react";
import Button from "react-bootstrap/Button";
import "./profile.css";
import ebay from "./eBay.png";
import etsy from "./etsy.jpg"
import ebayAuth from "./EbayAuth.js"

export default function Profile() {
    return(
        <section>
            <div class = "container-fluid">
                <p>Welcome user</p>
            </div>
            <Button id="ebay" block size="sm" type="link">  <img src={ebay} height = {25} width = {50}/>
                <a href="https://auth.sandbox.ebay.com/oauth2/authorize?client_id=Shulamit-SoulSell-SBX-11b09fbb0-0fa2cf0b&redirect_uri=Shulamith_Dashe-Shulamit-SoulSe-wljldfhx&response_type=code&scope=https://api.ebay.com/oauth/api_scope%20https://api.ebay.com/oauth/api_scope/sell.marketing.readonly%20https://api.ebay.com/oauth/api_scope/sell.marketing%20https://api.ebay.com/oauth/api_scope/sell.inventory.readonly%20https://api.ebay.com/oauth/api_scope/sell.inventory%20https://api.ebay.com/oauth/api_scope/sell.account.readonly%20https://api.ebay.com/oauth/api_scope/sell.account%20https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly%20https://api.ebay.com/oauth/api_scope/sell.fulfillment">
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
