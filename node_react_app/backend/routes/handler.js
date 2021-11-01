const express = require('express');
const router = express.Router();
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const ebayAuthToken = new EbayAuthToken({
    filePath: './routes/ebay-config.json' // input file path.
})

router.get('/inventory', (req, res) => {
    const str = [{
        "product": "Nintendo Gameboy Advance",
        "channel": "Amazon",
        "username": "tahmid_z"
    }];
    res.end(JSON.stringify(str));
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
  console.log(AuthUrl);
  return res.redirect(AuthUrl);
  //res.header('Access-Control-Allow-Origin', '*'); //SD: GET BACK TO THIS!
//  return res.end(JSON.stringify(AuthUrl));
});

router.post('/addProduct', (req, res) => {
    res.end('NA');
});

module.exports = router;
