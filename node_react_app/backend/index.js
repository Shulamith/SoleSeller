const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

const PORT = 4000; // backend routing port
app.listen(PORT, () =>  {
    console.log(`Server is running on port ${PORT}.`);
});

//EBAY OAuth
// Import the axios library, to make HTTP requests
const axios = require('axios')
// This is the client ID and client secret that you obtained
// while registering on ebay app
const clientID = 'Shulamit-SoulSell-SBX-11b09fbb0-0fa2cf0b'
const clientSecret = 'SBX-1b09fbb04f30-3350-48e2-8c2b-9c76'

// Declare the callback route
app.get('/ebay/callback', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code

  axios({
    method: 'post',
    url: `https://ebay.com/oauth/api_scope/sell.inventoryclient_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    access_token = response.data.access_token
    res.redirect('/success');
  })
})

app.get('/success', function(req, res) {

  axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token
    }
  }).then((response) => {
    res.render('pages/success',{ userData: response.data });
  })
});
