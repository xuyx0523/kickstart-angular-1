/*
    main.js - Application main script.
 */

'use strict';

/*
    Create the application module
 */
var app = angular.module('Layer2', ['ngResource', 'ui.bootstrap']);

/*
    Configure the default route. Other routes may be defined in controllers.
 */
app.config(function($routeProvider, $locationProvider) {
    /*
        Define URL to redirect toward when access is denied by server
     */
    $routeProvider.login = "/service/user/login";
    $routeProvider.otherwise({ redirectTo: '/' });
    //  $locationProvider.html5Mode(true);
});


//  MOB - move to filters. Possibly esp/proto
app.filter('titlecase', function() {
    var titlecaseFilter = function(str) {
        var words = str.split(/[ \.]/g);
        for (var i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join(' ');
    };
    return titlecaseFilter;
});
