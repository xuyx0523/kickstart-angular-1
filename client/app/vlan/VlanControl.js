/*
    Vlan Controller
 */

'use strict';

app.controller('VlanControl', function ($dialog, $rootScope, $scope, $location, $routeParams, Vlan, Esp) {

    //  MOB - need better way of structuring this
    if ($location.path() == "/service/vlan/") {
        $scope.action = "Create";
        $scope.vlan = new Vlan();

    } else if ($routeParams.id) {
        Vlan.get({id: $routeParams.id}, function(response) {
            $scope.vlan = response.data;
            $scope.vlan.num = $scope.vlan.name.replace('vlan', '');
            $scope.action = "Edit";
        });
        if ($location.path().indexOf("ports") > 0) {
            Vlan.ports({id: $routeParams.id}, function(response) {
                $scope.ports = response;
            });
        }

    } else {
        $scope.vlans = Vlan.list({}, function(response) {
            $scope.vlans = response;
        });
    }
    if ($location.path().indexOf("add") > 0 || $location.path().indexOf("remove") > 0) {
        $scope.port = {};
    }

    $scope.routeParams = $routeParams;


    $scope.remove = function() {
        //  MOB - what are the defaults for these?
        //  MOB - must remove all mappings for this VLAN
        $scope.removeDialog = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            templateUrl: '/app/vlan/vlan-remove-confirm.html',
            controller: 'VlanConfirmControl',
        };
        var confirm = $dialog.dialog($scope.removeDialog);
        confirm.open().then(function(result) {
            if (result) {
                Vlan.remove({id: $scope.vlan.id}, function(response) {
                    $location.path("/service/vlan/list");
                    $rootScope.feedback = response.feedback;
                    $rootScope.feedback.inform = "VLAN Deleted";

                });
            }
        });
    };

    $scope.save = function() {
        $scope.vlan.name = 'vlan' + $scope.vlan.num;
        Vlan.save($scope.vlan, function(response) {
            $rootScope.feedback = response.feedback;
            if (response.error) {
                $scope.fieldErrors = response.fieldErrors;
                $rootScope.feedback.error = $rootScope.feedback.error || "Cannot Save Vlan";
            } else {
                $rootScope.feedback.inform = $scope.routeParams.id ? "Updated Vlan" : "Created New Vlan";
                $location.path('/service/vlan/list');
            }
        });
    };

    $scope.click = function(index) {
        if (Esp.can('edit')) {
            $location.path('/service/vlan/' + $scope.vlans.data[index].id);
        } else {
            $rootScope.feedback = { warning: "Insufficient Privilege to Edit Vlans" };
        }
    };

/*
    $scope.clickPort = function(index) {
        if (Esp.can('edit')) {
            $location.path('/service/vlan/' + $scope.vlan.id + '/remove'); // ?port=' + $scope.ports.data[index].id);
        } else {
            //  MOB - could this pattern be centralized in Esp.can() - need higher level fn as canClass calls can()
            $rootScope.feedback = { warning: "Insufficient Privilege to Edit Vlans" };
        }
    };
*/

    $scope.selectPane = function(pane) {
        $scope.currentPane = pane;
        if (pane == 'Details') {
            $location.path('/service/vlan/' + $scope.vlan.id);
        } else {
            $location.path('/service/vlan/' + $scope.vlan.id + '/ports');
        }
    };

    $scope.addPort = function(port) {
        Vlan.addPort({id: $scope.vlan.id, port: port}, function(response) {
            $rootScope.feedback = response.feedback;
            if (response.error) {
                $scope.fieldErrors = response.fieldErrors;
                $rootScope.feedback.error = $rootScope.feedback.error || "Cannot add port to VLAN";
            } else {
                //  MOB - should go back to referrer. Or perhaps resolve the promise
                $rootScope.feedback.inform = "Created Port Mapping";
                $location.path('/service/vlan/' + $scope.vlan.id + '/ports');
            }
        });
    };

    $scope.removePort = function(port) {
        //  MOB - what are the defaults for these?
        $scope.removePortDialog = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            templateUrl: '/app/vlan/vlan-remove-port-confirm.html',
            controller: 'VlanConfirmControl',
            port: port,
            vlan: $scope.vlan,
        };
        var confirm = $dialog.dialog($scope.removePortDialog);
        confirm.open().then(function(result) {
            if (result) {
                Vlan.removePort({id: $scope.vlan.id, port: port}, function(response) {
                    $rootScope.feedback.inform = "Removed Port Mapping";
                    $location.path('/service/vlan/' + $scope.vlan.id + '/ports');
                    Vlan.ports({id: $routeParams.id}, function(response) {
                        $scope.ports = response;
                    });
                });
            }
        });
    };
});

app.controller('VlanConfirmControl', function ($scope, dialog) {
    $scope.vlan = dialog.options.vlan;
    $scope.port = { name: dialog.options.port };
    $scope.closeConfirm = function(result) {
        dialog.close(result);
    };
});

app.config(function($routeProvider) {
    $routeProvider.when('/service/vlan/list', {
        templateUrl: '/app/vlan/vlan-list.html',
        controller: 'VlanControl',
        abilities: { 'view': true },
        resolve: { action: checkAuth },
    });
    $routeProvider.when('/service/vlan/:id', {
        templateUrl: '/app/vlan/vlan-edit.html',
        controller: 'VlanControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: checkAuth },
    });
    $routeProvider.when('/service/vlan/:id/ports', {
        templateUrl: '/app/vlan/vlan-ports.html',
        controller: 'VlanControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: checkAuth },
    });
    $routeProvider.when('/service/vlan/:id/add', {
        templateUrl: '/app/vlan/vlan-add-port.html',
        controller: 'VlanControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: checkAuth },
    });
    /* MOB
    $routeProvider.when('/service/vlan/:id/remove', {
        templateUrl: '/app/vlan/vlan-remove-port.html',
        controller: 'VlanControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: checkAuth },
    });
    */
});
