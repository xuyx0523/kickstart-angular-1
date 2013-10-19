/*
    Port.js - Port model
 */
'use strict';

angular.module('app').factory('Port', function (EspResource) {
    return EspResource.group("port", {}, {
        'vlans':  { 'method': 'POST',   url: '/service/port/:id/vlans' },
    });
});
