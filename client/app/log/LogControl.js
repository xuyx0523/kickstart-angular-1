/*
    LogControl.js - Log Controller
 */

'use strict';

app.controller('LogControl', function ($filter, $rootScope, $scope, $location, $routeParams, Log, Esp, Vlan) {
    if ($routeParams.id) {
        Log.get({id: $routeParams.id}, function(response) {
            $scope.log = response.data;
        });
    } else {
        //  MOB - only want to do this if URI is list. Same for PORT and VLAN
        $scope.list = Log.list({}, function(response) {
            $scope.logs = response;
            angular.forEach($scope.logs.data, function(value, key) {
                value.title = value.title.substring(0, 30);
                value.date = $filter('date')(value.date, 'medium');
                // value.since = (Date.now() - value.date) / (60 * 1000);
            }); 
        });
    }

    $scope.routeParams = $routeParams;

    $scope.remove = function() {
        Log.remove({id: $scope.log.id}, function(response) {
            $location.path("/service/log/list");
            $rootScope.feedback = response.feedback;
        });
    };

    $scope.click = function(index) {
        if (Esp.can('edit')) {
            $location.path('/service/log/' + $scope.logs.data[index].id);
        } else {
            $rootScope.feedback = { warning: "Insufficient Privilege to Edit Logs" };
        }
    };
});

app.config(function($routeProvider) {
    $routeProvider.when('/service/log/list', {
        templateUrl: '/app/log/log-list.html',
        controller: 'LogControl',
        abilities: { 'view': true },
        resolve: { action: checkAuth },
    });
    $routeProvider.when('/service/log/:id', {
        templateUrl: '/app/log/log-view.html',
        controller: 'LogControl',
        abilities: { },
        resolve: { action: checkAuth },
    });
});
