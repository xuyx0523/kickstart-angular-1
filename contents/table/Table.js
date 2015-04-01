/*
    Table.js - Database table browser
 */
angular.module('app').factory('Table', function (EspResource) {
    return EspResource.group("table", 
    { 
        name: '@name' 
    }, {
        list: { 'method': 'GET', url: ':server/table/list' },
    });
});
