/*
    PortControl.js - Port Controller
 */

'use strict';

app.controller('PortControl', function ($rootScope, $scope, $location, $routeParams, Port, Esp, Vlan) {

    if ($location.path() == "/service/port/") {
        $scope.action = "Create";
        $scope.port = new Port();

    } else if ($routeParams.id) {
        Port.get({id: $routeParams.id}, function(response) {
            $scope.port = response.data;
            $scope.port.num = $scope.port.name.replace('tty', '');
        });
        if ($location.path().indexOf("vlans") > 0) {
            //  MOB - don't need. Could this be done on demand?
            Port.vlans({id: $routeParams.id}, function(response) {
                $scope.vlans = response;
            });
        }
    } else {
        $scope.list = Port.list({}, function(response) {
            $scope.ports = response;
        });
    }
    if ($location.path().indexOf("add") > 0) {
        $scope.vlan = {};
    }

    $scope.routeParams = $routeParams;
    $scope.speeds = [
        { id: "1000", speed: "1000" },
        { id: "10000", speed: "10000" },
        { id: "40000", speed: "40000" },
    ];

    $scope.remove = function() {
        Port.remove({id: $scope.port.id}, function(response) {
            $location.path("/service/port/list");
            $rootScope.feedback = response.feedback;
        });
    };

    $scope.save = function() {
        $scope.port.name = 'tty' + $scope.port.num;
        Port.save($scope.port, function(response) {
            $rootScope.feedback = response.feedback;
            if (!response.error) {
                $rootScope.feedback.inform = $scope.routeParams.id ? "Updated Port" : "Created New Port";
                $location.path('/');
            } else {
                $scope.fieldErrors = response.fieldErrors;
                $rootScope.feedback.error = $rootScope.feedback.error || "Cannot Save Port";
            }
        });
    };

    $scope.click = function(index) {
        if (Esp.can('edit')) {
            //  MOB - not right
            $location.path('/service/port/' + $scope.ports.data[index].id);
        } else {
            $rootScope.feedback = { warning: "Insufficient Privilege to Edit Ports" };
        }
    };

    $scope.clickVlan = function(index) {
        if (Esp.can('edit')) {
            $location.path('/service/vlan/' + $scope.vlans.data[index].id);
        }
    };

    //  MOB - should be able to do this in a view
    $scope.selectPane = function(pane) {
        $scope.currentPane = pane;
        if (pane == 'Details') {
            $location.path('/service/port/' + $scope.port.id);
        } else {
            $location.path('/service/port/' + $scope.port.id + '/vlans');
        }
    };

    $scope.addPortToVlan = function(vlan) {
        $scope.vlans = Vlan.list({}, function(response) {
            if (response.error) {
                $rootScope.feedback.error = "Cannot get list of VLANs";
                return;
            }
            //  MOB - must be a better way 
            $scope.vlans = response.data;
            for (var i = 0; i < $scope.vlans.length; i++) {
                if ($scope.vlans[i].name == vlan) {
                    break;
                }
            }
            if (i >= $scope.vlans.length) {
                $rootScope.feedback.error = "Cannot find VLAN";
                return;
            }
            var vlanId = $scope.vlans[i].id;
            Vlan.addPort({id: vlanId, port: $scope.port.name}, function(response) {
                $rootScope.feedback = response.feedback;
                if (response.error) {
                    $scope.fieldErrors = response.fieldErrors;
                    $rootScope.feedback.error = $rootScope.feedback.error || "Cannot add port to VLAN";
                } else {
                    $rootScope.feedback.inform = "Created Port Mapping";
                    // var url = $rootScope.referrer.$$route
                    $location.path('/service/vlan/' + vlanId + '/ports');
                }
            });
        });
    };
});

app.config(function($routeProvider) {
    $routeProvider.when('/service/port/list', {
        templateUrl: '/app/port/port-list.html',
        controller: 'PortControl',
        abilities: { 'view': true },
        resolve: { action: checkAuth },
    });
    $routeProvider.when('/service/port/:id', {
        templateUrl: '/app/port/port-edit.html',
        controller: 'PortControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: checkAuth },
    });
    $routeProvider.when('/service/port/:id/vlans', {
        templateUrl: '/app/port/port-vlans.html',
        controller: 'PortControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: checkAuth },
    });
    $routeProvider.when('/service/port/:id/add', {
        templateUrl: '/app/port/port-add-to-vlan.html',
        controller: 'PortControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: checkAuth },
    });
});
