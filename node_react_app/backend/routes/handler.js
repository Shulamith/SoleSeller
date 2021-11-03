const express = require('express');
const router = express.Router();
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const ebayAuthToken = new EbayAuthToken({
    filePath: './routes/ebay-config.json' // input file path.
})
const bcrypt = require('bcrypt');
const Schemas = require('../models/Schemas.js');

//router.use(express.urlencoded({ extended: false }));

const users = []

//GO http://localhost:4000/addUser TO ADD NEW USER WITH THIS CODE
router.get('/addUser', async (req, res) => {
    const user = { username: 'superman', fullname: 'clark kent' };
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
    const userItem = req.body.itemInput; // get item input field, name of field = itemInput
    const userItemPrice = req.body.itemPriceInput;
    const user = Schemas.Users; //define user
    const userId = await user.findOne({ username: 'tahmid198' }).exec(); //need to create loginin to save userID for refrence, so now we manually add username
    // grab and wait till it gets it
    // findone = mongose function to find document in db

    const newItem = new Schemas.Items({  // save the item
        item: userItem,
        user: userId._id, // field to link user whose saving item
        price: userItemPrice
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
  // // Authorization Code Auth Flow
  //res.header('Access-Control-Allow-Origin', '*');
  const AuthUrl = ebayAuthToken.generateUserAuthorizationUrl('SANDBOX', scopes);
  const clientScope = 'https://api.ebay.com/oauth/api_scope';
  // // Client Crendential Auth Flow
  ebayAuthToken.getApplicationToken('SANDBOX', clientScope).then((data) => {
      console.log(data);
  }).catch((error) => {
      console.log(`Error to get Access token :${JSON.stringify(error)}`);
  });
  console.log(AuthUrl);
  return res.redirect(AuthUrl);
  //res.header('Access-Control-Allow-Origin', '*'); //SD: GET BACK TO THIS!
//  return res.end(JSON.stringify(AuthUrl));
});

router.post('/addProduct', (req, res) => {
    res.end('NA');
});



router.post('/login', (req, res) => {

});


router.post('/Register', (req, res) => {
    try {
        const hashedPassword = async () => { await bcrypt.hash(req.form.password.value, 10) };
        //const newUser = schemas.Users;
        users.push({
            username: req.form.Name.value,
            email: req.form.email.value,
            password: hashedPassword
        });
        res.redirect('/login');
    } catch {
        res.redirect('/Register');
    }
    console.log(users);
});


module.exports = router;
