"use strict";

/**
* angular service for socket
**/

angular.module("webrtcApp").service("socket",function(notification){
	
	var that = this;
	 
	this.socket = null;
    
    this.bootStrap = function(){
       this.socket = io.connect(socket_url);
       this.bindEvents();
       this.bindEmit();
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

    
      this.socket.on("get.call.candidate",function(data){
          notification.pub("get.call.candidate",data);
      });
      
      this.socket.on("get.call.description",function(data){
          notification.pub("get.call.description",data);
      });

      this.socket.on("get.answer.candidate",function(data){
          notification.pub("get.answer.candidate",data);
      });
      
      this.socket.on("get.answer.description",function(data){
          notification.pub("get.answer.description",data);
      });

	  this.socket.on("remote.calling",function(data){
          console.info("remote calling, from:",data.from);

	  });

	  this.socket.on("remote.handUp",function(data){
          console.info("remote handUp, from:",data.from);
	  });
	  
	};

    this.bindEmit = function(){

       notification.sub("send.call.candidate",function(event,data){
            console.log("--- call candidate --",data);
            that.socket.emit("send.call.candidate",data);
       });

       notification.sub("send.call.description",function(event,data){
       	     console.log("--- call description --",data);
       	     that.socket.emit("send.call.description",data);
       })

       notification.sub("send.answer.candidate",function(event,data){
             console.log("--- answer candidate --",data);
             that.socket.emit("send.answer.candidate",data);
       });
      
       notification.sub("send.answer.description",function(event,data){
             console.log("--- answer description --",data);
             that.socket.emit("send.answer.description",data);
       });


        // notification.sub("call",function(event,data){    
        //       console.log("call event,",data);
        //       console.log("calling ...");
        //       /**
        //       *  send the message to that user
        //       **/
        //       that.socket.emit("call",data);

        // });

        // notification.sub("handUp",function(event,data){
        // 	  console.log("hand up",data);
        // 	  that.socket.emit("handUp",data);
        // })



    };
     


  



});