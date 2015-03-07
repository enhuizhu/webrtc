/**
* all the webrtc code will be here
**/

var startBtn = document.getElementById("startBtn");
var localVideo = document.getElementById("localVideo");
var remoteVideo = document.getElementById("remoteVideo");
var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
navigator.getUserMedia = getUserMedia;
var pcConfig = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
var pc1,pc2;


var start = function(){
  navigator.getUserMedia({audio:true,video:true},function(mediaStream){
	pc1 = new webkitRTCPeerConnection(pcConfig);
	pc2 = new webkitRTCPeerConnection(pcConfig);
	pc2.onaddstream = getRemoteStream;

	pc1.onicecandidate = getLocalIceCandidate; 
	pc2.onicecandidate = getRemoteIceCandidate;

	console.log("connect to the media successfully!");
	localVideo.src  = URL.createObjectURL(mediaStream);
    pc1.addStream(mediaStream);
    pc1.createOffer(getDescription1);
  },function(error){
    console.log("there is error happen when connecting to media stream!",error);
  });
}

/**
* function add remote stream to the dom 
**/

var getRemoteStream = function(e){
    console.log("add remote video to the dom");
    remoteVideo.src = URL.createObjectURL(e.stream);
};

/**
* function fired when ice candidate is avilabel
**/
var getLocalIceCandidate = function(e){
    if(e.candidate){
    	pc2.addIceCandidate(new RTCIceCandidate(e.candidate));
        console.log("local ice candidate", e.candidate.candidate);
    }
}


var getRemoteIceCandidate = function(e){
	if(e.candidate){
		pc1.addIceCandidate(new RTCIceCandidate(e.candidate));
		console.log("remote ice candidate",e.candidate.candidate);
	}
}


/**
* function to get pc1's description
**/
var getDescription1 = function(dec){
	console.log("get pec1 local description");
	pc1.setLocalDescription(dec);
    pc2.setRemoteDescription(dec);
    pc2.createAnswer(getDescription2);
}

/**
* function to get pc2's description
**/
var getDescription2 = function(dec){
	console.log("get pc2 local description");
    pc2.setLocalDescription(dec);
    pc1.setRemoteDescription(dec);
}





