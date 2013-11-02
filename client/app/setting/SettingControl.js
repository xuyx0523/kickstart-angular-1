/*
    SettingControl.js - Setting Controller
 */

'use strict';

angular.module('app').controller('SettingControl', function ($rootScope, $scope, $location, $routeParams, Setting, Esp, Vlan) {
    Setting.get({id: 1}, $scope);

    $scope.save = function() {
        Setting.update($scope.setting, $scope, function(response) {
            if (!response.error) {
                $location.path('/');
            }
        });
    };
});

angular.module('app').config(function($routeProvider) {
    var Default = {
        controller: 'SettingControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: checkAuth },
    };
    var esp = angular.module('esp');
    $routeProvider.when('/setting', angular.extend({}, Default, {templateUrl: esp.url('/app/setting/setting-edit.html')}));
});
