/*
    DashControl.js - Dash Controller
 */

'use strict';

app.controller('DashControl', function ($rootScope, $scope, $location, $routeParams, Dash, Esp, Vlan) {
});

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/app/dash/dash.html',
        controller: 'DashControl',
        abilities: { },
        resolve: { action: checkAuth },
    });
});
