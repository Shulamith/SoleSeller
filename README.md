# SoulSeller

## Notes:

Frontend uses ES6 for react
Backend will use Node JS code


when react is set up for frontend it uses 3000 port, for backend it needs to be routed differently so we use 4000. Ports can use any number.

**npm run server** will run nodemon index.js using script found in package.json
**npm run client** will run front end using script found in package.json
**npm run build** will kill all other process and run server and client concurrently

"scripts": {
    "server": "nodemon index.js", 
    "client": "npm runt start --prefix ../frontend",
    "build": "concurrently --kil-others-on-fail \"npm run server\" \"npm run client\""
  },

## Video Walkthrough
Version 1.0:
![Version 1.0](./images/Inital_Layout.gif)

Resources:

https://www.youtube.com/watch?v=3isCTSUdXaQ