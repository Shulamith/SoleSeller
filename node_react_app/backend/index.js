const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const EbayAuthToken = require('ebay-oauth-nodejs-client');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

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
//Invoking oauth ebay library
const ebayAuthToken = new EbayAuthToken({
    filePath: './routes/ebay-config.json' // input file path.
})

const clientScope = 'https://api.ebay.com/oauth/api_scope';
// // Client Crendential Auth Flow
ebayAuthToken.getApplicationToken('SANDBOX', clientScope).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});

// // Authorization Code Auth Flow
ebayAuthToken.generateUserAuthorizationUrl('SANDBOX', scopes); // get user consent url.
// Using user consent url, you will be able to generate the code which you can use it for exchangeCodeForAccessToken.
// Also accepts optional values: prompt, state
ebayAuthToken.generateUserAuthorizationUrl('SANDBOX', scopes, { prompt: 'login', state: 'custom-state-value' });

// // Exchange Code for Authorization token
ebayAuthToken.exchangeCodeForAccessToken('SANDBOX', code).then((data) => { // eslint-disable-line no-undef
    console.log(data);
}).catch((error) => {
    console.log(error);
    console.log(`Error to get Access token :${JSON.stringify(error)}`);
});

// // Getting access token from refresh token obtained from Authorization Code flow
const refreshToken = 'v^1.1#i^1#r^1#f^0#I^3#p^3#t^Ul4xMF8yOjNDMjU1MUI0OTJBMDg5NUZGMUY4RkEwNjk1MDRBQjQ2XzNfMSNFXjI2MA==';
ebayAuthToken.getAccessToken('PRODUCTION', refreshToken, scopes).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(`Error to get Access token from refresh token:${JSON.stringify(error)}`);
});

const PORT = 4000; // backend routing port
app.listen(PORT, () =>  {
    console.log(`Server is running on port ${PORT}.`);
});
