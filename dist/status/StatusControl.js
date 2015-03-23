/*
    StatusControl.js - Status Controller
 */

angular.module('app').controller('StatusControl', ["Status", "$filter", "$scope", function (Status, $filter, $scope) {
    /*
        Get the status data
     */
    Status.get({id: 1}, $scope, {events: "data"}, function(response) {
        angular.forEach($scope.events, function(value, key) {
            value.title = value.title.substring(0, 30);
            value.date = $filter('format')(value.date, response.schema, 'date');
        });
    });
}]);
