/*
    PortControl.js - Port Controller
 */

'use strict';

angular.module('app').controller('PortControl', function (Esp, Port, Vlan, $rootScope, $scope, $location, $routeParams) {
    angular.extend($scope, $routeParams);
    $scope.options = {
        //  MOB - get better name than "options" more unique
        speed: {
            "1000":  "1000",
            "10000": "10000",
            "40000": "40000",
        },
        mode: {
            "Online": "Online",
            "Offline": "Offline",
        },
        duplex: {
            "Half": "Half",
            "Full": "Full",
        },
        negotiate: {
            "true":  "Enabled",
            "false": "Disabled",
        },
        flowControl: {
            "true":  "Enabled",
            "false": "Disabled",
        },
        jumbo: {
            "true":  "Enabled",
            "false": "Disabled",
        },
    }; 

    if ($scope.id) {
        Port.get({id: $scope.id}, $scope, {}, function(response) {
            $scope.port.num = $scope.port.name.replace('tty', '');

        });
        if ($location.path().indexOf("vlans") > 0) {
            Port.vlans({id: $scope.id}, $scope, {mappings: "data"});
        }
    } else {
        Port.list(null, $scope, {ports: "data"});
    }

    $scope.save = function() {
        $scope.port.name = 'tty' + $scope.port.num;
        Port.update($scope.port, $scope, function(response) {
            if (!response.error) {
                $location.path('/port/list');
            }
        });
    };

    //  MOB - Replace this with esp-tab directive
    $scope.selectPane = function(pane) {
        $scope.currentPane = pane;
        if (pane == 'Details') {
            $location.path('/port/' + $scope.port.id);
        } else {
            $location.path('/port/' + $scope.port.id + '/vlans');
        }
    };

    $scope.addPortToVlan = function(vlan) {
        Vlan.list(null, $scope, {vlans: "data"}, function(response) {
            //  MOB - alternatively, do this on the server side?
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
            Vlan.addPort({id: vlanId, port: $scope.port.name}, $scope, function(response) {
                if (!response.error) {
                    $location.path('/vlan/' + vlanId + '/ports');
                }
            });
        });
    };
});

angular.module('app').config(function($routeProvider) {
    var esp = angular.module('esp');
    var Default = {
        controller: 'PortControl',
        abilities: { 'view': true },
        resolve: { action: esp.checkAuth },
    };
    $routeProvider.when('/port/list', angular.extend({}, Default, { 
        //  MOB - layer routeProvider and apply esp.url() automatically
        templateUrl: esp.url('/app/port/port-list.html'), 
    }));
    $routeProvider.when('/port/:id', angular.extend({}, Default, {
        templateUrl: esp.url('/app/port/port-edit.html'),
        abilities: { 'edit': true, 'view': true },
    }));
    $routeProvider.when('/port/:id/vlans', angular.extend({}, Default, { 
        templateUrl: esp.url('/app/port/port-vlans.html'),
        abilities: { 'edit': true, 'view': true },
    }));
    $routeProvider.when('/port/:id/add', angular.extend({}, Default, { 
        templateUrl: esp.url('/app/port/port-add-to-vlan.html'),
        abilities: { 'edit': true, 'view': true },
    }));
});
