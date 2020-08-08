//connecting/ setting up client side
let socket = io("http://localhost:8080");
// let socket = io("http://localhost:8080",{ path: '/direct' });


// let sender= $("#from").val()
//step 1) send user name to back-end
// step 2) get user name from and show it to users
// step 3) allow interaction of username(button)
// step 4) send message to specific username
//step 5) save messagess to mysql
//step 6) retieve old messages saved to database

let sendTo='';
let sender='';
let message=''
$('#sendName').click(function(e){
     //for testing only to be deleted
    e.preventDefault();
    console.log("emiting")
    sender= $("#from").val()
    socket.emit("user",sender)
})
socket.on("user",function(data){
   //for testing only to be deleted
    console.log("front-end "+data)
        $("#online").append($(`<button id=thisUser value=${data}>${data}</button>`))
        // $(`button[name=${data}`).removeClass( "redDot" ).addClass( "greenDot" );
    })
    

//1) on load make an ajax call to get all user names



//2) emit
//get user user username on load and emit it to back end serever
// $("document").ready(function(){
//     sender= $("#from").val()
//     socket.emit("user",sender)
// })
// socket.on("user",function(data){
//     console.log("front-end "+data)
//     // $("#online").append($(`<button id=thisUser value=${data}>${data}</button>`))
//     $(`button[name=${data}`).removeClass( "redDot" ).addClass( "greenDot" );
// })


//3 this allow you to message/select a specific user
$('#online').on('click','#thisUser',function(e){
        e.preventDefault();
    let thisUser= $(this).val()
    sendTo=thisUser
    console.log("sending to "+sendTo)
    console.log("sender "+sender)
    //make an ajax call 
    $.ajax({
        url: `/api/msgs/${sender}/${sendTo}`,
        method: "GET",
      })
        .then(function(result) {
          console.log((result[0].message));
          for (let i=0;i<result.length; i++){
            $("#incoming").append($('<p class=dmRetrieve>').text(`${result[i].sender} said: ${result[i].message}`))
          }
        //   $("#incoming").append($('<li>').text(JSON.parse(`${result}`)))
        });

    })

//this 
$('#send').click(function(e){
    e.preventDefault();
    message=$("#message").val();
    if (message==''){
    alert("Text must be filled out");
    return false
    }else{
        emitChat(message)
    }    
})


//emit chat function after validation
// chat measage from back end when users are online
function emitChat(value){
    socket.emit("chat",{
        receiver: sendTo,
        sender:sender,
        message:value
    });
    $("input:text").val('');
    $("#incoming").append($('<p class=dmout>').text(`You:${value}`));
}

//retrieve chat measage from back end when users are online
socket.on("messageRecieved",function(message){
    console.log(message)
    $("#incoming").append($('<p class=dmIn>').html(`${message.sender} said:${message.message}`))

})