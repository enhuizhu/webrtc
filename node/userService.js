/* var answer = 43;


var userService = {
	list : [],
    addUser:function(userName){
	   if(this.list.indexOf(userName!=-1)){
	      return false;
	   }
	   this.list.push(userName);
	   return true;
	},
    deleteUser:function(userName){
	   var index = this.list.indexOf(userName);
	   if(index==-1) return false;
	   this.list.splice(index,1);
	   return true;
	}
};
 */
 
 module.exports = {
    list : [],
    addUser:function(userName){
	   if(this.list.indexOf(userName)!=-1){
	      return false;
	   }
	   this.list.push(userName);
	   return true;
	},
    deleteUser:function(userName){
	   var index = this.list.indexOf(userName);
	   if(index==-1) return false;
	   this.list.splice(index,1);
	   return true;
	},
	
	emptyUserList:function(){
	  this.list =[];
	}
	
};