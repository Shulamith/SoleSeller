##SOULSHOPPER

We first initiate react app use command 
- 'npm init react-app ./frontend' -> we place app in folder called frontend
- or we can use the following command 'npx create-react-app frontend'; this creates packages for us and includes react app in forntend folder

When we initiated frontend folder we added all required dependencies found in package.json. Also has script commands to start up react. 

then do 'cd frontend' and 'npm start' to have our react app running. Use 'ctrl+C' to stop it.

jQuert and Bootstrap code added to header of index.html for fonts.

frontend > src > components > Nav.js --> code for navagation added here


Create backend, cd into the folder and use command 'npm init -y' for the package.json file
create index.js file. Then, do npm install --save-dev nodemon

npm install express  body-parser concurrently
we runn frontend and backend together by using concurrently package

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



  resources:
  https://www.youtube.com/watch?v=3isCTSUdXaQ