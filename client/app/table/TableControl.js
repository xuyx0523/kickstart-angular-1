/*
    TableControl.js - Database table table Controller
 */

'use strict';

/*
    Prototype controller to browse the database
 */
angular.module('app').controller('TableControl', function ($rootScope, $scope, $location, $routeParams, Table, Esp) {
    if ($routeParams.table) {
        Table.get({table: $routeParams.table}, function(response) {
            $scope.table = response.data;
        });
    } else {
        $scope.list = Table.list({}, function(response) {
            $scope.tables = response;
        });
    }
    $scope.click = function(index) {
        if (Esp.can('edit')) {
            $location.path('/table/' + $scope.tables.data[index].name);
        } else {
            $rootScope.feedback = { warning: "Insufficient Privilege to Use Table" };
        }
    };
});

angular.module('app').config(function($routeProvider) {
    var esp = angular.module('esp');
    var Default = {
        controller: 'TableControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: esp.checkAuth },
    };
    $routeProvider.when('/table/list', angular.extend({}, Default, {templateUrl: esp.url('/app/table/table-list.html')}));
    $routeProvider.when('/table/:id',  angular.extend({}, Default, {templateUrl: esp.url('/app/table/table-edit.html')}));
});
