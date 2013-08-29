/*
    TableControl.js - Database table table Controller
 */

'use strict';

app.controller('TableControl', function ($rootScope, $scope, $location, $routeParams, Table, Esp) {
    if ($routeParams.table) {
        Table.get({table: $routeParams.table}, function(response) {
            $scope.table = response.data;
        });
    } else {
        $scope.list = Table.list({}, function(response) {
            $scope.tables = response;
        });
    }
    //  MOB - what is this for?
    $scope.routeParams = $routeParams;

    $scope.click = function(index) {
        if (Esp.can('edit')) {
            $location.path('/service/table/' + $scope.tables.data[index].name);
        } else {
            $rootScope.feedback = { warning: "Insufficient Privilege to Use Table" };
        }
    };
});

app.config(function($routeProvider) {
    $routeProvider.when('/service/table/list', {
        templateUrl: '/app/table/table-list.html',
        controller: 'TableControl',
        abilities: { 'view': true },
        resolve: { action: checkAuth },
    });
    $routeProvider.when('/service/table/:id', {
        templateUrl: '/app/table/table-edit.html',
        controller: 'TableControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: checkAuth },
    });
});
