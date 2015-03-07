"use strict";

/**
* angular service for socket
**/

angular.module("webrtcApp").service("socket",function(){
	
	this.socket = null;
    
    this.bootBootstrap = function(){
       this.socket = io.connect(socket_url);
       this.socket.on("connect",function(data){
          console.log("connect to server successfully!");
       });
     
    };


  



});