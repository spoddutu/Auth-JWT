angular.module("core.profile.forms", [])
.controller("profileCtrl", ["$scope", function($scope){
	$scope.formData = {};
	$scope.gPlace = undefined;

	$scope.processForm = function(){
		console.error("Form processing...");
	};
}]);