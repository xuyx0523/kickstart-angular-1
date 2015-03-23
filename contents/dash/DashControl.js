/*
    DashControl.js - Dash Controller
 */

angular.module('app').controller('DashControl', function (Dash, Esp, Sockets, $location, $scope) {

    /*
        Process data from the server
     */
	function processDashData(response) {
		var offline = 0;
		var active = 0;
		var io = 0;

        angular.forEach(response, function(value, key) {
            if (key != 'feedback') {
                $scope[key] = value;
            }
        });

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

    $scope.resetRange = function() {
        console.log($scope.dash);
        Dash.reset({id: 1}, function(response) {
            $scope.dash = response;
        });
    }

    $scope.sockets = Sockets.connect('/dash/stream', function(response) {
        processDashData(response);
    });

    $scope.streaming = function() {
        return $scope.sockets.streaming;
    };

    $scope.toggleStreaming = function() {
        $scope.sockets.toggle();
    };

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
        templateUrl: esp.url('/dash/view.html'),
    }));
});
