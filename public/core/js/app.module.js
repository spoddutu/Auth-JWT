var app = angular.module("createpage.core.module", 
	["ui.router",
	"LocalStorageModule",
	"common.login.module", 
	"common.register.module",
	"common.spinner", 
	"core.profile.forms", 
	"core.directive.address", 
	"core.directive.camera",
	"core.service"]);

app.config(['$urlRouterProvider', '$stateProvider', 'localStorageServiceProvider',
function($urlRouterProvider, $stateProvider, localStorageServiceProvider){
	localStorageServiceProvider.setPrefix("createpage");
	localStorageServiceProvider.setStorageType("localStorage");

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
			resolve: {
				isValidToken: validateToken
			},
			controller: "profileCtrl"
		})
		.state("profile.personnel",{
			url: "/personnel",
			templateUrl: "core/templates/form-personnel.html"
		})
		.state("profile.profession",{
			url: "/profession",
			templateUrl: "core/templates/form-profession.html"
		})
		.state("profile.education",{
			url: "/education",
			templateUrl: "core/templates/form-education.html"
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

	var promise = function(){
		var defer = $q.defer();
		var token = util.get("token");
		if(token){
			defer.resolve(token);
		}
		else{
			defer.reject();
		}
		return defer.promise;
	};
	promise().then(function(response){
		console.log("success");
	}, function(){
		$rootScope.message = "Invalid token, Please login!"
		$state.go("home");
	});
};

app.controller("header.ctrl", [function(){
	this.displayname = "Santhosh P";
}]);
