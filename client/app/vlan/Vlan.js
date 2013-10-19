/*
    Vlan.js - Vlan model
 */
'use strict';

angular.module('app').factory('Vlan', function (EspResource) {
    return EspResource.group("vlan", {}, {
        addPort: 	{ 'method': 'POST', url: '/service/vlan/:id/addPort',     params: { port : '@port'} },
        removePort: { 'method': 'POST', url: '/service/vlan/:id/removePort',  params: { port : '@port'} },
    	mappings:   { 'method': 'POST', url: '/service/vlan/:id/mappings',    params: { } },
    });
})
