angular.module("core.service", [])
.service("util", ["localStorageService", function(localStorageService){

	this.set = function(key, value){
		localStorageService.set(key, value);
	};

	this.get = function(key){
		return localStorageService.get(key);
	};
}]);