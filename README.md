# SoleSeller

## Notes:

Frontend uses ES6 for react
Backend will use Node JS code

*IF CONNECTING TO AN SSL SERVER SEVERAL CHANGES NEED TO BE MADE TO THE 'index.js' FILE IN THE BACKEND, SEE COMMENTS FOR DETAILS. ALSO NEED THE PROXY SET UP IN THE FRONTEND 'package.json' FILE.*


when react is set up for frontend it uses 3000 port, for backend it needs to be routed differently so we use 4000. Ports can use any number.

- **npm run server** will run nodemon index.js using script found in package.json. (USE TO RUN BACKEND)
- **npm run client** will run front end using script found in package.json.(USE TO RUN FRONTEND)
- **npm run build** will kill all other process and run server and client concurrently. (USE TO RUN BACKEND AND FRONTEND CONCURRENTLY)


"scripts": {
    "server": "nodemon index.js", 
    "client": "npm runt start --prefix ../frontend",
    "build": "concurrently --kil-others-on-fail \"npm run server\" \"npm run client\""
  },

## Video Walkthrough
Version 1.0:
![Version 1.0](./images/Inital_Layout.gif)

Resources:

<!--https://www.youtube.com/watch?v=3isCTSUdXaQ>
