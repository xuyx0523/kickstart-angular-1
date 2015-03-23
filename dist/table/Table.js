/*
    Table.js - Database table browser
 */
angular.module('app').factory('Table', ["EspResource", function (EspResource) {
    return EspResource.group("table", 
    { 
        name: '@name' 
    }, {
        list: { 'method': 'GET', url: '/table/list' },
    });
}]);
