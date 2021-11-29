const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');
const corsMiddleware = require('./cors')

//needed for ebayAuth added by SD
const fs = require('fs')
const path = require('path')
const https = require('https')

const app = express();

app.use(corsMiddleware);
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));
app.use('/', routesHandler);
app.use('/', routesHandler, corsMiddleware);

require('dotenv/config')


// DB connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    console.log('DB connected')
})
.catch((err) => {
    console.log('err')
})




//sslServer is necessary to use https instead of http
const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)
// access port parameter set in env file or add 4000 to it
const PORT = process.env.PORT || 4000; // backend routing port
sslServer.listen(PORT, () =>  {
  console.log(`Secure Server is running on port ${PORT}.`);
});
