/*
    Port.js - Port model
 */

angular.module('app').factory('Port', ["EspResource", function (EspResource) {
    return EspResource.group("port", {}, {
        'vlans':  { 'method': 'POST',   url: '/port/:id/vlans' },
    });
}]);
