/*
    Vlan.js - Vlan model
 */
'use strict';

app.factory('Vlan', function ($resource) {
    return $resource('/service/vlan/:id', { id: '@id' }, {
    	//	MOB - how to get port into the post body?
        'addPort': 	  { 'method': 'POST', url: '/service/vlan/:id/add',    params: { 'id': '@id', 'port' : '@port'} },
        'list':       { 'method': 'GET',  url: '/service/vlan/list' },
    	'ports':      { 'method': 'POST', url: '/service/vlan/:id/ports',  params: { 'id' : '@id' } },
        'removePort': { 'method': 'POST', url: '/service/vlan/:id/remove', params: { 'id': '@id', 'port' : '@port'} },

    });
});
