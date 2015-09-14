/*
    EventControl.js - Event Controller
 */

angular.module('app').controller('EventControl', function (Esp, Event, $filter, $rootScope, $scope, $location, $routeParams) {
    angular.extend($scope, $routeParams);

    if ($scope.id) {
        /*
            Fetch a single event and apply the data to the scope
         */
        Event.get({id: $scope.id}, $scope);

    } else {
        /*
            Fetch the event list and apply the data to "events" in the scope.
         */
        Event.list(null, $scope, {events: "data"}, function(response) {
            angular.forEach($scope.events, function(value, key) {
                value.date = $filter('format')(value.date, response.schema, 'date');
            });
        });
    }

    $scope.remove = function(id) {
        Event.remove({id: id}, function(response) {
            $location.path("/event/list");
        });
    };
});

/*
    Set the routes for Events
 */
angular.module('app').config(function($routeProvider) {
    var esp = angular.module('esp');
    var Default = {
        controller: 'EventControl',
        abilities: { 'view': true },
        resolve: { action: esp.checkAuth },
    };
    $routeProvider.when('/event/list', angular.extend({}, Default, {templateUrl: esp.url('/event/list.html')}));
    $routeProvider.when('/event/:id',  angular.extend({}, Default, {templateUrl: esp.url('/event/view.html')}));
});
