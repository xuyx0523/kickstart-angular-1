/*
    Port.js - Port model
 */
'use strict';

app.factory('Port', function ($resource) {
    return $resource('/service/port/:id', { 
    	id: '@id' 
    }, {
        'create': { 'method': 'POST',   url: '/service/port' },
        'edit':   { 'method': 'GET',    url: '/service/port/:id/edit' },
        'get':    { 'method': 'GET',    url: '/service/port/:id' },
        'init':   { 'method': 'GET',    url: '/service/port/init' },
        'list':   { 'method': 'GET',    url: '/service/port/list' },
        'remove': { 'method': 'DELETE', url: '/service/port/:id' },
        'update': { 'method': 'POST',   url: '/service/port/:id' },
        'vlans':  { 'method': 'POST',   url: '/service/port/:id/vlans', params: { 'id' : '@id' } },
    });
});
