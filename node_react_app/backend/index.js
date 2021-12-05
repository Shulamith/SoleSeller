const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
//const corsMiddleware = require('./cors')
// --------------- UN-COMMENT LINE ABOVE FOR SSL SERVER ---------------
const mongoose = require('mongoose');

const app = express();


//needed for ebayAuth added by SD
// --------------- UN-COMMENT THE NEXT 3 LINES FOR SSL SERVER ---------------
//const fs = require('fs')
//const path = require('path')
//const https = require('https')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', routesHandler);

// --------------- UN-COMMENT THE NEXT 2 LINES FOR SSL SERVER ---------------
//app.use(corsMiddleware);
//app.use('/', routesHandler, corsMiddleware);

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
// --------------- UN-COMMENT THE NEXT 4 LINES FOR SSL SERVER ---------------
//const sslServer = https.createServer({
//    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
//}, app)


// access port parameter set in env file or add 4000 to it
const PORT = process.env.PORT || 4000; // backend routing port
// --------------- CHANGE NEXT LINE TO 'sslServer.listen' TO LISTEN FOR SSL SERVER ---------------
app.listen(PORT, () =>  {
  console.log(`Server is running on port ${PORT}.`);
});
