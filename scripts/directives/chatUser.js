"user strict";

/**
* directive for chat user
**/

angular.module("webrtcApp").directive("chatUser",function(notification){
 
 return {
 	
 	restrict:"AE",
 	
 	replace:true,
 	
 	templateUrl:"./views/chatUser.html",
 	
 	scope:{
 	   "user":"=",
 	   "currentUser":"=",
 	   "isCurrentUser":"="	
 	},
 	
 	controller:function($scope){
          
       /**
       * function to call some body
       **/
       $scope.call= function(){
       	   console.log("--- start call --");
           notification.pub("call",{user:$scope.user,from:$scope.currentUser});
       }


       /**
       * function to handup the call
       **/
       $scope.handUp = function(){
           notification.pub("handUp",{user:$scope.user,from:$scope.currentUser});
       }

 	},
    
    link:function(scope, element, attr){
        
        console.log("the value of scope is:",scope);



    
    }
 }




});

