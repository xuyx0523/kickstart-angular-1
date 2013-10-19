/*
    DemoControl.js - Demo Controller
 */

'use strict';

angular.module('app').controller('DemoControl', function (Demo, Esp, $location, $scope, $timeout, $route) {
    $scope.demo1 = function() {
        var data = [];
        var period = 500;
        function fetch() {
            var prior = (data.length > 0) ? data[data.length - 1][1] : 0;
            $.ajax({
                data: { prior: prior},
                url: "/service/demo/demo1", 
                success: function(item) {
                    if (data.length > 50) {
                        data.shift();
                    }
                    data.push([data.length, item])
                    var i;
                    for (i = 0; i < data.length; i++) {
                        data[i][0] = i;
                    }
                    var where = $("#traffic-1");
                    if (where) {
                        $.plot(where, [data]);
                        setTimeout(fetch, period);
                    }
                }
            });
        }
        fetch();
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
        c.fillStyle = '#F5F5F5';
        c.arc(x, y, radius * .30, 0, 2 * Math.PI, false);
        c.closePath();
        c.fill();

        // Arrow
        c.beginPath();
    c.translate(x, y);
    c.rotate(15*Math.PI/180);
        c.moveTo(x, 25);
        c.lineTo(x + 4, y);
        c.lineTo(x - 4, y);
        c.lineTo(x, 25);
        c.closePath();
        c.fillStyle = '#000000';
        c.fill();

        //  Arrow base
        c.beginPath();
        c.arc(x, y, 4, 0, 2 * Math.PI, false);
        c.fillStyle = '#000000';
        c.closePath();
        c.fill();
    c.translate(-x, -y);

        c.restore();

        var parent = $('#g0');
        e = $('#g0-right');
        var pos = parent.offset();
        var top = pos.top;
        var left = pos.left;
        e.offset({ top: pos.top, left: pos.left});
    };
});

app.config(function($routeProvider) {
    var Default = {
        controller: 'DemoControl',
        resolve: { action: checkAuth },
    };
    $routeProvider.when('/demo/demo-1', angular.extend({}, Default, {
        templateUrl: '/app/demo/demo-1.html'
    }));
    $routeProvider.when('/demo/demo-2', angular.extend({}, Default, {
        templateUrl: '/app/demo/demo-2.html'
    }));
    $routeProvider.when('/demo/demo-3', angular.extend({}, Default, {
        templateUrl: '/app/demo/demo-3.html'
    }));
});
