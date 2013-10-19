/*
    Table.js - Database table browser
 */
'use strict';

angular.module('app').factory('Table', function (EspResource) {
    return EspResource.group("table", 
    { 
        name: '@name' 
    }, {
        list: { 'method': 'GET', url: '/service/table/list' },
    });
});
