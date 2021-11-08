const express = require('express')
const bodyParser = require('body-parser')
const routesHandler = require('./routes/handler.js')
const corsMiddleware = require('./cors')

//needed for ebayAuth added by SD
const fs = require('fs')
const path = require('path')
const https = require('https')

const mongoose = require('mongoose')

const app = express();

//CORS Middleware below may not be necessary
app.use(corsMiddleware);
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));
app.use('/', routesHandler, corsMiddleware);

require('dotenv/config')



// // Authorization Code Auth Flow
// ebayAuthToken.generateUserAuthorizationUrl('SANDBOX', scopes); // get user consent url.

// // // Exchange Code for Authorization token
// ebayAuthToken.exchangeCodeForAccessToken('SANDBOX', code).then((data) => { // eslint-disable-line no-undef
//     console.log(data);
// }).catch((error) => {
//     console.log(error);
//     console.log(`Error to get Access token :${JSON.stringify(error)}`);
// });

// // // Getting access token from refresh token obtained from Authorization Code flow
// const refreshToken = 'v^1.1#i^1#r^1#f^0#I^3#p^3#t^Ul4xMF8yOjNDMjU1MUI0OTJBMDg5NUZGMUY4RkEwNjk1MDRBQjQ2XzNfMSNFXjI2MA==';
// ebayAuthToken.getAccessToken('PRODUCTION', refreshToken, scopes).then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.log(`Error to get Access token from refresh token:${JSON.stringify(error)}`);
// });


// DB connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    console.log('DB connected')
})
.catch((err) => {
    console.log('err')
})


/*
//WHAT IS THE CODE BELOW FOR????????
// code for production
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'frontend/build', routesHandler));
    });
}
*/

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)
// access port parameter set in env file or add 4000 to it
const PORT = process.env.PORT || 4000; // backend routing port
sslServer.listen(PORT, () =>  {
  console.log(`Secure Server is running on port ${PORT}.`);
});
