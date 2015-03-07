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
    <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="styles/style.css" type="text/css"/>
   </head>
   <body ng-app="webrtcApp">
    
    <div class="container" ng-controller="mainCtrl">
      
      <div class="row" ng-if="isLoggedIn">
          <div class="col-xs-9">
               
               <div class="video-container">
                    <video id="localVideo" controls autoplay></video>
                    <div class="remote-video-container">
                        <video id="remoteVideo" controls autoplay></video>      
                    </div>   
               </div>
          </div>
          <div class="col-xs-3">
               the list of the users
          </div>
      </div>

      <div class="row" ng-if="!isLoggedIn">
        <form class="form-signin" ng-submit="login()">
        <h2 class="form-signin-heading">Please sign in</h2>
        <p>&nbsp;</p>
        <label class="sr-only">Email address:</label>
        <input class="form-control" ng-pattern="/^.+@.+\..+$/" ng-model="$parent.userMail" id="userMail">
        <p>&nbsp;</p>
        
        <!-- <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button> -->
        <input type="submit" value="Sign in" class="btn btn-lg btn-primary btn-block" type="submit"/>
        </form>
      </div>
    

    </div>


     
     <!-- include all the vendors' libraries -->
     <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
     <script type="text/javascript" src="bower_components/angular-classy/angular-classy.min.js"></script>
	 <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	 <!-- Latest compiled and minified JavaScript -->
	 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
     <script type="text/javascript">
      var socket_url = "<?php echo baseUrl("",SOCKET_PORT)?>";
     </script> 
     <!-- include socket io library -->
     <script type="text/javascript" src="<?php echo baseUrl("socket.io/socket.io.js",SOCKET_PORT)?>"></script>
     <script type="text/javascript" src="scripts/socket.js"></script>
     <script language="JavaScript" src="scripts/webrtc.js"></script>
   
     <!-- include angular module file -->
     <script type="text/javascript" src="scripts/app.js"></script>
     <!-- include all the controllers -->
     <script type="text/javascript" src="scripts/controllers/main.js"></script>


   </body>
</html>