/*
    main.js - Application main script.
 */

'use strict';

var app = angular.module('app', ['ngAnimate', 'ngResource', 'ngRoute', 'ui.bootstrap', 'esp', 'kick']);

app.config(function($routeProvider) {
	/*
	    Bootstrap the configuration. Need the appPrefix when defining routes at config time.
 	 */
    var e = angular.element('body');
    var esp = angular.module('esp');
    esp.$config = JSON.parse(e.attr('data-config'));
    esp.url = function(url) {
        return esp.$config.appPrefix + url;
    }
    $routeProvider.otherwise({ redirectTo: esp.url('/') });
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
                //  MOB - what is this?
                var panel = elt.find('xx');
                if (panel) {
                    elt.css('min-height', '' + ($window.innerHeight - 75) + 'px');
                }
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
        var esp = angular.module('esp');
        esp.url = function(url) {
            console.log('HERE');
            return '';
        }
        esp.server = function(url) {
            console.log('THERE');
            return '';
        }
        angular.bootstrap(document, ['app']);
    };
    var url = (window.location.pathname + '/esp/config').replace(/\/\//g, '/');
    http.open("GET", url, true);
    http.send();
});
