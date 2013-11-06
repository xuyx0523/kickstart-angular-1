/*
    Setting.js - Setting model
 */
'use strict';

angular.module('app').factory('Setting', function (EspResource) {
    /* Use group() to save routes on the server */
    return EspResource.group("setting");
});
