# SoulSeller

## Notes:

<strong>BEFORE RUNNING THE APP</strong> <br>
Certain files need to be removed and reinstalled. <br>
In the backend
- rm -r node_modules
- npm install

In the frontend
- rm package-lock.json
- npm install

Frontend uses ES6 for react
Backend will use Node JS code


when react is set up for frontend it uses 3000 port, for backend it needs to be routed differently so we use 4000. Ports can use any number.

- **npm run server** will run nodemon index.js using script found in package.json. (USE TO RUN BACKEND) <br>
Message displayed will be <br>
> backend@1.0.0 server /Users/jasoncho/SoulSeller-5/node_react_app/backend <br>
> nodemon index.js <br>
> [nodemon] 2.0.14 <br>
> [nodemon] to restart at any time, enter `rs` <br>
> [nodemon] watching path(s): *.* <br>
> [nodemon] watching extensions: js,mjs,json <br>
> [nodemon] starting `node index.js` <br>
> Secure Server is running on port 4000. <br>
> DB connected <br>

- **npm start** will run the development server connected to port 3000.


