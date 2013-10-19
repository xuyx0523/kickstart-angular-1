/*
    main.js - Application main script.
 */

'use strict';

var app = angular.module('app', ['ngAnimate', 'ngResource', 'ngRoute', 'ui.bootstrap', 'esp', 'layer2']);

app.config(function($routeProvider) {
	/*
	    Configure the default route. Other routes may be defined in controllers.
 	 */
    $routeProvider.otherwise({ redirectTo: '/' });
});

/*
    Dynamic content resizing
 */
app.run(function($timeout, $window) {
    window.onresize = function() {
        var elt = angular.element(document.getElementById('content'));
        var scope = angular.element(elt).scope();
        if (scope) {
            scope.$apply(function() {
                elt.css('min-height', '' + ($window.innerHeight - 110) + 'px');
                /*
                    if (showNav) {
                        elt.css('min-height', '' + ($window.innerHeight - 110) + 'px');
                }
                */
            });
        }
    };
    $timeout(window.onresize, 1, true);
});


/*
    Load ESP configuration once the app is fully loaded
    Use explicit bootstrap rather than ng-app in index.esp so that ESP can retrieve the config.json first.
 */
angular.element(document).ready(function() {
    var http = new XMLHttpRequest();
    http.onload = function() {
        try {
            //  MOB - need better way of doing this
            angular.module('esp').config = JSON.parse(this.responseText);
        } catch(e) {
            console.log("Cannot parse ESP config", this.responseText)
        }
        angular.bootstrap(document, ['app']);
    };
    http.open("GET", "/esp/config", true);
    http.send();
});
