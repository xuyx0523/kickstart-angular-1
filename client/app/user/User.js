/*
    user.js - User model
 */
'use strict';

angular.module('app').factory('User', function (EspResource) {
    return EspResource.group("user", {}, {
        'forgot': { 'method': 'POST', url: '/:prefix/:controller/forgot' },
        'login':  { 'method': 'POST', url: '/:prefix/:controller/login' },
        'logout': { 'method': 'POST', url: '/:prefix/:controller/logout' },
    });
});
