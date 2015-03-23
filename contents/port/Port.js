/*
    Port.js - Port model
 */

angular.module('app').factory('Port', function (EspResource) {
    return EspResource.group("port", {}, {
        'vlans':  { 'method': 'POST',   url: '/port/:id/vlans' },
    });
});
