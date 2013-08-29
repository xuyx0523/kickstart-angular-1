/*
    Table.js - Database table browser
 */
'use strict';

app.factory('Table', function ($resource) {
    return $resource('/service/table/:name', { name: '@name' }, {
        'list':     { 'method': 'GET', url: '/service/table/list' },
    });
});
