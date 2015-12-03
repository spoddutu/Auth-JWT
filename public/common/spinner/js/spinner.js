angular.module("common.spinner", [])

.directive('spinner', function(){
    return{
        restrict: 'E',
        scope:{
            value: '='
        },
        templateUrl:'common/spinner/view/spinner.html',
        controller:function($scope){
            $scope.increment = function(){
                if($scope.value < $scope.max){
                    $scope.value += $scope.interval;
                }
            };

            $scope.decrement = function(){
                if(($scope.value - $scope.interval) >= $scope.min){
                    $scope.value -= $scope.interval;
                }
            };
        },
        link:function(scope, element, attrs){
            scope.value = (!scope.value || scope.value == 0)? parseInt(attrs.default) : scope.value;
            scope.min = parseInt(attrs.min);
            scope.max = parseInt(attrs.max);
            scope.interval = parseInt(attrs.interval);
        }
    }
});
