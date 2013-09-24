/*
    Log.js - Log model
 */
'use strict';

app.factory('Log', function ($resource) {
    return $resource('/service/log/:id', { 
    	id: '@id' 
    }, {
        'create': { 'method': 'POST',   url: '/service/log' },
        'edit':   { 'method': 'GET',    url: '/service/log/:id/edit' },
        'get':    { 'method': 'GET',    url: '/service/log/:id' },
        'init':   { 'method': 'GET',    url: '/service/log/init' },
        'list':   { 'method': 'GET',    url: '/service/log/list' },
        'remove': { 'method': 'DELETE', url: '/service/log/:id' },
        'update': { 'method': 'POST',   url: '/service/log/:id' },
    });
});
