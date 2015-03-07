"use strict";

/**
* angular service for socket
**/

angular.module("webrtcApp").service("socket",function(notification){
	
	this.socket = null;
    
    this.bootStrap = function(){
       this.socket = io.connect(socket_url);
       this.bindEvents();
    };

	this.bindEvents = function(){
	  this.socket.on("connect",function(data){
          console.log("connect to server successfully!");
      });
	  
	  this.socket.on("new user join",function(data){
	     notification.pub("user.join",data);
	  });
	  
	  this.socket.on("user already join",function(data){
	     notification.pub("user.alreadyJoin",data);
	  });
	  
	  this.socket.on("user leave",function(data){
	     notification.pub("user.leave",data);
	  });
	  
	
	}

  



});