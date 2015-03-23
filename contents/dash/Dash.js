/*
    Dash.js - Dash model
 */

angular.module('app').factory('Dash', function (EspResource) {
    return EspResource.group("dash", {}, {
        'reset':  { 'method': 'POST',   url: '/dash/:id/reset' },
    });
});
