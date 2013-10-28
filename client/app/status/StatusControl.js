/*
    StatusControl.js - Status Controller
 */

'use strict';

angular.module('app').controller('StatusControl', function (Esp, Status, $filter, $scope) {
    Status.get({id: 1}, $scope, {events: "data"}, function(response) {
        angular.forEach($scope.events, function(value, key) {
            value.title = value.title.substring(0, 30);
            value.date = $filter('format')(value.date, response.schema, 'date');
        });
    });
});
