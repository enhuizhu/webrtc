/**
* the entry file for the node backend
**/
var port = 8080;
var io = require("socket.io").listen(port);
var userService = require("./userService");

io.sockets.on("connection",function(socket){
    console.log("new client connected!");
    socket.on("disconnect",function(){
         console.log("client disconnected!");
         /**
		 * when user disconnect from the server,
		 * should delete the user in the user list
		 **/
         userService.deleteUser(socket.user);	   
	     io.sockets.emit("user leave",{"leaveUser":socket.user,"userList":userService.list});
	});
	
	socket.on("join",function(data){
       if(userService.addUser(data.user,socket)){
	      socket.user = data.user;
		  /**
		  * should tell everyone that, new user join
		  **/
	      io.sockets.emit("new user join",{"newUser":data.user,"userList":userService.list});	   
	   }else{
	      /**
		  * should send error message back
		  **/
          socket.emit("user already join",{"msg":data.user+" already join!"});
	   }
	});

    socket.on("call",function(data){
         var remoteSocket = userService.getSocketBaseOnUser(data.user);
         remoteSocket.emit("remote.calling",{from:data.from});
    });

    socket.on("handUp",function(data){
         var remoteSocket = userService.getSocketBaseOnUser(data.user);
         remoteSocket.emit("remote.handUp",{from:data.from});
    });

    socket.on("send.call.candidate",function(data){
         var remoteSocket = userService.getSocketBaseOnUser(data.usersData.user);
         remoteSocket.emit("get.call.candidate",data);
    });

    socket.on("send.call.description",function(data){
         var remoteSocket = userService.getSocketBaseOnUser(data.usersData.user);
         remoteSocket.emit("get.call.description",data);
    });
  
    socket.on("send.answer.candidate",function(data){
         var localSocket = userService.getSocketBaseOnUser(data.usersData.from);
         localSocket.emit("get.answer.candidate",data);
    });

    socket.on("send.answer.description",function(data){
    	 var localSocket = userService.getSocketBaseOnUser(data.usersData.from);
         localSocket.emit("get.answer.description",data);
    });
   
 
});