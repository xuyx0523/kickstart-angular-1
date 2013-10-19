/*
    Event.js - Event model
 */
'use strict';

angular.module('app').factory('Event', function (EspResource) {
    return EspResource.group("event");
});
