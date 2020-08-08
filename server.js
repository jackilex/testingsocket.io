
const express = require("express");
const socket = require('socket.io')
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser')

let app = express();

let db = require("./models");
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let server=app.listen(PORT, function() {
  // console.log("App now listening at localhost:" + PORT);
});

db.sequelize.sync({ force: false }).then(function() {
  server;
});


//socket set u... parameter is the server you want to listen to
let io= socket(server)

require("./socket")(io);
require("./routes/retreivemsg.js")(app)
require("./routes/html-routes.js")(app);
