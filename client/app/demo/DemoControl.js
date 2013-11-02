/*
    DemoControl.js - Demo Controller
 */

'use strict';

angular.module('app').controller('DemoControl', function (Demo, Esp, $scope, $timeout) {

    $scope.gauge = {value: 100};

    $scope.demo1 = function() {
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

    $scope.demo3 = function() {

        /*
            Need counter value centered above
            Need bigger angule of guage
         */
        var e = document.getElementById('g0');
        var c = e.getContext('2d');

        var x = e.width / 2;
        var y = e.height / 2;
        var radius = 150;
        var startAngle = 1.2 * Math.PI;
        var endAngle = 1.8 * Math.PI;

        c.save();

        // jc.fillRect(0, 0, e.width, e.height);

        c.beginPath();
        c.moveTo(x, y);
        c.arc(x, y, radius, startAngle, endAngle, false);
        var g = c.createLinearGradient(100, 100, 200, 200);
        g.addColorStop(0, '#79badd');
        g.addColorStop(1, '#499ace');
        c.fillStyle = g;
        c.closePath();
        c.fill();

        // Center circle
        c.beginPath();
        c.moveTo(x, y);
        c.fillStyle = '#D8D8D8';    //#F5F5F5';
        c.fillStyle = '#A8A8A8';    //#F5F5F5';
        c.arc(x, y, radius * .30, 0, 2 * Math.PI, false);
        c.closePath();
        c.fill();

        arrow(0);

    function arrow(angle) {
        c.save();
        c.beginPath();
        c.translate(x, y);
        c.rotate(angle * Math.PI / 180);

        c.moveTo(0, 25 - y);
        c.lineTo(4, 0);
        c.lineTo(-4, 0);
        c.lineTo(0, 25 -y);
        c.closePath();
        c.fillStyle = '#000000';
        c.fill();

        //  Arrow base
        c.beginPath();
        c.arc(0, 0, 4, 0, 2 * Math.PI, false);
        c.fillStyle = '#000000';
        c.closePath();
        c.fill();
        // c.translate(-x, -y);
        c.restore();
    }

        c.restore();

        var parent = $('#g0');
        e = $('#g0-right');
        var pos = parent.offset();
        var top = pos.top;
        var left = pos.left;
        e.offset({ top: pos.top, left: pos.left});
    };

    $scope.svg = function() {
        function fetch() {
            var period = 1000;
            Demo.demo1({prior: 0}, function(response) {
                var item = response.demo[0];
                $scope.value = item.value - 0;
                $timeout(fetch, period, true);
            });
        }
        fetch();
    };
});

angular.module('app').config(function($routeProvider) {
    var Default = {
        controller: 'DemoControl',
        resolve: { action: checkAuth },
    };
    var esp = angular.module('esp');
    $routeProvider.when('/demo/demo-1', angular.extend({}, Default, {
        templateUrl: esp.url('/app/demo/demo-1.html'),
    }));
    $routeProvider.when('/demo/demo-2', angular.extend({}, Default, {
        templateUrl: esp.url('/app/demo/demo-2.html'),
    }));
    $routeProvider.when('/demo/demo-3', angular.extend({}, Default, {
        templateUrl: esp.url('/app/demo/demo-3.html'),
    }));
    $routeProvider.when('/demo/demo-svg', angular.extend({}, Default, {
        templateUrl: esp.url('/app/demo/demo-svg.html'),
    }));
});
