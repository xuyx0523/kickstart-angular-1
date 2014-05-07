/*
    DashControl.js - Dash Controller
 */
'use strict';

angular.module('app').controller('DashControl', function (Dash, Esp, $location, $scope, $timeout, $rootScope, $route) {
    /*
        Remember the dashboard page so we can cancel data updates when the user navigates away
     */
	var dashPage = $location.path();

    /*
        The dynamic updates can be paused or resumed (play). Start playing.
     */
	$scope.play = true;

    /*
        Process data from the server
     */
	function processDashData(response) {
		var offline = 0;
		var active = 0;
		var io = 0;
        /*
            Calculate the number of online and offline ports
         */
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

        /*
            Calculate the number of online and offline vlans
         */
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
        Esp.access();
	}

    /*
        Start web sockets transfer of dash data
     */
	function startWebSockets() {
		var proto = $location.protocol() == 'https' ? 'wss' : 'ws'
		var uri = proto + '://' + $location.host() + ':' + $location.port() + Esp.config.server + '/dash/stream';
	    console.log("Opening", uri);
	    var ws = new WebSocket(uri, ['chat']);
	    ws.onmessage = function (event) {
			if (!$scope.play) {
				//	MOB - could do more and close web socket
	            return;
			}
	    	if ($location.path() != dashPage) {
                /* Navigate away from dash page, so close the web socket */
	        	console.log("Closing " + uri);
	    		ws.close();
	    	} else {
                /* 
                    Extract feedback and apply to the root scope
                 */
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
		        	processDashData(data);
		    	});
        	}
	    };
	    ws.onclose = function (event) {
            /*
                Reopen the web socket if it closes for some reason. Use a 1 sec timeout so we dont every busy wait
             */
	    	if ($location.path() == dashPage) {
		    	if ($scope.update) {
		    		$timeout.cancel($scope.update);
		    	}
				$scope.update = $timeout(startWebSockets, 1000, true);
			}
	    };
	    ws.onerror = function (event) {
            /*
                Reopen the web socket if it errors for some reason. Use a 1 sec timeout so we dont every busy wait
             */
        	console.log("Error " + event);
	    	if ($location.path() == dashPage) {
		    	if ($scope.update) {
		    		$timeout.cancel($scope.update);
		    	}
				$scope.update = $timeout(startWebSockets, 1000, true);
			}
		};
        $scope.off = $rootScope.$on("$locationChangeSuccess", function(scope, current, previous) {
            ws.close();
            $scope.off();
        });
		return ws;
    }

    /*
        Get dash data via long polling if web sockets are not available
     */
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
			    	processDashData(response);
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

/*
    Set the routes for the dashboard
 */
angular.module('app').config(function($routeProvider) {
    var esp = angular.module('esp');
    var Default = {
        controller: 'DashControl',
        /* Not strictly required as the dashboard is availiable to all users */
        resolve: { action: esp.checkAuth },
    };
    $routeProvider.when('/', angular.extend({}, Default, {
        templateUrl: esp.url('/app/dash/dash.html'),
    }));
});
