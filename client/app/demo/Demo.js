/*
    Demo.js - Demo model
 */
'use strict';

/*
    Just a few demo pages
 */
angular.module('app').factory('Demo', function (EspResource) {
    return EspResource.group("demo", {}, {
        'demo1':  { 'method': 'GET',   url: '/:prefix/demo/demo1' },
        'demo2':  { 'method': 'GET',   url: '/:prefix/demo/demo2' },
        'demo3':  { 'method': 'GET',   url: '/:prefix/demo/demo3' },
        'demo4':  { 'method': 'GET',   url: '/:prefix/demo/demo4' },
    });
});
