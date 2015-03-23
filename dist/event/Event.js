/*
    Event.js - Event model
 */

angular.module('app').factory('Event', ["EspResource", function (EspResource) {
    return EspResource.group("event");
}]);
