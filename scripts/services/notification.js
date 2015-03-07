"use strict";

/**
* angular notification 
**/


angular.module("webrtcApp")
.service("notification",function($rootScope){
   
   this.pub = function(eventName,message){
      $rootScope.$broadcast(eventName,message);
   }


   this.sub = function(eventName,callBack){
       $rootScope.$on(eventName,callBack);
   }
   
});


