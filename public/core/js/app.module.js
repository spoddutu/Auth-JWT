var app = angular.module("pilgrims.core.module", ["pilgrims.core.directive.module"]);

app.controller("header.ctrl", [function(){
	this.displayname = "Santhosh P";
}]);
