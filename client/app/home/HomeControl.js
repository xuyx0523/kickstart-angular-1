/*
    HomeControl.js - Home Controller
 */

'use strict';

angular.module('app').controller('HomeControl', function ($location, $scope) {
	$scope.showNav = true;
    $scope.path = function() {
     	return $location.path();
    };
});
