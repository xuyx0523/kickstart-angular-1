/*
    DashControl.js - Dash Controller
 */
'use strict';

angular.module('app').controller('DashControl', function (Dash, Esp, $location, $scope, $timeout, $route) {

	var dashPage = $location.path();
	$scope.play = true;

	function prepDashData(response) {
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

		offline = 0;
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

    //	MOB - ESP could have a convenience function
	function startWebSockets() {
		var proto = $location.protocol() == 'https' ? 'wss' : 'ws'
		var uri = proto + '://' + $location.host() + ':' + $location.port() + Esp.config.prefix + '/dash/stream';
	    console.log("Opening", uri);
	    var ws = new WebSocket(uri, ['chat']);
	    ws.onmessage = function (event) {
			if (!$scope.play) {
				//	MOB - could do more and close web socket
	            return;
			}
	    	if ($location.path() != dashPage) {
	        	console.log("Closing " + uri);
	    		ws.close();
	    	} else {
		        var data = angular.fromJson(event.data);
		        //	MOB - should be a convenience function
                angular.forEach(data, function(value, key) {
                    if (key == 'feedback') {
                        $rootScope[key] = value;
                    } else if ($scope) {
                        $scope[key] = value;
                    }
                });
		        $scope.$apply(function() {
		        	prepDashData(data);
		    	});
        	}
	    };
	    ws.onclose = function (event) {
	    	if ($location.path() == dashPage) {
		    	if ($scope.update) {
		    		$timeout.cancel($scope.update);
		    	}
				$scope.update = $timeout(startWebSockets, 1000, true);
			}
	    };
	    ws.onerror = function (event) {
        	console.log("Error " + event);
	    	if ($location.path() == dashPage) {
		    	if ($scope.update) {
		    		$timeout.cancel($scope.update);
		    	}
				$scope.update = $timeout(startWebSockets, 1000, true);
			}
		}
		return ws;
    }

    function startPoll() {
		var period = Esp.config.refresh || (5 * 1000);
		if (!$scope.play) {
            $timeout(startPoll, period, true);
            return;
		}
    	if ($location.path() != dashPage) {
    		//	MOB - use $timeout.cancel($scope.update)
			$scope.update = null;
    	} else {
		    if (!$scope.update) {
			    $scope.update = Dash.get({id: 1}, $scope, function(response) {
			    	$scope.update = null;
			    	prepDashData(response);
		            $timeout(startPoll, period, true);
			    });
			}
		}
    }

	if (window.WebSocket) {
		if ($scope.update) {
			$timeout.cancel($scope.update);
		}
		$scope.update = $timeout(startWebSockets, 0, true);
	} else {
    	startPoll();
    }
});

angular.module('app').config(function($routeProvider) {
    var Default = {
        controller: 'DashControl',
        resolve: { action: checkAuth },
    };
    var esp = angular.module('esp');
    $routeProvider.when('/', angular.extend({}, Default, {
        templateUrl: esp.url('/app/dash/dash.html'),
    }));
});
