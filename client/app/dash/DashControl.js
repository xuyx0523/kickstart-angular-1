/*
    DashControl.js - Dash Controller
 */

'use strict';

angular.module('app').controller('DashControl', function (Dash, Esp, $location, $scope, $timeout, $route) {

	var dashPage = $location.path();

	function processResponse(response) {
		var offline = 0;
		var active = 0;
		var io = 0;
		angular.forEach(response.ports, function(port,key) {
			if (port.mode != 'Online') offline++;
			if ($scope.last) {
				if (port.rxBytes != $scope.last.ports[key].rxBytes) {
					active++;
					io += (port.rxBytes - $scope.last.ports[key].rxBytes);
				}
			}
		});
		$scope.ports.offline = offline;
		$scope.ports.online = response.ports.length - offline;
		$scope.ports.active = active;
		$scope.system.io = io;

		angular.forEach(response.vlans, function(vlan,key) {
			if (vlan.mode != 'Online') offline++;
			if ($scope.last) {
				if (vlan.rxBytes != $scope.last.vlans[key].rxBytes) {
					active++;
					io += (vlan.rxBytes - $scope.last.vlans[key].rxBytes);
				}
			}
		});
		$scope.vlans.offline = offline;
		$scope.vlans.online = response.vlans.length - offline;
		$scope.vlans.active = active;

		$scope.last = response;
	}

	function startWebSockets() {
		var uri = 'ws://' + $location.host() + ':' + $location.port() + '/' + Esp.config.routePrefix.slice(1) + '/dash/stream';
	    console.log(uri);
	    var ws = new WebSocket(uri, ['chat']);
	    ws.onmessage = function (event) {
	    	if ($location.path() != dashPage) {
		        console.log("CLIENT CLOSE of DASH WEB SOCKET");
	    		ws.close();
	    	} else {
		        var data = angular.fromJson(event.data);
		        console.log("MSG", data);
		        //	MOB - should be a convenience function
                angular.forEach(data, function(value, key) {
                    if (key == 'feedback') {
                        $rootScope[key] = value;
                    } else if ($scope) {
                        $scope[key] = value;
                    }
                });
		        $scope.$apply(function() {
		        	processResponse(data);
		    	});
        	}
	    };
	    ws.onclose = function (event) {
	    	//	MOB - timeout
	        console.log("CLOSED");
	        //	MOB - need to protect so we only have one active
	    	// $scope.update = $timeout(startWebSockets, 10 * 1000, true);
	    };
	    ws.onerror = function (event) {
        	console.log("Error " + event);
	    	// $scope.update = $timeout(startWebSockets, 10 * 1000, true);
		}
		return ws;
    }

    function startPoll() {
    	if ($location.path() != dashPage) {
			$scope.update = null;
    	} else {
		    if (!$scope.update) {
			    $scope.update = Dash.get({id: 1}, $scope, function(response) {
			    	$scope.update = null;
			    	processResponse(response);
			    	var timeout = Esp.config.refresh || (5 * 1000);
		            $timeout(startPoll, timeout, true);
			    });
			}
		}
    }

	if (window.WebSocket && false) {
		$scope.update = startWebSockets();
	} else {
    	startPoll();
    }
});

angular.module('app').config(function($routeProvider) {
    var Default = {
        controller: 'DashControl',
        resolve: { action: checkAuth },
    };
    $routeProvider.when('/', angular.extend({}, Default, {
        templateUrl: '/app/dash/dash.html'
    }));
});
