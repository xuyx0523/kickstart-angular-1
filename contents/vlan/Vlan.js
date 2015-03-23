/*
    Vlan.js - Vlan model
 */

angular.module('app').factory('Vlan', function (EspResource) {
    return EspResource.group("vlan", {}, {
        addPort: 	{ 'method': 'POST', url: '/vlan/:id/addPort',     params: { port: '@port'} },
        removePort: { 'method': 'POST', url: '/vlan/:id/removePort',  params: { port: '@port'} },
    	mappings:   { 'method': 'POST', url: '/vlan/:id/mappings',    params: { } },
    });
})
