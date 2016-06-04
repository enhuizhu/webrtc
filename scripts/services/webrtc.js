"use strict";

/**
* all the functions related webRtc will come here
**/

angular.module("webrtcApp").service("webrtc",function(notification,$timeout){
   
    var that = this;
    var localVideo = document.getElementById("localVideo");
    var remoteVideo = document.getElementById("remoteVideo");
    var pcConfig = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
    var peerConnection = webkitRTCPeerConnection || mozRTCPeerConnection;
    var localPeer,remotePeer;
         
    /**
    * subscribe call event
    **/
    notification.sub("call",function(event,data){
         console.log("call events, user data is:",data);
         that.usersData = data;
         that.startLocalCamera();  
    });

    notification.sub("get.call.candidate",function(event,data){
    	console.log("in webrtc service, get.call.candidate",data);
    	remotePeer.addIceCandidate(new RTCIceCandidate(data.candidate));
    });
    
    notification.sub("get.call.description",function(event,data){
    	console.log("in webrtc service, get.call.description",data);
    	if(!remotePeer){

    		if(!data.usersData.answer){
                that.usersData = data.usersData; 
                var type = "answer";   
            }else{
                that.setupResponseUserData("call");
                var type = "call";
            }
            
    		that.setUpRemotePeer(type);
    	}
    	remotePeer.setRemoteDescription(new RTCSessionDescription(data.description));
        console.log("remotePeer set up!");
    });

   notification.sub("get.answer.candidate",function(event,data){
    	 console.log("in webrtc service, get.answer.candidate");
    	 localPeer.addIceCandidate(new RTCIceCandidate(data.candidate));

    });
    
    notification.sub("get.answer.description",function(event,data){
    	 console.log("in webrtc service get.answer.description");
    	 localPeer.setRemoteDescription(new RTCSessionDescription(data.description));
    });


    navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    function getLocalIceCandidate(e){
    	if(e.candidate){
    	/**
    	* should send local candidate to remote
    	**/
        notification.pub("send.call.candidate",{
            "candidate":e.candidate,
            "usersData":localPeer.type=="answer"?that.answerUserData:that.usersData
        });
    	//pc2.addIceCandidate(new RTCIceCandidate(e.candidate));
        console.log("call ice candidate", e.candidate.candidate);
       }
    }
    
    function getRemoteIceCandidate(e){
    	console.log("--remote candidate ---");
    	if(e.candidate){
    	/**
    	* should send local candidate to remote
    	**/
        notification.pub("send.answer.candidate",{
            "candidate":e.candidate,
            "usersData":remotePeer.type=="call"? that.answerUserData:that.usersData
        });
    	//pc2.addIceCandidate(new RTCIceCandidate(e.candidate));
        console.log("answer candidate", e.candidate.candidate);
       }
    }

    function getLocalDescription(dec){
        console.log("--- call local description ---");
        console.log("call description",dec);
        localPeer.setLocalDescription(dec);
        notification.pub("send.call.description",{
            "description":dec,
            "usersData":localPeer.type=="answer"?that.answerUserData:that.usersData
          });
    }
    
    function getRemoteDescription(dec){
        console.log("--- answer description ---");
        console.log("answer description",dec);
        remotePeer.setLocalDescription(dec);
        notification.pub("send.answer.description",{
            "description":dec,
            "usersData":remotePeer.type=="call"? that.answerUserData:that.usersData
        });
    }

    
    this.usersData = null;
    
    this.answerUserData = null;
    
    this.startLocalCamera = function(type){
        navigator.getUserMedia({audio:true,video:true},
        	function(mediaStream){
            that.setUpLocalPeer(mediaStream,type);
            localVideo.src = URL.createObjectURL(mediaStream);
        },function(error){
		    console.log("there is error happen when connecting to media stream!",error);
		  });
    };
 
    this.setUpLocalPeer = function(mediaStream,type){
   	   localPeer = new peerConnection(pcConfig);             
   	   localPeer.onicecandidate = getLocalIceCandidate;
   	   localPeer.addStream(mediaStream);
   	   localPeer.createOffer(getLocalDescription, function(){console.error("createOffer fail", arguments)});
       localPeer.type=type=="answer"?"answer":"call";
   };

   this.setupResponseUserData = function(type){
        this.answerUserData = {
            user:this.usersData.from,
            from:this.usersData.user,
        }

        if (type=="call") {
            this.answerUserData.call = true;
        }else{
            this.answerUserData.answer = true;
        }
   }
   
   this.setUpRemotePeer = function(type){
   	   remotePeer = new peerConnection(pcConfig);             
   	   remotePeer.onicecandidate = getRemoteIceCandidate;
   	   remotePeer.type = type;
       remotePeer.onaddstream = function(e){
   	   	  console.log(" ---- remote video get stream!  ----");
   	   	  remoteVideo.src = URL.createObjectURL(e.stream);
   	   }

       this.startLocalCamera("answer");
       this.setupResponseUserData();

       $timeout(function(){
        remotePeer.createAnswer(getRemoteDescription,function(e){
            console.error("crate answer fail",e);
        });
       },500);
   };

});
