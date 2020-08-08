set up server connection using express

let express = require("express");

let PORT = process.env.PORT || 3000;

let app = express();


app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});

2) set up sattic public folder

app.use(express.static("public"))

3) set your url encoded to parse requests

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//the following as two options
4 a) create your database connection with your sever 1)create  a "config" folder and a"connection.js" inside this folder

// Set up MySQL connection.
let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "database_name"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;


4 b) if using sequelize + mysql2 the connection will be made inside the config.json package
    1) npm install sequleize
    2) npm install mysql2
    3) npx sequelize-cli init:models
    4) npx sequlize-cli init:config
    This will install a config.json inside your config folder and fill in the dev portion
    5) create a model fold which will hold your table system 
    5 a) required this model folder (all files)inside the server.js file let db = require("./models");
    5 b) Syncing our sequelize models and then starting our Express app:
    
let server=app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

    - db.sequelize.sync({ force: true }).then(function() {
server
});


  

// let server=app.listen(PORT, function() {
//   // console.log("App now listening at localhost:" + PORT);
// });