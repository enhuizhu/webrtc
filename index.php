<!doctype html>
<html>
   <head>
      <title>webRTC experiment</title>
   </head>
   <body>
     <video width="800" height="600" id="rtcVideo" controls autoplay></video>
     <input type="button" value="start camera" id="startBtn"/>
     <script language="JavaScript">
	    var startBtn = document.getElementById("startBtn");
		var video = document.getElementById("rtcVideo");
		var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		getUserMedia = getUserMedia.bind(navigator);
		startBtn.addEventListener("click",function(){
			getUserMedia({audio:true,video:true},function(mediaStream){
				console.log("connect to the media successfully!");
				video.src = URL.createObjectURL(mediaStream);
			},function(error){
			    console.log("there is error happen when connecting to media stream!",error);
			});
			
			
			
			console.log("start button pressed!");
		},false);
	 </script>
   </body>
</html>