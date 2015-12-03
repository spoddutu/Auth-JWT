angular.module("core.directive.address", [])
.directive("autocompleteAddress", [function(){
	return {
		restrict : "E",
		templateUrl: "core/js/directive/address/autocomplete-address.html",
		replace: true,
		scope: {
			street_number: "=street",
			route:"=",
			locality:"=",
			administrative_area_level_1:"=state",
			country: "=",
			postal_code: "=postalCode",
		},
		controller: ["$scope", function($scope){
			var componentForm = {
			  street_number: 'short_name',
			  route: 'long_name',
			  locality: 'long_name',
			  administrative_area_level_1: 'short_name',
			  country: 'long_name',
			  postal_code: 'short_name'
			};

			$scope.fillInAddress = function(){
				// Get the place details from the autocomplete object.
				var place = $scope.gPlace.getPlace();
				console.log(place);

				for (var component in componentForm) {
					document.getElementById(component).value = '';
				    document.getElementById(component).disabled = false;
				}

				// Get each component of the address from the place details
				// and fill the corresponding field on the form.
				for (var i = 0; i < place.address_components.length; i++) {
				    var addressType = place.address_components[i].types[0];
				    if (componentForm[addressType]) {
				      var val = place.address_components[i][componentForm[addressType]];
				      $scope[addressType] = val;
				    }
				}
			};

			$scope.geolocate = function() {
			  	if (navigator.geolocation) {
				    navigator.geolocation.getCurrentPosition(function(position) {
				      var geolocation = {
				        lat: position.coords.latitude,
				        lng: position.coords.longitude
				      };
				      var circle = new google.maps.Circle({
				        center: geolocation,
				        radius: position.coords.accuracy
				      });
				      $scope.gPlace.setBounds(circle.getBounds());
				    });
			  	}			
			};
		}],
		link :function(scope, element, attrbs){
			if(scope.gPlace == undefined){
				scope.gPlace = new google.maps.places.Autocomplete(document.getElementById("autocomplete"), {types: ['geocode']});
			}
			google.maps.event.addListener(scope.gPlace, 'place_changed', function(){
				scope.$apply(scope.fillInAddress);
			});
		}
	};
}]);