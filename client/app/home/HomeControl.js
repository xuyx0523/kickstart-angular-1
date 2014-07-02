/*
    HomeControl.js - Home Controller
 */

angular.module('app').controller('HomeControl', function (Esp, $location, $scope) {
	$scope.showNav = true;
	$scope.showDemos = true;
    //  Used by esp-menu to highlight the current menu selection
    $scope.path = function() {
     	return $location.path();
    };
});
