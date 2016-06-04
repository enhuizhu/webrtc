<?php
 /**
 * include all the necessary php files
 **/
 include("config.php");
 include("helper.php");
?>
<!doctype html>
<html>
   <head>
      <title>webRTC experiment</title>
   <link rel="stylesheet" href="styles/style.css" type="text/css"/>
   <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">   
   </head>
   <body ng-app="webrtcApp" ng-controller="mainCtrl">
    <div class="container">
      
      <div class="row" ng-show="isLoggedIn">
          <div class="col-xs-9">
               
               <div class="video-container">
                    <video id="localVideo" controls autoplay></video>
                    <!-- <div class="remote-video-container">
                        <video id="remoteVideo" controls autoplay></video>      
                    </div>    -->
               </div>
               <p>&nbsp;</p>
               <div class="video-container">
               	    <video id="remoteVideo" controls autoplay></video>
               </div>
          </div>
          <div class="col-xs-3">
               

               <div class="user-list box">		   
				   <ul>
				      <li ng-repeat="user in userList">
                      
                       <chat-user user="user" is-current-user="user==userMail" current-user="userMail"></chat-user>

                        <!--  <div class="user-pannel">
                              <div class="user-profile pull-left"> 
                                  <img src="images/userProfile/user1.jpg" class="img-circle"/>
                                  <label ng-class="{red:user==userMail}"> {{user}}  </label>
                               </div>
                               <div class="tool pull-left">
                                   <span class="glyphicon glyphicon-facetime-video"></span>
                                   <span class="glyphicon glyphicon-off"></span>
                               </div>
                               <div class="clearfix"></div>
                         </div> -->
				      </li>
				   </ul>
			   </div>
			   
			   <div class="message-board box">
					<ul>
					   <li ng-repeat="msg in msgs track by $index">
					   {{msg}}
					   </li>
					</ul>
			   </div>		  
		  </div>
      </div>

      <div class="row" ng-show="!isLoggedIn">
        <form class="form-signin" ng-submit="login()">
        <h2 class="form-signin-heading">Please sign in</h2>
        <p>&nbsp;</p>
        <label class="sr-only">Email address:</label>
        <input class="form-control" ng-pattern="/^.+@.+\..+$/" ng-model="userMail" id="userMail">
        <p>{{userMail}}</p>
		<p>&nbsp;</p>
        
        <!-- <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button> -->
        <input type="submit" value="Sign in" class="btn btn-lg btn-primary btn-block" type="submit"/>
        </form>
      </div>
    

    
   </div>

     
     <!-- include all the vendors' libraries -->
     <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
     <script type="text/javascript" src="bower_components/angular-classy/angular-classy.min.js"></script>
     <script type="text/javascript" src="bower_components/angular-bootstrap/ui-bootstrap.min.js"></script>
     <script type="text/javascript" src="bower_components/socket.io-client/socket.io.js"></script>
	   <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>	 
     <script type="text/javascript">
      var socket_url = "<?php echo baseUrl("",SOCKET_PORT)?>";
     </script> 
     <!-- include socket io library -->
     <script language="JavaScript" src="scripts/webrtc.js"></script>
   
     <!-- include angular module file -->
     <script type="text/javascript" src="scripts/app.js"></script>
     <!-- include all the controllers -->
     <script type="text/javascript" src="scripts/controllers/main.js"></script>
     <!-- include all the services -->
	 <script type="text/javascript" src="scripts/services/socket.js"></script>
	 <script type="text/javascript" src="scripts/services/notification.js"></script>
	 <script type="text/javascript" src="scripts/services/webrtc.js"></script>
     <!-- include all the diretives -->
     <script type="text/javascript" src="scripts/directives/chatUser.js"></script>
   </body>
</html>