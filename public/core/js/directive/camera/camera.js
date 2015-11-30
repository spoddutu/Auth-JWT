angular.module("core.directive.camera", [])
.directive("ngCamera", [function(){
	return {
		restrict: "E",
		require: "ngModel",
		templateUrl: "core/js/directive/camera/camera.html",
		replace: true,
		controller: ["$scope", function($scope){
			$scope.isCamLive = true;
			$scope.isPhotoTaken = false;
			$scope.formData.profilePic = undefined;
			$scope.profileUrl = "core/images/icon-user-default.png";
		}],
		link: function(scope, element, attrbs){
			Webcam.set({
		        width: 220,
		        height: 240,
		        dest_width: 220,
		        dest_height: 165,
		        image_format: 'jpeg',
		        jpeg_quality: 90,
		        force_flash: false,
		        flip_horiz: true,
		        fps: 45
		    });

		    scope.setWebcam = function(){
				scope.isCamLive = true;
				scope.isPhotoTaken = false;
		    	Webcam.attach("#live-cam");
		    };

		    scope.saveClick = function(){
				scope.isCamLive = false;
				scope.isPhotoTaken = true;
		    	scope.formData.profilePic = scope.profileUrl;
		    };

			scope.getSnapshot = function(){
				Webcam.snap(function(data_uri){
					scope.isCamLive = false;
					scope.isPhotoTaken = true;
					scope.profileUrl = data_uri;
				});
			};

			scope.setWebcam();

			scope.$on("$destroy", function(){
				Webcam.reset();
			})		
		}
	};
}]);