const express = require('express');
var FormData = require('form-data');
const router = express.Router();
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const ebayAuthToken = new EbayAuthToken({
    filePath: './routes/ebay-config.json' // input file path.
});
const fetch = require('cross-fetch');
//const fetch = require('node-fetch');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// mongodb depencencies
const Schemas = require('../models/Schemas.js');
var objectId = require('mongodb').ObjectId;
var mongoClient = require('mongodb').MongoClient
var assert = require('assert');
const axios = require('axios');
require('dotenv/config');
const fs = require('fs');
const multer = require('multer') ;// multer will parse bodies that cannot be parse by bodyparser such as form data
const myImage = './uploads/waterbottle.jpeg';


router.use(express.urlencoded({ extended: false }));


// Add Access Control Allow Origin headers
router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.header("Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const storage = multer.diskStorage({
    destination: function(req, file, cb){
    cb(null, './uploads/'); // where incoming file gets stored
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname); // set name of incoming file
    }
});

// filter user pictures with minetype
const fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true); //accept files
    } else {
        cb(null, false); //reject files
    }
};

// upload image to server side storage, make sure image does not exceed limits
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // accept files up to 5MB
    },
    fileFilter: fileFilter
}); // multer will try to store all incoming files here



/* ------------------ BEGIN ETSY OAUTH ------------------ */

/**
These variables contain our Etsy API Key, the state sent
in the initial authorization request, and the client verifier compliment
to the code_challenge sent with the initial authorization request
*/
const etsyClientID = process.env.ETSY_KEY;
const etsyClientVerifier = process.env.ETSY_VERIFY;
const etsyRedirectUri = 'http://localhost:4000/oauth/redirect';
var etsyAuthentication = "";
var etsyUserID = ""


// Send a JSON response to a default get request
router.get('/ping', async (req, res) => {
    const requestOptions = {
        'method': 'GET',
        'headers': {
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
        // An Etsy access token includes your shop/user ID
        // as a token prefix, so we can extract that too
        const user_id = tokenData.access_token.split('.')[0];
        etsyAuthentication = 'Bearer ' + tokenData.access_token;
        etsyUserID = user_id;
        //syncDatabase();
        var inventory = await getEtsyInventory();
        console.log("TEST500", inventory);
        //getEtsyInventory().then(res => {etsyInventory = res});
        //console.log("Etsy Inventory Test", etsyInventory);
        res.redirect('http://localhost:3000/inventory');
    } else {
        res.send("Response was not okay");
    }
});

async function syncDatabase(){
  const etsyInventory = await getEtsyInventory();
  const items = etsyInventory.result.map(item => item.listing_id, item.title, item.description,
  item.state, item.url, item.quantity)
  console.log("ITEMS", items);
}

async function getEtsyInventory () {
    const requestOptions = {
        headers: {
            'x-api-key': etsyClientID
        }
    };
    var etsyInventory;
    // testImage = fs.readFileSync("./uploads/kippah.jpeg");
    // console.log("test image", testImage);
    axios.get(`https://openapi.etsy.com/v3/application/users/${etsyUserID}/shops`,requestOptions)
    .then(response => {
      const shop_id = response.data.shop_id;
      //getEtsyImage(shop_id,"1113666128");
      //ploadEtsyImage(etsyAuthentication, shop_id, "1140102067", JSON.stringify(testImage));
      //updateEtsyListing(etsyAuthentication, shop_id, "1140102067", 0.70);
        // createEtsyListing(etsyAuthentication, "1", "TestWater", "testingetsyapi", "0.40",
        //    "i_did", "true", "made_to_order", shop_id);
        const shopRequestOptions = {
            method: 'GET',
            headers: {
                'x-api-key': etsyClientID,
                'Authorization': etsyAuthentication
            }
        }
        axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings`,shopRequestOptions)
          .then(shopResponse => {
            etsyInventory = shopResponse.data;
            console.log(etsyInventory);
            //console.log("Price", shopResponse.data.results[0].price);
          })
        .catch(error => {
          //console.log(error);
          return "Error"
        });
  })
    .catch(error => {
      return "ERROR";
    });
    return await etsyInventory;
};

/* ------------------ END ETSY OAUTH ------------------ */


router.get('/inventory', authenticateToken, async (req, res) => {
    const userID = req.user.id;

    const inventory = Schemas.Items;

    const items = await inventory.find({ user: userID });

    if (!items) {
        return res.json({ status: 'error', message: 'You currently have no items in your inventory' });
    }

    return res.json({ items: items });
});


// .single will try to parse one file only, field name  = productImage
router.post('/addItem', upload.single('productImage'), async (req, res, next) => { // when user post items it gets sent to router to be added

    console.log(req.file);

    const itemName = req.body.itemName; // get item input field, name of field = itemInput
    const itemDescription = req.body.itemDescription;
    const ebayPrice = req.body.ebayPrice;
    const etsyPrice = req.body.etsyPrice;
    const imagePath = req.file.path;
    const imageType = req.file.mimetype;
    const imageData = fs.readFileSync(req.file.path)
    console.log(imageData);
    console.log(itemName);

    //const user = Schemas.Users; //define user
    //const userId = await user.findOne({ username: req.user.username }).exec(); //need to create loginin to save userID for refrence, so now we manually add username
    // grab and wait till it gets it
    // findone = mongose function to find document in db

    const newItem = new Schemas.Items({  // save the item
        item: itemName,
        description: itemDescription,
        etsyPrice: etsyPrice,
        ebayPrice: ebayPrice,
        image: {
            data: imageData,
            contentType: imageType,
            imagePath: imagePath
        },
        user: req.user.id // field to link user whose saving item

    });

    try { // we try to add it now
        await newItem.save((err, newItemResults) => {
            if (err) res.json({ status: 'error', message: 'Something went wrong. Item was not saved' }); // if error
            res.json({ status: 'ok', message: 'Item saved successfully' }); // make sure page ends after redirection
        });
    } catch (err) { // catch any errors
        console.log(err); // console log any erros
        res.json({ status: 'error', message: 'Something went wrong. Please try again' }); // end page
    }
});


// update items in mongodb
router.post('/update', upload.single('productImage'), async (req, res, next) => { // when user post items it gets sent to router to be added

    console.log(req.file);

    const itemName = req.body.itemName; // get item input field, name of field = itemInput
    const itemDescription = req.body.itemDescription;
    const ebayPrice = req.body.ebayPrice;
    const etsyPrice = req.body.etsyPrice;
    const productName = req.body.name;
    const id = req.body.id;
    var o_id = new objectId(id);
    // console.log(id);
    // console.log(itemName);

    const user = Schemas.Users; //define user
    const userId = await user.findOne({ username: 'ramon' }).exec(); //need to create loginin to save userID for refrence, so now we manually add username
    // grab and wait till it gets it
    // findone = mongose function to find document in db

    const updateItem = new Schemas.Items({  // save the item
        item: itemName,
        description: itemDescription,
        etsyPrice: etsyPrice,
        ebayPrice: ebayPrice,
        user: userId._id // field to link user whose saving item

    });
    const DB_URI = "mongodb+srv://soul_sucker:soulsRus@cluster0.eulwe.mongodb.net/node_soulseller?retryWrites=true&w=majority";
    // const client = new MongoClient(DB_URI);

      mongoClient.connect(DB_URI, async function(err, client) {
     if(err) throw err;
     var db = client.db("node_soulseller")
     assert.equal(null, err);
    //     db.collection('items').updateOne({item: productName}, {$set: updateItem}, function(err, result) {
    //       if(err) throw err;
    //       console.log('Item updated');
    //     //  console.log(result);
    //       client.close();
    //     });
    //Calling createEtsyListing function
    //TO DO!!!!!!!!!!
        createEtsyListing(quantity, item, description, etsyPrice,
           who_made, is_supply,when_made, shop_id)
        try { // we try to add it now
        await db.collection('items').updateOne({"_id": objectId(o_id)}, // use to filter item
                                                {$set: {"item":itemName, "description":itemDescription, "etsyPrice": etsyPrice, "ebayPrice": ebayPrice  }}, // update item
                                                { upsert: false }, (err, newItemResults) => {
        //if (err) res.end('Error Updating.'); // if error
        if (err) throw err;
        res.redirect('/inventory'); // else, redirect back to inventory page
        res.end(); }); // make sure page ends after redirection
    } catch (err) { // catch any errors
        console.log(err); // console log any erros
        res.redirect('/inventory'); // redirect page
        res.end(); // end page
     } finally {
        await client.close();
        console.log("client closed");
    }

    });
    // try { // we try to add it now
    //     await  db.collection('items').updateOne({"_id": objectId(id)},{$set:updateItem}, (err, newItemResults) => {
    //         if (err) res.end('Error Updating.'); // if error
    //         res.redirect('/inventory'); // else, redirect back to inventory page
    //         res.end(); // make sure page ends after redirection
    //     });
    // } catch (err) { // catch any errors
    //     console.log(err); // console log any erros
    //     res.redirect('/inventory'); // redirect page
    //     res.end(); // end page
    // }


        // collection('orders').updateOne(
        //     {"_id": objectId(id)},
        //     {$set:updateItem})
        //     .then((obj) => {
        //         console.log('Updated - ' + obj);
        //         res.redirect('orders')
        //     })
        //     .catch((err) => {
        //         console.log('Error: ' + err);
        //     })

});

// delete items in mongodb
router.post('/delete', upload.single('productImage'), function(req, res) {
    var id = req.body.id;
    const DB_URI = "mongodb+srv://soul_sucker:soulsRus@cluster0.eulwe.mongodb.net/node_soulseller?retryWrites=true&w=majority";
    console.log(id);

    mongoClient.connect(DB_URI, async function(err, client) {
        if(err) throw err;
        var db = client.db("node_soulseller")
        assert.equal(null, err);
        try { // we try to add it now
            await db.collection('items').deleteOne({"_id": objectId(id)}, (err, newItemResults) => {
            //if (err) res.end('Error Updating.'); // if error
            if (err) throw err;
            console.log("Item deleted");
            res.redirect('/inventory'); // else, redirect back to inventory page
            res.end(); }); // make sure page ends after redirection
        } catch (err) { // catch any errors
            console.log(err); // console log any erros
            res.redirect('/inventory'); // redirect page
            res.end(); // end page
         } finally {
            await client.close();
            console.log("client closed");
        }

    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('Home');
  });

router.get('/get-data', function(req, res, next) {
    var resultArray = [];
    const DB_URI = "mongodb+srv://soul_sucker:soulsRus@cluster0.eulwe.mongodb.net/node_soulseller?retryWrites=true&w=majority";

    mongoClient.connect(DB_URI, async function(err, client) {
        if(err) throw err;
        var db = client.db("node_soulseller")
        assert.equal(null, err);
        try {
            var cursor = db.collection('items').find();
           await cursor.forEach((doc, err) => {
                if(err) throw err;
                console.log("error: "+ err);
                assert.equal(null, err);
                resultArray.push(doc);
                console.log(doc);
            });
            //res.redirect('/inventory');
            //res.end(); // make sure page ends after redirection
        } catch (err) {
            console.log(err); // console log any erros
            res.redirect('/inventory'); // redirect page
            res.end(); // end page
        } finally {
            await client.close();
            //res.render('');
        };
    });

});


//EBAY AUTH NOT IN USE
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
  res.header('Access-Control-Allow-Origin', '*');
  const AuthUrl = ebayAuthToken.generateUserAuthorizationUrl('PRODUCTION',
   scopes);
  return res.redirect(AuthUrl);;
});

router.post('/login', async (req, res) => {

    const User = Schemas.Users;
    const user = await User.findOne({ email: req.body.email }).lean();

    if (!user) {

        return res.json({ status: 'error', error: 'Invalid email/password' });
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {

            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET);

            const _newToken = { token: refreshToken, user: user };
            const newToken = new Schemas.Refresh(_newToken);

            try {
                await newToken.save(async (err, newTokenResult) => {
                    console.log('User login successful');
                    res.status(201).send();
                });

            } catch (err) {
                res.status(500).send();
            }

            return res.json({ status: 'ok', message: 'User log in was successful', user: user.username, accessToken: accessToken });
        }

    } catch (err) {

        console.log(err);
    }

    res.json({ status: 'error', error: 'Invalid email/password' });

});

router.delete('/logout', authenticateToken, async (req, res) => {

    const Token = Schemas.Refresh;

    await Token.findOneAndRemove({ user: req.user.id }, (err, deleteSuccess) => {

        if (!err) {

            console.log('User successfully logged out');
            console.log(deleteSuccess);

        } else console.log(err);

    }).clone();

    res.json({ status: '204', message: 'User successfully logged out' });
});

router.post('/register', async (req, res) => {

    var hashedPassword = '';

    const User = Schemas.Users;
    const existingUser = await User.findOne({ email: req.body.email }).lean();

    if (existingUser) {
        return res.json({ status: 'error', message: 'A user with that email already exists' });
    }

    try {
        hashedPassword = await bcrypt.hash(req.body.password, 12);
    } catch (err) {
        console.log(err);
        res.end('Password not generated!')
    }

    const user = { username: req.body.name, email: req.body.email, password: hashedPassword };
    const newUser = new Schemas.Users(user);

    try {
        await newUser.save(async (err, newUserResult) => {
            console.log('New user created!');
            res.status(201).send();
        });

    } catch (err) {
        res.status(500).send();
    }

});

router.post('/token', async (req, res) => {

    const refreshToken = req.body.token;

    if (refreshToken == null) return res.sendStatus(401);

    const Token = Schemas.Refresh;
    const token = await Token.findOne({ token: refreshToken }).lean();
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {

        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });

    });

});

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {

        if (err) return res.sendStatus(403);
        req.user = user;
        next();

    });

};

function generateAccessToken(user) {
    return jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
};


async function getEbayInventory(token) {
    auth = 'Bearer ' + token;
    axios.get('https://api.ebay.com/sell/inventory/v1/inventory_item?limit=2&offset=0', {
        headers: {
            'Authorization': auth,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data);
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    return "GET INVENTORY";
};

async function getTaxonmyID () {
  const requestOptions = {
      'method': 'GET',
      'headers': {
          'x-api-key': etsyClientID,
      },
  };
  axios.get('https://openapi.etsy.com/v3/application/seller-taxonomy/nodes',
  requestOptions)
  .then( response => {
    const data = response.data;
    console.log("taxonomyData", data);
    return data;
  })
  .catch( err => {
    console.log(err)
  });
};
//upload not currently functional
// async function uploadEtsyImage(auth, shop_id, listing_id, binaryImage){
//   var headers = new fetch.Headers();
//   headers.append("Content-Type", "multipart/form-data");
//   headers.append("x-api-key", etsyClientID);
//   headers.append("Authorization", auth);
//   //console.log(headers);
//   var imageParams = new FormData();
//   imageParams.append("image", binaryImage);
//
//   var requestImageOptions = {
//     method:'POST',
//     headers: headers,
//     body: imageParams,
//     redirect: 'follow'
//   }
//   fetch(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}/images`, requestImageOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
//
// };

async function getEtsyImage(shop_id, listing_id){
  const requestOptions = {
      headers: {
          'x-api-key': etsyClientID
      }
  };
  axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}/images`, requestOptions)
    .then (res => {
                  console.log(res.data)
                  console.log(res.data.results[0].url_170x135)
                })
    .catch(err => console.log(err));
}''
//TODO: add server end point for updating
async function updateEtsyListing(shop_id, listing_id, price) {
  if (!etsyAuthentication) {
    return "Error not authenticated with Etsy";
  }
//description, price, title, could add more parameters later
var headers = new fetch.Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append("x-api-key", etsyClientID);
headers.append("Authorization", etsyAuthentication);

var updateParams = new URLSearchParams();
updateParams.append("price", price);
// description ? : updateParams.append("description", description)
console.log("PRICE", price)
var requestUpdateOptions = {
  method: 'PUT',
  headers: headers,
  body: updateParams,
  redirect: 'follow'
}
fetch(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}`, requestUpdateOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

};

/* BEGIN ETSY POST */
//TODO:
//1) getTaxonmyID,
//2)get the ShippingID for the user (and ask them to select which?)
//3) or ask them to create one.
//4) Redirect to....
//5) Ask them whether they want to publish the draft

async function createEtsyListing(quantity, title, description, price,
   who_made, is_supply,when_made, shop_id) {
  const taxonomy_id = "1296"
  if (!etsyAuthentication) {
    return "Error not authenticated with Etsy";
  }

  var headers = new fetch.Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");//x-www-form-urlencoded
  headers.append("x-api-key", etsyClientID);
  headers.append("Authorization", etsyAuthentication);

  var shippingParams = new URLSearchParams();
  shippingParams.append("title", "New profile six");
  shippingParams.append("min_processing_time", 1);
  shippingParams.append("title", "New profile five");
  shippingParams.append("min_processing_time", 1);
  shippingParams.append("max_processing_time", 9);
  shippingParams.append("origin_country_iso", "BV");
  shippingParams.append("primary_cost", 50.00);
  shippingParams.append("secondary_cost", 35.00);
  shippingParams.append("destination_country_iso", "BV");
  shippingParams.append("min_delivery_days", 2);
  shippingParams.append("max_delivery_days", 45);

var requestShippingProfile = {
    method: 'POST',
    headers: headers,
    body: shippingParams,
    redirect: 'follow'
};

fetch(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles`, requestShippingProfile)
    .then(result => console.log("RESULT",result))
    .catch(error => console.log('error', error));

  var urlencoded = new URLSearchParams();
  urlencoded.append('quantity', quantity);
  urlencoded.append('title',title);
  urlencoded.append('description', description);
  urlencoded.append('price', price);
  urlencoded.append('taxonomy_id', taxonomy_id);
  urlencoded.append('who_made', who_made);
  urlencoded.append('is_supply', is_supply);
  urlencoded.append('when_made', when_made);
  urlencoded.append('shipping_profile_id',162052746338)

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: urlencoded,
    redirect: 'follow'
 };

fetch(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

module.exports = router;
