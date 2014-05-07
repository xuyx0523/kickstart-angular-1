/*
    Table.js - Database table browser
 */
'use strict';

/*
    Prototype - not used yet
    MOB
 */
angular.module('app').factory('Table', function (EspResource) {
    return EspResource.group("table", 
    { 
        name: '@name' 
    }, {
        list: { 'method': 'GET', url: '/:server/table/list' },
    });
});
