/**
* unit test for user service
**/

var userServcie = require("../userService");

describe("test user service",function(){
   it("it should add user to the list",function(){
      expect(userServcie.addUser("test1")).toBe(true);
	  expect(userServcie.list.length).toBe(1);
	  expect(userServcie.addUser("test1")).toBe(false);
	  expect(userServcie.list.length).toBe(1);
	  expect(userServcie.addUser("test2")).toBe(true);
	  expect(userServcie.list.length).toBe(2);
   });
   
   it("it should delete user from the user list",function(){
	  userServcie.emptyUserList();
	  expect(userServcie.list.length).toBe(0);
	  userServcie.list=["test1","test2"];
	  expect(userServcie.deleteUser("test1")).toBe(true);
	  expect(userServcie.list.length).toBe(1);
	  expect(userServcie.deleteUser("fda")).toBe(false);
	  expect(userServcie.list.length).toBe(1);
	  expect(userServcie.deleteUser("test2")).toBe(true);
	  expect(userServcie.list.length).toBe(0);
   });
   
   
})