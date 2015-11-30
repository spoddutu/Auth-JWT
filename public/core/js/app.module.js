var app = angular.module("createpage.core.module", 
	["ui.router", 
	"common.login.module", 
	"common.register.module", 
	"core.profile.forms", 
	"core.directive.address", 
	"core.directive.camera",
	"core.service"]);

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
		.state("profile",{
			url: "/profile",
			templateUrl: "core/templates/form-profile.html",
			controller: "profileCtrl",
			resolve: {
				validToken: validateToken
			}
		})
		.state("profile.personnel",{
			url: "/personnel",
			templateUrl: "core/templates/form-personnel.html"
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

this.validateToken = function($q, $rootScope, $state, util){
	var defer = $q.defer();
	var token = util.getToken();
	if(token){
		defer.resolve(token);
	}
	else{
		defer.reject();
		$rootScope.message = "Please login...!"
		$rootScope.errorCode = 105;
		$rootScope.user = undefined;
		$state.go("home");
	}
	return defer.promise;
};

app.controller("header.ctrl", [function(){
	this.displayname = "Santhosh P";
}]);
