/**
* all the script related to web socket will be
* here
**/
var socket = io.connect(socket_url);
socket.on('connect', function (data) {
    console.log("connect to server successfully!");
    console.log(data);
});


socket.on("disconnect",function(data){
    console.log("disconnect from server");
    console.log(data);
});


socket.on("error",function(data){
	console.log("error happened on socket");
	console.log(data);
})

