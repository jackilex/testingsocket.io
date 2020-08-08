// how it work
//1 set up basic server conection with express(with html and tatic public folder)
//2 set up server side(back-end) socket.io connection (require socket node library/socket.io to work w web socket)
//3 set up client side(front-end) socket connection on a js file using io()(require cdnjs socket)
//4) emit message from the DOM on the front end and send it to server side
//5) handle the incoming calls

//step for this project (back-end)
//step 1) get user name from front-end and save it to an id
// step 2) send user name back to front - end
// step 3) recieve message from front-end
// step 4) send message to specific username
//step 5) save messagess to mysql (with a post request)
//step 6) create a get request
//step 7) test data been retrieve


//step for this project (front-end)
// let sender= $("#from").val()
//step 1) send user name to back-end
// step 2) get user name from and show it to users
// step 3) allow interaction of username(button)
// step 4) send message to specific username
//step 5) save messagess to mysql
//step 6) ...


// set up path client let io = require('socket.io')({path: '/sms'});
//let socket = require("socket.io")( { resource: '/sms' });
let socket = require('socket.io');
let {Message} = require("./models");
const { Op } = require("sequelize");
module.exports = function(io) {
    let usersArray=[];

    io.on("connection", (socket)=>{
      // console.log(socket)
        console.log('made socket connection with id:',socket.id);
        
        socket.on("user", function(data){
          console.log("back-end "+data)
    
          usersArray[data]=socket.id;
          console.log(usersArray)
    
          //emit user logged in to all sockets
          io.emit("user",data)
          // io.sockets.emit('chat', data)
      })
    //socket.broadcast.emit("user",data)
        socket.on("chat", function(message){
            console.log("back-end "+message)
            //emit message to single socket
            let socketId = usersArray[message.receiver];
            console.log(socketId)
            io.to(socketId).emit("messageRecieved",message);
           
            Message.create({sender:message.sender,reciever:message.receiver, message:message.message})
        })
    } )

}