angular.module("core.service", [])
.service("util", function(){
	var authToken = undefined;

	this.setToken = function(token){
		authToken = token;
	};

	this.getToken = function(){
		return authToken;
	};
});