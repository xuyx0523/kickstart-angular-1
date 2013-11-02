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
        if (scope && elt) {
            scope.$apply(function() {
                elt.css('min-height', '' + ($window.innerHeight - 75) + 'px');
                var child = elt.children();
                angular.forEach(elt.children(), function(value, key) {
                    var i = value.id;
                })
                var panel = elt.find('xx');
                if (panel) {
                    elt.css('min-height', '' + ($window.innerHeight - 75) + 'px');
                }

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
            if (this.status != 200) {
                //  MOB - should do some kind of alert
                console.log("Cannot get ESP config");
                esp.$config = {};
            } else {
                //  MOB - need better way of doing this
                var esp = angular.module('esp');
                esp.$config = JSON.parse(this.responseText);
                esp.url = function(url) {
                    return esp.$config.appPrefix + url;
                }
                esp.server = function(url) {
                    return esp.$config.prefix + url;
                }
            }
        } catch(e) {
            console.log("Cannot parse ESP config", this.responseText)
        }
        angular.bootstrap(document, ['app']);
    };
    var url = window.location.pathname + '/esp/config';
    http.open("GET", url, true);
    http.send();
});
