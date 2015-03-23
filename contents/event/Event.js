/*
    Event.js - Event model
 */

angular.module('app').factory('Event', function (EspResource) {
    return EspResource.group("event");
});
