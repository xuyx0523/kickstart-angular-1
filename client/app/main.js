/*
    main.js - Application main script.
 */

'use strict';

/*
    Create the application module
 */
var app = angular.module('Layer2', ['ngResource', 'ngRoute', 'ngAnimate', 'ui.bootstrap']);

/*
    Configure the default route. Other routes may be defined in controllers.
 */
app.config(function($routeProvider, $locationProvider) {
    /*
        Define URL to redirect toward when access is denied by server
     */
    $routeProvider.login = "/service/user/login";
    $routeProvider.otherwise({ redirectTo: '/' });
});
