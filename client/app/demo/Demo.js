/*
    Demo.js - Demo model
 */
'use strict';

angular.module('app').factory('Demo', function (EspResource) {
    return EspResource.group("demo", {}, {
        'demo1':  { 'method': 'GET',   url: '/service/demo/demo1' },
        'demo2':  { 'method': 'GET',   url: '/service/demo/demo2' },
        'demo3':  { 'method': 'GET',   url: '/service/demo/demo3' },
    });
});
