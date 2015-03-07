/**
* the entry file for the node backend
**/
var port = 8080;
var io = require("socket.io").listen(port);

console.log("socket io app start!");
io.sockets.on("connection",function(socket){
    console.log("new client connected!");
    


    socket.on("disconnect",function(){
         console.log("client disconnected!");
    });

});