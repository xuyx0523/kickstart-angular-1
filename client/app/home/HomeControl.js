/*
    HomeControl.js - Home Controller
 */

'use strict';

angular.module('app').controller('HomeControl', function ($location, $scope, Esp) {
	$scope.showNav = true;
	$scope.showDemos = true;
    $scope.path = function() {
     	return $location.path();
    };
});
