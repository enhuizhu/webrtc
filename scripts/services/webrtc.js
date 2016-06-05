"use strict";

/**
* all the functions related webRtc will come here
**/

angular.module("webrtcApp").service("webrtc",function(notification,$timeout){
    var pcConfig = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
    var that = this;
    var peerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    
    navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    this.localPeer = null;
    this.remotePeer = null;
    this.usersData = null;
    this.answerUserData = null;
    
    this.localVideo = document.getElementById("localVideo");
    this.remoteVideo = document.getElementById("remoteVideo");
         
    this.bootstrapEvents = function() {
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
            that.remotePeer.addIceCandidate(new RTCIceCandidate(data.candidate));
        });
        
        notification.sub("get.call.description",function(event,data){
            console.log("in webrtc service, get.call.description",data);
            if(!that.remotePeer){

                if(!data.usersData.answer){
                    that.usersData = data.usersData; 
                    var type = "answer";   
                }else{
                    that.setupResponseUserData("call");
                    var type = "call";
                }
                
                that.setUpRemotePeer(type);
            }
            
            that.remotePeer.setRemoteDescription(new RTCSessionDescription(data.description));
            console.log("remotePeer set up!");
        });

       notification.sub("get.answer.candidate",function(event,data){
             console.log("in webrtc service, get.answer.candidate");
             that.localPeer.addIceCandidate(new RTCIceCandidate(data.candidate));
        });
        
        notification.sub("get.answer.description",function(event,data){
             console.log("in webrtc service get.answer.description");
             that.localPeer.setRemoteDescription(new RTCSessionDescription(data.description));
        });
    }
    
    this.getLocalIceCandidate = function(e){
    	if(e.candidate){
    	/**
    	* should send local candidate to remote
    	**/
        notification.pub("send.call.candidate",{
            "candidate":e.candidate,
            "usersData":that.localPeer.type=="answer"?that.answerUserData:that.usersData
        });
    	//pc2.addIceCandidate(new RTCIceCandidate(e.candidate));
        console.log("call ice candidate", e.candidate.candidate);
       }
    }
    
    this.getRemoteIceCandidate = function(e){
    	console.log("--remote candidate ---");
    	if(e.candidate){
    	/**
    	* should send local candidate to remote
    	**/
        notification.pub("send.answer.candidate",{
            "candidate":e.candidate,
            "usersData":that.remotePeer.type=="call"? that.answerUserData:that.usersData
        });
    	//pc2.addIceCandidate(new RTCIceCandidate(e.candidate));
        console.log("answer candidate", e.candidate.candidate);
       }
    }

    this.getLocalDescription = function(dec){
        console.log("--- call local description ---");
        console.log("call description",dec);
        that.localPeer.setLocalDescription(dec);
        notification.pub("send.call.description",{
            "description":dec,
            "usersData":that.localPeer.type=="answer"?that.answerUserData:that.usersData
          });
    }
    
    this.getRemoteDescription = function(dec){
        console.log("--- answer description ---");
        console.log("answer description",dec);
        that.remotePeer.setLocalDescription(dec);
        notification.pub("send.answer.description",{
            "description":dec,
            "usersData":that.remotePeer.type=="call"? that.answerUserData:that.usersData
        });
    }
    
    this.startLocalCamera = function(type){
        navigator.getUserMedia({audio:true,video:true},
        	function(mediaStream){
            that.setUpLocalPeer(mediaStream,type);
            that.localVideo.src = URL.createObjectURL(mediaStream);
        },function(error){
            alert("error:" + error);
	    });
    };
 
    this.setUpLocalPeer = function(mediaStream,type){
   	   this.localPeer = new peerConnection(pcConfig);             
   	   this.localPeer.onicecandidate = this.getLocalIceCandidate;
   	   this.localPeer.addStream(mediaStream);
   	   this.localPeer.createOffer(this.getLocalDescription, function(){console.error("createOffer fail", arguments)});
       this.localPeer.type=type=="answer"?"answer":"call";
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
   	   if (this.remotePeer) {
           return false;
       };
       
       this.remotePeer = new peerConnection(pcConfig);             
   	   this.remotePeer.onicecandidate = this.getRemoteIceCandidate;
   	   this.remotePeer.type = type;
       
       that.remotePeer.onaddstream = function(e){
   	   	  console.log(" ---- remote video get stream!  ----");
          that.remoteVideo.src = URL.createObjectURL(e.stream);
   	   }
       
       if (!this.localPeer) {
           that.startLocalCamera("answer");
       }
       
       this.setupResponseUserData();

       $timeout(function(){
            that.remotePeer.createAnswer(that.getRemoteDescription,function(e){
                console.error("crate answer fail",e);
            });
       },500);
   };

   this.bootstrapEvents();
});
