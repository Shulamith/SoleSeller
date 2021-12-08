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


var objectId = require('mongodb').ObjectId;
// const {MongoClient} = require('mongodb');
var mongoClient = require('mongodb').MongoClient
var assert = require('assert');
require('dotenv/config');

router.use(express.urlencoded({ extended: false }));


// Add Access Control Allow Origin headers
router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.header(
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const fs = require('fs')
const multer = require('multer'); // multer will parse bodies that cannot be parse by bodyparser such as form data
const { mongo } = require('mongoose');

const storage = multer.diskStorage({
    destination: function(req, file, cb){ 
    cb(null, './uploads/'); // where incoming file gets stored
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname); // set name of incoming file
    }
});

const fileFilter = (req, file, cb) => {
    
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true); //accept files
    } else {
        cb(null, false); //reject files
    }
};

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

/* ------------------ END ETSY OAUTH ------------------ */



//GO http://localhost:4000/addItem TO ADD ITEM WITH THIS CODE
router.get('/addItem', async (req, res) => {
    const user = Schemas.Users; //define user
    const userId = await user.findOne({ username: 'ramon' }).exec();

    const item = { item: 'Soul Eater, Volumes: 1-5', price: '15.49', channel: 'Amazon', user: userId }
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
});


router.get('/inventory', authenticateToken, async (req, res) => { // here we grab our items
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

    const user = Schemas.Users; //define user
    const userId = await user.findOne({ username: 'ramon' }).exec(); //need to create loginin to save userID for refrence, so now we manually add username
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
        user: userId._id // field to link user whose saving item
        
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


// .single will try to parse one file only, field name  = productImage
router.post('/update', upload.single('productImage'), async (req, res, next) => { // when user post items it gets sent to router to be added
    
    console.log(req.file);

    const itemName = req.body.itemName; // get item input field, name of field = itemInput
    const itemDescription = req.body.itemDescription;
    const ebayPrice = req.body.ebayPrice;
    const etsyPrice = req.body.etsyPrice;
    // const imagePath = req.file.path;
    // const imageType = req.file.mimetype;
    // const imageData = fs.readFileSync(req.file.path)
    // console.log(imageData);
    const productName = req.body.name;
    const id = req.body.id;
    var o_id = new objectId(id);
    console.log(id);
    console.log(itemName);

    const user = Schemas.Users; //define user
    const userId = await user.findOne({ username: 'ramon' }).exec(); //need to create loginin to save userID for refrence, so now we manually add username
    // grab and wait till it gets it
    // findone = mongose function to find document in db

    const updateItem = new Schemas.Items({  // save the item
        item: itemName,
        description: itemDescription,
        etsyPrice: etsyPrice,
        ebayPrice: ebayPrice,
        // image: {
        //     data: imageData,
        //     contentType: imageType,
        //     imagePath: imagePath
        // },
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
        try { // we try to add it now
           await db.collection('items').updateOne({"_id": objectId(o_id)}, // use to filter item
                                                    {$set: {"item":itemName, "description":itemDescription, "etsyPrice": etsyPrice, "ebayPrice": ebayPrice  }}, // update item 
                                                    { upsert: false }, (err, newItemResults) => {
            //if (err) res.end('Error Updating.'); // if error
            if (err) throw err;
            res.redirect('/inventory'); // else, redirect back to inventory page
            res.end(); // make sure page ends after redirection
        });
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


// router.post('/update', async (req, res, next) => { // when user post items it gets sent to router to be added
    
//     const itemName = req.body.itemName; // get item input field, name of field = itemInput
//     const itemDescription = req.body.itemDescription;
//     const ebayPrice = req.body.ebayPrice;
//     const etsyPrice = req.body.etsyPrice;
//     const id = req.body.id;
//     console.log(itemName);
//     const user = Schemas.Users; //define user
//     const userId = await user.findOne({ username: 'ramon' }).exec(); //need to create loginin to save userID for refrence, so now we manually add username
//     // grab and wait till it gets it
//     // findone = mongose function to find document in db

//     const updateItem = new Schemas.Items({  // save the item
//         item: itemName,
//         description: itemDescription,
//         etsyPrice: etsyPrice,
//         ebayPrice: ebayPrice,
//         user: userId._id // field to link user whose saving item
//     });
   

//     try { // we try to add it now
//         await updateItem.updateOne({"_id": objectId(id)},{$set:updateItem}, (err, newItemResults) => {
//             if (err) res.end('Error Updating.'); // if error
//             res.redirect('/inventory'); // else, redirect back to inventory page
//             res.end(); // make sure page ends after redirection
//         });
//     } catch (err) { // catch any errors
//         console.log(err); // console log any erros
//         res.redirect('/inventory'); // redirect page
//         res.end(); // end page
//     }
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
});

// router.get('/profile', authenticateToken, (req, res) => {
//     res.json({ status: 'ok', id: req.user.id, username: req.user.username, email: req.user.email });
// });

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

async function getInventory(token) {
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


module.exports = router;
