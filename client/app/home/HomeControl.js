/*
    HomeControl.js - Home Controller
 */

'use strict';

angular.module('app').controller('HomeControl', function (Esp, $location, $scope) {
	$scope.showNav = true;
	$scope.showDemos = true;
    //  MOB - is this used
    $scope.path = function() {
     	return $location.path();
    };
});
