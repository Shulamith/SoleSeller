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
//router.use(express.urlencoded({ extended: false }));

const users = []

/* ------------------ BEGIN ETSY OAUTH ------------------ */

/**
These variables contain our Etsy API Key, the state sent
in the initial authorization request, and the client verifier compliment
to the code_challenge sent with the initial authorization request
*/
const etsyClientID = 'b397ddo9ov4lu91igrv1rjjc';
const etsyClientVerifier = 'dL5oT2IMlIV6zVXXRRaEk-OwbVGPKrlU0ids8Dg2ahk';
const etsyRedirectUri = 'http://localhost:4000/oauth/redirect';

router.get("/oauth/redirect", async (req, res) => {
    // The req.query object has the query params that Etsy authentication sends
    // to this route. The authorization code is in the `code` param
    const authCode = req.query.code;
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
        //res.redirect('/inventory');
        res.redirect(`/inventory?access_token=${tokenData.access_token}`);
    } else {
        res.send("oops");
    }
});

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
    const userId = await user.findOne({ username: 'tahmid198' }).exec();

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

    // const userItems = await items.find({}, (err, itemsData) => {

    // this code will get all items and join the user table
    const userItems = await items.find({}).populate("user").exec((err, itemsData) => { // finds all items and automaticlly add user associated with item
        if (err) throw err;                                                             // we want to be able to select all the items and find the user
        if (itemsData) {
            res.end(JSON.stringify(itemsData));
        } else {
            res.end();
        }
    }); // so when we query our tables and finds all of our items with will auto add user associated with that tweet



    // const str = [{
    //     "product": "Nintendo Gameboy Advance",
    //     "channel": "Amazon",
    //     "username": "tahmid_z"
    // }];
    // res.end(JSON.stringify(str));
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

router.get('/addRegister', function(req, res){
    res.send("Hello from the root application URL");
});

router.post('/addRegister', async(req, res) => {
    // const userName = req.body.name;
    // const userEmail = req.body.email;
    // const userPassword = bcrypt.hash(req.body.password, 10);

    const userName = "Tahmid";
    const userEmail = "LoverBoy1800@gmail.com";
    const userPassword = await bcrypt.hash("12233455f", 10);

    const newUser = new Schemas.Users ({
        username: userName,
        email: userEmail,
        password: userPassword
    });
    try {
        await newUser.save((err, newUserResults) => {
            if (err) res.end('Error Saving.');
            res.redirect('/login');
            res.end();
            });    
        } catch (err) {
            console.log(err)
            res.redirect('/Register');
             res.end();
            
        }      
});
// router.post('/Register', (req, res) => {
//     try {
//         const hashedPassword = async () => { await bcrypt.hash(req.form.password.value, 10) };
//         //const newUser = schemas.Users;
//         users.push({
//             username: req.form.Name.value,
//             email: req.form.email.value,
//             password: hashedPassword
//         });
        
//     res.redirect('/login');
//     } catch {
//         res.redirect('/Register');
//     }
//     console.log(users);
// });

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
  res.header('Access-Control-Allow-Origin', '*'); //SD: GET BACK TO THIS!
  // // Authorization Code Auth Flow
  //res.header('Access-Control-Allow-Origin', '*');
  const AuthUrl = ebayAuthToken.generateUserAuthorizationUrl('PRODUCTION', scopes);

  console.log(AuthUrl);
  //console.log(res.redirect(AuthUrl));
  return res.redirect(AuthUrl);
  //console.log("RESPONSE QUERY", res.query)
  //console.log(res.query);
  //return ("authurl");
//  return res.end(JSON.stringify(AuthUrl));
})

router.get('/ebayauth/callback', async (req, res) => {
  //code = await res.code
  console.log("CALLBACK");
  //console.log(code)
  // console.log(res);
  //console.log(res.req.query.code);
  const code = res.req.query.code;
  console.log("CODE", code);
  token = ""
  // Exchange Code for Authorization token
  const test = await ebayAuthToken.exchangeCodeForAccessToken('PRODUCTION', code).then((data) => { // eslint-disable-line no-undef
      console.log("DATA", data);
      console.log("TOKEN!!", JSON.parse(data).access_token);
      token = JSON.parse(data).access_token;
  }).catch((error) => {
      console.log(error);
      console.log(`Error to get Access token :${JSON.stringify(error)}`);
  });
  if (token) {
    const inventoryData = await getInventory(token);
    console.log("Token:", token);
    console.log("inventoryData", inventoryData);
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
    console.log(response.data);
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });
  return "GET INVENTORY";
};


router.post('/addProduct', (req, res) => {
    res.end('NA')
});



router.post('/login', (req, res) => {

});

module.exports = router;

