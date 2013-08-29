/*
    Port.js - Port model
 */
'use strict';

app.factory('Port', function ($resource) {
    return $resource('/service/port/:id', { 
    	id: '@id' 
    }, {
        'list':  { 'method': 'GET',  url: '/service/port/list' },
        'vlans': { 'method': 'POST', url: '/service/port/:id/vlans', params: { 'id' : '@id' } },
    });
});
