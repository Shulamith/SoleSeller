const express = require('express');
const router = express.Router();
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const ebayAuthToken = new EbayAuthToken({
    filePath: './routes/ebay-config.json' // input file path.
});
const fetch = require('cross-fetch');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schemas = require('../models/Schemas.js');
const axios = require('axios');


/* ------------------ BEGIN ETSY OAUTH ------------------ */

/**
These variables contain our Etsy API Key, the state sent
in the initial authorization request, and the client verifier compliment
to the code_challenge sent with the initial authorization request
*/
const etsyClientID = 'b397ddo9ov4lu91igrv1rjjc';
const etsyClientVerifier = 'dL5oT2IMlIV6zVXXRRaEk-OwbVGPKrlU0ids8Dg2ahk';
const etsyRedirectUri = 'https://localhost:4000/oauth/redirect';

// Send a JSON response to a default get request
router.get('/ping', async (req, res) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'x-api-key': etsyClientID,
        },
    };

    const response = await fetch(
        'https://openapi.etsy.com/v3/application/openapi-ping',
        requestOptions
    );

    if (response.ok) {
        const data = await response.json();
        res.send(data);
    } else {
        res.send("oops");
    }
});

router.get('/oauth/redirect', async (req, res) => {
    // The req.query object has the query params that Etsy authentication sends
    // to this route. The authorization code is in the `code` param
    const authCode = req.query.code;
    console.log("Got to etsy redirect");
    const tokenUrl = 'https://api.etsy.com/v3/public/oauth/token';
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: etsyClientID,
            redirect_uri: etsyRedirectUri,
            code: authCode,
            code_verifier: etsyClientVerifier,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(tokenUrl, requestOptions);

    // Extract the access token from the response access_token data field
    if (response.ok) {
        const tokenData = await response.json();
        console.log("Response okay");
        //res.redirect('/inventory');
        const inventory = await getEtsyInventory(tokenData.access_token);
        //console.log("EtsyInventory", inventory);

        // const requestOptions = {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         grant_type: 'authorization_code',
        //         client_id: etsyClientID,
        //         redirect_uri: etsyRedirectUri,
        //         code: authCode,
        //         code_verifier: etsyClientVerifier,
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        //res.redirect('http://localhost:3000/inventory')
        res.send(inventory);

        //res.redirect('/inventory?access_token=${tokenData.access_token}');
    } else {
        res.send("Response was not okay");
    }
});

async function getEtsyInventory (access_token) {    // We passed the access token in via the querystring
    console.log("AT RECIEVE INVENTORY ACCESS TOKEN");

    // An Etsy access token includes your shop/user ID
    // as a token prefix, so we can extract that too
    const user_id = access_token.split('.')[0];
    console.log("USER ID:", user_id);
    const authorization = 'Bearer ' + access_token;
    const requestOptions = {
        headers: {
            'x-api-key': etsyClientID
        }
    };
    axios.get(`https://openapi.etsy.com/v3/application/users/${user_id}/shops`,requestOptions)
    .then(response => {
      console.log("TRIED GET AND RECIEVED RESPONSE");
      console.log(response.data);
      //console.log(response);
      //if(response.ok) {
        console.log("GETTING SHOP DATA");
        const shop_id = response.data.shop_id;
        console.log("SHOP ID", shop_id);
        const shopRequestOptions = {
            method: 'GET',
            headers: {
                'x-api-key': etsyClientID,
                // Scoped endpoints require a bearer token
                'Authorization': authorization
            }
        }
        axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings`,shopRequestOptions)
          .then(shopResponse => {
            console.log("SHOP RESPONSE", shopResponse.data);
            console.log("Price", shopResponse.data.results[0].price);
            return shopResponse.data;
          })
        .catch(error => {
          console.log("ERROR");
          console.log(error);
        });
  })
    .catch(error => {
      console.log("ERROR");
      console.log(error);
    });
    return "EtsyInventory";
};


/* ------------------ END ETSY OAUTH ------------------ */


//GO http://localhost:4000/addUser TO ADD NEW USER WITH THIS CODE
router.get('/addUser', async (req, res) => {
    const userPassword = await bcrypt.hash('webslinger10!', 10);
    const user = { username: 'spiderman',email:'parker@gmail.com', password: userPassword };
    const newUser = new Schemas.Users(user);

    try {
        await newUser.save(async (err, newUserResult) => {
            console.log('New user created!');
            res.end('New user created!');
        });

    } catch (err) {
        console.log(err);
        res.end('User not added!');
    }

});

//GO http://localhost:4000/addItem TO ADD ITEM WITH THIS CODE
router.get('/addItem', async (req, res) => {
    const user = Schemas.Users; //define user
    const userId = await user.findOne({ username: 'ramon' }).exec();

    const item = { item: 'Soul Eater, Volumes: 1-5',description:'A dope read', etsyPrice: '15.49', ebayPrice: '15.49', user: userId }
    const newItem = new Schemas.Items(item);

    try {
        await newItem.save(async (err, newItemResult) => {
            console.log('New Item created!');
            res.end('New Item created!');
        });

    } catch (err) {
        console.log(err);
        res.end('Item not added!');
    }
})



router.get('/inventory', async (req, res) => { // here we grab our items
    const items = Schemas.Items;

    // this code will get all items and join the user table
    const userItems = await items.find({}).populate("user").exec((err, itemsData) => { // finds all items and automaticlly add user associated with item
        if (err) throw err;                                                             // we want to be able to select all the items and find the user
        if (itemsData) {
            res.end(JSON.stringify(itemsData));
        } else {
            res.end();
        }
    });
});

router.post('/addItem', async (req, res) => { // when user post items it gets sent to router to be added
    const itemName = req.body.itemName; // get item input field, name of field = itemInput
    const itemDescription = req.body.itemDescription;
    const ebayPrice = req.body.ebayPrice;
    const etsyPrice = req.body.etsyPrice;
    const user = Schemas.Users; //define user
    const userId = await user.findOne({ username: 'tahmid198' }).exec(); //need to create loginin to save userID for refrence, so now we manually add username
    // grab and wait till it gets it
    // findone = mongose function to find document in db

    const newItem = new Schemas.Items({  // save the item
        item: itemName,
        description: itemDescription,
        etsyPrice: etsyPrice,
        ebayPrice: ebayPrice,
        user: userId._id, // field to link user whose saving item
    });

    try { // we try to add it now
        await newItem.save((err, newItemResults) => {
            if (err) res.end('Error Saving.'); // if error
            res.redirect('/inventory'); // else, redirect back to inventory page
            res.end(); // make sure page ends after redirection
        });
    } catch (err) { // catch any errors
        console.log(err); // console log any erros
        res.redirect('/inventory'); // redirect page
        res.end(); // end page
    }
});

router.get('/ebayauth', (req, res) => {
  const scopes = ['https://api.ebay.com/oauth/api_scope',
    'https://api.ebay.com/oauth/api_scope/sell.marketing.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.marketing',
    'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.inventory',
    'https://api.ebay.com/oauth/api_scope/sell.account.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.account',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
];
  console.log("TEST");
  res.header('Access-Control-Allow-Origin', '*');
  const AuthUrl = ebayAuthToken.generateUserAuthorizationUrl('PRODUCTION', scopes);
  console.log(AuthUrl);
  return res.redirect(AuthUrl);
})

router.get('/ebayauth/callback', async (req, res) => {
  console.log("CALLBACK");
  const code = res.req.query.code;
  token = ""
  // Exchange Code for Authorization token
  const test = await ebayAuthToken.exchangeCodeForAccessToken('PRODUCTION', code).then((data) => { // eslint-disable-line no-undef
      token = JSON.parse(data).access_token;
  }).catch((error) => {
      console.log(error);
      console.log(`Error to get Access token :${JSON.stringify(error)}`);
  });
  if (token) {
    const inventoryData = await getInventory(token);
  }
  return res.redirect('http://localhost:3000/inventory');
});


async function getInventory (token) {
  auth = 'Bearer ' + token;
  axios.get('https://api.ebay.com/sell/inventory/v1/inventory_item?limit=2&offset=0',{
    headers: {
      'Authorization': auth,
      'Accept': 'application/json',
      'Content-Type':'application/json'
    }})
  .then(response => {
    console.log("EBAYDATA",response.data.inventoryItems);
    //console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
  return "GET INVENTORY";
};


router.post('/login', (req, res) => {

});

module.exports = router;
