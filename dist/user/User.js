/*
    user.js - User model
 */

/*
    Setup User routes to login/logout and ask for a password reminder
 */
angular.module('app').factory('User', ["EspResource", function (EspResource) {
    return EspResource.group("user", {}, {
        'check':  { 'method': 'POST', url: '/:controller/check' },
        'forgot': { 'method': 'POST', url: '/:controller/forgot' },
        'login':  { 'method': 'POST', url: '/:controller/login' },
        'logout': { 'method': 'POST', url: '/:controller/logout' },
    });
}]);
