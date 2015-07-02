/*
    DemoControl.js - Demo Controller
 */

angular.module('app').controller('DemoControl', function (Demo, Esp, $scope, $timeout) {

    $scope.gauge = {value: 100};

    $scope.demo1 = function() {
        /* Temporarily disabled */
        return;
        Esp.loadScript(Esp.config.appPrefix + '/lib/flot/jquery.flot.js', function() {
            var gdata = [];
            var i;
            for (i = 0; i < 50; i++) {
                gdata.push([i, 0]);
            }
            var period = 500;
            function fetch() {
                var prior = (gdata.length > 0) ? gdata[gdata.length - 1][1] : 0;
                //  MOB - should use web sockets
                Demo.demo1({prior: prior}, function(response) {
                    //  MOB - need to send data: { prior: prior},
                    if (gdata.length > 50) {
                        gdata.shift();
                    }
                    var item = response.demo[0];
                    gdata.push([gdata.length, item.value])
                    var i;
                    for (i = 0; i < gdata.length; i++) {
                        gdata[i][0] = i;
                    }
                    var w = angular.element('traffic-1');
                    var where = $("#traffic-1");
                    if (where) {
                        $.plot(where, [gdata]);
                        $timeout(fetch, period, true);
                    }
                });
            }
            fetch();
        });
    };

    $scope.demo2 = function() {
        var d1 = []; 
        for (var i = 0; i < 14; i += 0.5) {
            d1.push([i, Math.sin(i)]);
        }
        /*
            var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];
            // a null signifies separate line segments
            var d3 = [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]];
        */
        var where = $("#plot-1");
        // $.plot(where, [ d1, d2, d3 ]);
        $.plot(where, [d1]);
    };
});

angular.module('app').config(function($routeProvider) {
    var esp = angular.module('esp');
    var Default = {
        controller: 'DemoControl',
        resolve: { action: esp.checkAuth },
    };
    $routeProvider.when('/demo/demo-1', angular.extend({}, Default, {
        templateUrl: esp.url('/demo/demo-1.html'),
    }));
    $routeProvider.when('/demo/demo-2', angular.extend({}, Default, {
        templateUrl: esp.url('/demo/demo-2.html'),
    }));
});
