"use strict";

angular.module("webrtcApp").classy.controller({
 
 name:"mainCtrl",
 
 inject:["$scope"],
 
 init:function(){
    /**
    * variable to track if user already logged in
    **/

    this.$.isLoggedIn = false;

    /**
    * variable to track user's name
    **/ 
    this.$.userMail = "klll";
    this.$.userList = [];

 },

 watch:{
   
 },

 /**
 * function to login to the system
 **/
 login:function(){
     if(!this._isUserNameExist()){
     	console.log("the value of user mail is:",this.$.userMail);
     	alert("try to connect to node server!"+this.$.userMail);
     }else{
     	alert(this.$.userMail+" already logged in!");
     }
 },
 
 /**
 * function to check if username already exist
 **/
 _isUserNameExist:function(){
   if(!this.$.userMail){
   	  return true;
   }
   /**
   * already find user in the mail list, should popup error
   **/
   if(this.$.userList.indexOf(this.$.userMail)>=0){
      return true;
   }
   return false;
 }

 
});