/*
    user.js - User model
 */
'use strict';

app.factory('User', function ($resource) {
    return $resource('/service/user/:id', { id: '@id' }, {
        'index':  { 'method': 'GET' },
        'login':  { 'method': 'POST', url: '/service/user/login' },
        'logout': { 'method': 'POST', url: '/service/user/logout' },
    });
});
