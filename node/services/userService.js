  module.exports = {
    list : [],
    sockets :[],
    addUser:function(userName,socket){
	   if(this.list.indexOf(userName)!=-1){
	      return false;
	   }
	   this.list.push(userName);
	   this.sockets.push(socket);
	   return true;
	},
    deleteUser:function(userName){
	   var index = this.list.indexOf(userName);
	   if(index==-1) return false;
	   this.list.splice(index,1);
	   this.sockets.splice(index,1);
	   return true;
	},

    /**
    * get socket by user's name
    **/
    getSocketBaseOnUser:function(user){
        var index = this.list.indexOf(user);
        return this.sockets[index];
    },
	
	emptyUserList:function(){
	  this.list =[];
	  this.sockets=[];
	}
	
};