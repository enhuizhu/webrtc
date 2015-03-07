"use strict";
/**
* test angular notification
**/

describe("notification service",function(){
     var notification,rootScope;
     beforeEach(module("webrtcApp"));

     beforeEach(inject(function (_notification_,$rootScope) {
        notification = _notification_;
        rootScope = $rootScope;
     }));


     it("should get some events",function(){
     	console.log("test events")
     	notification.pub("test","test");
     	 
        console.log("rootScope is:",rootScope); 

     	rootScope.$on("test",function(event,data){
            console.log("event is:",event);
            console.log("data is:",data);
     	})



     	notification.sub("test",function(os,data){
           console.log("os is:",os);
           console.log("data is:",data);
     	})
     })


})
