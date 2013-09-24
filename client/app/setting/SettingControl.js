/*
    SettingControl.js - Setting Controller
 */

'use strict';

app.controller('SettingControl', function ($rootScope, $scope, $location, $routeParams, Setting, Esp, Vlan) {
    if ($location.path() == "/service/setting/") {
        $scope.action = "Create";
        $scope.setting = new Setting();

    } else if ($routeParams.id) {
        Setting.get({id: $routeParams.id}, function(response) {
            $scope.setting = response.data;
            $scope.setting.num = $scope.setting.name.replace('tty', '');
        });
    }

    $scope.save = function() {
        $scope.setting.name = 'tty' + $scope.setting.num;
        Setting.save($scope.setting, function(response) {
            $rootScope.feedback = response.feedback;
            if (!response.error) {
                $rootScope.feedback.inform = $scope.routeParams.id ? "Updated Setting" : "Created New Setting";
                $location.path('/');
            } else {
                $scope.fieldErrors = response.fieldErrors;
                $rootScope.feedback.error = $rootScope.feedback.error || "Cannot Save Setting";
            }
        });
    };

    //  MOB - should be able to do this in a view
    $scope.selectPane = function(pane) {
        $scope.currentPane = pane;
        if (pane == 'Details') {
            $location.path('/service/setting/' + $scope.setting.id);
        } else {
            $location.path('/service/setting/' + $scope.setting.id + '/vlans');
        }
    };
});

app.config(function($routeProvider) {
    $routeProvider.when('/service/setting', {
        templateUrl: '/app/setting/setting-edit.html',
        controller: 'SettingControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: checkAuth },
    });
});
