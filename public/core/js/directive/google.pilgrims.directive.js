angular.module("pilgrims.core.directive.module", [])
.controller("search.ctrl", ["$scope", function($scope){
	$scope.gPlace = "";
}])
.directive("googlePilgrims", [function(){
	return {
		restrict: 'A',
		require : 'ngModel',
		link: function(scope, element, attrs, model){
			var options = {
				types: ['(regions)']
			};
			
			scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
			
			google.maps.event.addListener(scope.gPlace, 'place_changed', function(){
				scope.$apply(function(){
					model.$setViewValue(element.val());
				});
			});
		}
	};
}]);