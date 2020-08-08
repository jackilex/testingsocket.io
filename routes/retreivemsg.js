let express = require("express");
let {Message} = require("../models");
const { Op } = require("sequelize");
let socket = require('socket.io')

// require("../socket")(io);


module.exports = function(app) {
    
    app.get("/api/msgs/:sender/:receiver", function(req, res) {
    // Find one Author with the id in req.params.id and return them to the user with res.json
    // console.log(req)
    Message.findAll({
      where: {
        sender: {
            [Op.or]: [req.params.sender,req.params.receiver]
        },
        reciever:{
            [Op.or]: [req.params.receiver,req.params.sender]
        }
      }
    }).then(function(oldmessage) {
        console.log(oldmessage)
      res.json(oldmessage);
    });
  });
}

  