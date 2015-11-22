var app = angular.module("createpage.core.module", ["ui.router", "common.login.module", "common.register.module"]);

app.config(['$urlRouterProvider', '$stateProvider',
function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise("/home");

	$stateProvider
		.state("home",{
			url: "/home",
			templateUrl: "core/templates/content.html",
			controller: function($rootScope, $state){
				if(!$rootScope.user){
					$state.go("home.login");
				}
			}
		})
		.state("home.login",{
			url: "/login",
			templateUrl: "common/login/login.html"
		})
		.state("home.register",{
			url: "/register",
			templateUrl: "common/register/register.html"
		})
		.state("about",{
			url: "/about",
			template: "<h2> About Page </h2>"
		})
		.state("contact",{
			url: "/contact",
			template: "<h2> Contact Page </h2>"
		})
}]);

app.controller("header.ctrl", [function(){
	this.displayname = "Santhosh P";
}]);
