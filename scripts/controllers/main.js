"use strict";

angular.module("webrtcApp").classy.controller({
 
 name:"mainCtrl",
 
 inject:["$scope","socket","notification","$rootScope","$timeout","webrtc"],
 
 init:function(){
    var that = this;
	/**
	* init the socket
	**/
    this.socket.bootStrap();	
	
	/**
    * variable to track if user already logged in
    **/

    this.$.isLoggedIn = false;

    /**
    * variable to track user's name
    **/ 
    this.$.userMail = null;
    this.$.userList = [];
	this.$.msgs = [];
	this._bindSocketEvents();
 },

 watch:{
   
 },

 /**
 * function to login to the system
 **/
 login:function(){
     if(!this._isUserNameExist()){
     	console.log("the value of user mail is:",this.$.userMail);
     	//alert("try to connect to node server!"+this.$.userMail);
        this.socket.socket.emit("join",{"user":this.$.userMail})
	    this.$.isLoggedIn = true;
	 }else{
     	alert(this.$.userMail+" already logged in!");
     }
 },
 /**
 * function to bind all the socket events
 **/
 _bindSocketEvents:function(){
   this.notification.sub("user.join",this._userJoin.bind(this));
   this.notification.sub("user.alreadyJoin",this._userAlreadyJoin.bind(this));   
   this.notification.sub("user.leave",this._userLeave.bind(this));
 },
 
 _userJoin:function(event,data){
   console.log("user join",data);
   var that = this;
   this.$.$apply(function(){
         that.$.userList = data.userList;
         that.$.msgs.unshift(data.newUser+" join");
   });
 },
 
 _userAlreadyJoin:function(event,data){
    var that = this;
	alert(data.msg);
	this.$.$apply(function(){
	    that.$.isLoggedIn = false;
	});
 },
 
 _userLeave:function(event,data){
     var that = this;
	 this.$.$apply(function(){
	    that.$.userList = data.userList;
		that.$.msgs.unshift(data.leaveUser+ " 	leave");
	 });
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